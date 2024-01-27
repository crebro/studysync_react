import { useContext, useEffect, useRef, useState } from "react";
import Navigation from "../Components/Navigation";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "providers/UserProvider";
import { authenticatedPost } from "utils/api";
import { toast } from "react-hot-toast";


export default function Spaces(props) {
    const [spaces, setSpaces] = useState([]);
    const { user } = useContext(UserContext);
    const spaceNameRef = useRef();
    const spaceDescriptionRef = useRef();

    const navigate = useNavigate();

    const [showCreateSpaceModal, setShowCreateSpaceModal] = useState();

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

    const submitSpace = async (e) => {
        const response = await authenticatedPost('/spaces', {
            name: spaceNameRef.current.value,
            description: spaceDescriptionRef.current.value
        }).catch(e => {
            toast.error(e.response.data.message);
            return e.response;
        });

        if (response.data.space) {
            navigate(`/dashboard/spaces/${response.data.space.space_identifier}`);
        }
    }


    return (
        <div className="flex flex-col items-center mt-4">
            <div className="flex items-center justify-between w-[80vw]">
                <div className="text-3xl">
                    Your Spaces
                </div>
                <div>
                    <div onClick={() => setShowCreateSpaceModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg"> Create Space </div>
                </div>
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

            {
                showCreateSpaceModal && <div className="top-0 left-0 w-[100vw] h-[100vh] flex flex-col items-center justify-center " style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", position: "fixed" }}>

                    <div className="flex flex-col p-4 bg-white rounded-lg">
                        <input
                            type="text"
                            ref={spaceNameRef}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your Space name"
                        />
                        <textarea
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ref={spaceDescriptionRef}
                        />
                        <button className="bg-blue-600 text-white rounded-sm px-4 py-2 mt-4" onClick={submitSpace}> Create </button>
                    </div>
                </div>
            }
        </div>
    )
}
