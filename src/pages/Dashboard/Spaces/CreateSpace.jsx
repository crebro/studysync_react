import React from 'react'
import { useNavigate } from 'react-router-dom';
import { authenticatedPost } from "utils/api"

export function CreateSpace(props) {
    const spaceNameRef = React.useRef();
    const spaceDescriptionRef = React.useRef();

    const navigate = useNavigate();

    const submitSpace = async (e) => {
        const response = await authenticatedPost('/spaces', {
            name: spaceNameRef.current.value,
            description: spaceDescriptionRef.current.value
        }).catch(e => { return null; });

        if (response) {
            navigate(`/dashboard/your-spaces/${response.data.space.identifier}`);
            // setSpaces([...spaces, { name: spaceNameRef.current.value, description: spaceDescriptionRef.current.value }]);
        }
    }

    return (
        <>
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
        </>
    )
}
