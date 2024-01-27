import React, { useRef, useState } from 'react';
import PdfToImageConverter from '../../Components/pdftoImageConvert';
import { useParams } from 'react-router-dom';

function ImageRender(props) {
    return <img className='h-[100vh]' {...props} alt="" />
}

export default function Reader() {
    const [annotations, setAnnotations] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState({ open: false, annotation: null });
    const annotationRef = useRef();
    const { location } = useParams();
    const [error, setError] = useState();

    const imageClick = (page, e) => {
        const { clientX, clientY } = e;
        const boundingRect = e.target.getBoundingClientRect();
        const { x, y } = boundingRect;

        const annotation = {
            x: (clientX - x) / boundingRect.width,
            y: (clientY - y) / boundingRect.height,
            page: page.pageNumber
        }

        setModalOpen({ open: true, annotation });
    }

    return <div className='flex flex-col items-center justify-center'>
        <PdfToImageConverter fallback={() => setError('Error processing the document')} imageRender={ImageRender} pdfUrl={`http://localhost:8000/storage/${location}`} onImageClick={imageClick} />
        {error && <div className='text-red-500'> {error} </div>} 
        {
            (modalOpen.open && modalOpen.annotation) &&
            <div className="top-0 left-0 w-[100vw] h-[100vh] flex flex-col items-center justify-center " style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", position: "fixed" }}>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ref={annotationRef}
                    onKeyDown={(e) => {
                        if (e.key != "Enter") return;

                        setAnnotations([...annotations, { ...modalOpen.annotation, text: annotationRef.current.value }]);
                        setModalOpen({ open: false, annotation: null });
                    }}
                />
                <div className="p-10 rounded-sm bg-white text-black"> Here </div>
            </div>
        }

    </div>
}
