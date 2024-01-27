import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authenticatedPost, authenticatedRequest } from "utils/api"


export default function SingleSpace() {
    const { id } = useParams();
    const [space, setSpace] = useState([]);
    const fileInput = useRef(null);
    const nameRef = useRef(null);

    useEffect(() => {
        authenticatedRequest(`/spaces/${id}`)
            .then(res => {
                setSpace(res.data.space);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    const submitNote = async (e) => {
        const formData = new FormData();
        formData.append('document', fileInput.current.files[0]);
        formData.append('title', nameRef.current.value);
        formData.append('space_id', space.id);

        const response = await authenticatedPost(`/notes`, formData).catch(e => { return null; });
    }



    return (
        <div className="flex flex-col items-center">
            This is your space

            <div className='flex flex-col'>
                {space && <> <div className="flex flex-col">
                    <div className="text-lg"> {space.name}</div>
                    <div className="text-sm"> {space.description}</div>
                </div>

                    <>
                        <input type="file" ref={fileInput} accept="application/pdf" />
                        <input
                            type="text"
                            ref={nameRef}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button className="bg-blue-600 text-white rounded-sm px-4 py-2 mt-4" onClick={submitNote}> Create </button>
                    </>

                    {
                        space.notes && space.notes.map(note => {
                            return <div className="flex flex-col">
                                <div className="text-lg"> {note.title}</div>
                                <Link to={`/dashboard/reader/${note.location}`}> Open link </Link>
                                {/* <div className="text-sm"> {note.description}</div> */}
                            </div>
                        })
                    }

                </>}
            </div>

        </div>
    )
}