import { useContext, useEffect, useRef, useState } from "react";
import Navigation from "../Components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "providers/UserProvider";


export default function Spaces(props) {
    const [spaces, setSpaces] = useState([]);
    const { user } = useContext(UserContext);
    const spaceNameRef = useRef();
    const spaceDescriptionRef = useRef();

    useEffect(() => {
        axios.get('/spaces', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                setSpaces(res.data.spaces);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <div className="flex flex-col items-center mt-4">
            <div className="text-3xl">
                Your Spaces
            </div>

            <div className='grid grid-cols-3 mt-2'>
                {spaces.map(space => {
                    return (
                        <Link className="flex flex-col bg-gray-200 rounded-lg p-4 m-2" to={`/dashboard/spaces/${space.space_identifier}`}>
                            <div className="text-lg"> {space.name}</div>
                            <div className="text-sm"> {space.description}</div>
                            {space.creator_id === user.id && <div className="text-sm text-blue-500"> You are the creator of this space. </div>}
                        </Link>)
                })}
            </div>
        </div>
    )
}
