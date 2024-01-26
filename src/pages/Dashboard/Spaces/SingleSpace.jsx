import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { authenticatedRequest } from "utils/api"


export default function SingleSpace() {
    const { id } = useParams();
    const [space, setSpace] = useState([]);

    useEffect(() => {
        authenticatedRequest(`/spaces/${id}`)
            .then(res => {
                setSpace(res.data.space);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <div className="flex flex-col items-center">
            This is your space

            <div className='flex flex-col'>
                {space && <div className="flex flex-col">
                    <div className="text-lg"> {space.name}</div>
                    <div className="text-sm"> {space.description}</div>
                </div>}
            </div>

            div.
        </div>
    )
}