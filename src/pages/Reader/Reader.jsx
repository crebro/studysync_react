import React, { useEffect, useMemo, useRef, useState } from 'react';
import PdfToImageConverter from '../../Components/pdftoImageConvert';
import { useParams } from 'react-router-dom';
import { db } from "../../firebase/firebase"
import { collection, addDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';

function ImageRender(props) {
    const annotations = props.annotations;
    return <div className='h-[100vh] relative'>
        {
            annotations && annotations.map(annotation => {
                return <><div className='absolute rounded-full' style={{ left: annotation.x * 100 + '%', top: annotation.y * 100 + '%', width: '10px', height: '10px', backgroundColor: 'red' }}></div>
                    <div className='absolute rounded-full' style={{ left: annotation.x * 100 + '%', top: `calc(${annotation.y * 100}% - 25px)`, }}> {annotation.text} </div>
                </>;
            })
        }
        <img className='w-full h-full' {...props} alt="" />
    </div>
}

export default function Reader() {
    const [annotations, setAnnotations] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState({ open: false, annotation: null });
    const annotationRef = useRef();
    const { location } = useParams();
    const [error, setError] = useState();
    const pageAnnotations = useMemo(() => {
        let mapping = {};
        for (let i = 0; i < annotations.length; i++) {
            if (mapping[annotations[i].page] !== undefined) {
                mapping[annotations[i].page].push(annotations[i]);
            }
            else {
                mapping[annotations[i].page] = [annotations[i]];
            }
        }
        return mapping;
    }, [annotations]);


    const fetchAnnotations = async () => {
        // fetch annotations from firebase
        const q = query(collection(db, "annotations"), where("note_location_identifier", "==", location));

        // const querySnapshot = await getDocs(q);

        await onSnapshot(q, (querySnapshot) => {
            const annotationsData = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setAnnotations(annotationsData);

        });
    }


    const imageClick = async (page, e) => {
        const { clientX, clientY } = e;
        const boundingRect = e.target.getBoundingClientRect();
        const { x, y } = boundingRect;

        const annotation = {
            x: (clientX - x) / boundingRect.width,
            y: (clientY - y) / boundingRect.height,
            page: page
        }

        setModalOpen({ open: true, annotation })
    }

    useEffect(() => {
        fetchAnnotations();
    }, [])


    return <div className='flex flex-col items-center justify-center bg-gray-200'>
        <PdfToImageConverter fallback={() => setError('Error processing the document')} imageRender={(props) => <ImageRender annotations={pageAnnotations[props.page]} {...props} />} pdfUrl={`http://localhost:8000/storage/${location}`} onImageClick={imageClick} />
        {error && <div className='text-red-500'> {error} </div>} 
        {
            (modalOpen.open && modalOpen.annotation) &&

            <div className="top-0 left-0 w-[100vw] h-[100vh] flex flex-col items-center justify-center " style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", position: "fixed" }}>

                    <div className="flex flex-col p-4 bg-white rounded-lg">
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ref={annotationRef}
                            onKeyDown={(e) => {
                                if (e.key != "Enter") return;

                                setAnnotations([...annotations, { ...modalOpen.annotation, text: annotationRef.current.value }]);
                                setModalOpen({ open: false, annotation: null });

                                addDoc(collection(db, "annotations"), {
                                    x: modalOpen.annotation.x,
                                    y: modalOpen.annotation.y,
                                    page: modalOpen.annotation.page,
                                    note_location_identifier: location,
                                    text: annotationRef.current.value,
                                });
                            }}
                            autoFocus
                        />                               
                    </div>
            </div>

        }

    </div>
}
