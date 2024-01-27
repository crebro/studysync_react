import { useEffect, useRef, useState } from "react";
import Navigation from "../Components/Navigation";
import axios from "axios";
import { authenticatedPost } from "utils/api"
import { Link } from "react-router-dom";


export default function Spaces(props) {
    const [spaces, setSpaces] = useState([]);
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

    const submitSpace = async (e) => {
        // const response = await axios.post('/spaces', {
        //     name: spaceNameRef.current.value,
        //     description: spaceDescriptionRef.current.value
        // }, {
        //     headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        // }).catch(e => { return null; });

        const response = await authenticatedPost('/spaces', {
            name: spaceNameRef.current.value,
            description: spaceDescriptionRef.current.value
        }).catch(e => { return null; });

        if (response) {
            setSpaces([...spaces, { name: spaceNameRef.current.value, description: spaceDescriptionRef.current.value }]);
        }
    }



    return (
        <div className="flex flex-col items-center">
            The following are your spaces.
            <div className="w-80">

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

            <div className='flex flex-col'>
                {spaces.map(space => {
                    return (
                        <Link className="flex flex-col" to={`/dashboard/spaces/${space.space_identifier}`}>
                            <div className="text-lg"> {space.name}</div>
                            <div className="text-sm"> {space.description}</div>
                        </Link>)
                })}
            </div>
        </div>
    )
}
