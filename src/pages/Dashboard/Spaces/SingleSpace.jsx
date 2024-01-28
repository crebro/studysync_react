import { UserContext } from "providers/UserProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { authenticatedPost, authenticatedRequest } from "utils/api"


export default function SingleSpace() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [space, setSpace] = useState([]);
    const fileInput = useRef(null);
    const nameRef = useRef(null);
    const flashCardRef = useRef(null);

    const [showNoteCreateModal, setShowNoteCreateModal] = useState(false);
    const [showFlashCardCreateModel, setShowFlashCardCreateModel] = useState(false);
    const [showInvitationModal, setShowInvitationModal] = useState(false);

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

        const response = await authenticatedPost(`/notes`, formData).catch(e => { toast.error(e.response.data.message); return e.response; });
        if (response.data.note) {
            setShowNoteCreateModal(false);
            setSpace({ ...space, notes: [...space.notes, response.data.note] });
        }
    }

    const submitFlashDeck = async (e) => {
        const response = await authenticatedPost(`/question_banks`, {
            name: flashCardRef.current.value,
            space_id: space.id
        }).catch(e => { toast.error(e.response.data.message); return e.response; });
        if (response.data.question_bank) {
            setShowFlashCardCreateModel(false);
            setSpace({ ...space, question_banks: [...space.question_banks, response.data.question_bank] });
        }
    }



    return (
        <div className="flex flex-col items-center mt-4">
            <div className="w-[80vw]">



                {space && <> <div className="flex items-center justify-between">
                    <div>
                        <div className="text-3xl">
                            Your Study Space; {space.name}
                        </div>
                        <div className="text-sm"> {space.description}</div>
                    </div>
                    <div>
                        <div onClick={() => setShowInvitationModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg"> Invite Members </div>
                    </div>


                </div>
                    <hr />



                    <div className="flex mt-4">
                        <div className="flex-1 mr-4">
                            <div className="flex items-center justify-between  mb-2">
                                <div className="text-2xl"> Documents </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowNoteCreateModal(true)} > Add </button>
                            </div>
                            {
                                space.notes && space.notes.map(note => {
                                    return <div className="flex bg-gray-200 px-4 py-2 items-center justify-between mb-2 rounded-lg">
                                        <div className="text-lg"> {note.title}</div>
                                        <Link to={`/dashboard/reader/${note.location}`}> Open link </Link>
                                    </div>
                                })
                            }
                        </div>
                        <div className="flex-1 ml-4">
                            <div className="flex items-center justify-between  mb-2">
                                <div className="text-2xl"> Flash Cards </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowFlashCardCreateModel(true)} > Add </button>
                            </div>
                            {
                                space.question_banks && space.question_banks.map(questionBank => {
                                    return <div className="flex bg-gray-200 px-4 py-2 items-center justify-between mb-2 rounded-lg">
                                        <div className="text-lg"> {questionBank.name}</div>
                                        <Link to={`/dashboard/flashdecks/${questionBank.id}`}> Open Flash Deck </Link>
                                        {
                                            questionBank.creator_id === user.id && <Link to={`/dashboard/flashdecks/update/${questionBank.id}`}> Edit Flash Deck </Link>
                                        }
                                </div>
                            })
                            }
                        </div>

                    </div>


                    {
                        showNoteCreateModal && <div className="top-0 left-0 w-[100vw] h-[100vh] flex flex-col items-center justify-center " style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", position: "fixed" }}>
                            <div className="flex flex-col p-4 bg-white rounded-lg">
                                <input type="file" ref={fileInput} accept="application/pdf" />
                                <input
                                    type="text"
                                    ref={nameRef}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Add name"
                                />
                                <button className="bg-blue-600 text-white rounded-sm px-4 py-2 mt-4" onClick={submitNote}> Create </button>
                                <button className="bg-gray-200 text-black rounded-sm px-4 py-2 mt-4" onClick={() => setShowNoteCreateModal(false)}> Cancel </button>
                            </div>
                        </div>
                    }

                    {
                        showInvitationModal && <div className="top-0 left-0 w-[100vw] h-[100vh] flex flex-col items-center justify-center " style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", position: "fixed" }}>
                            <div className="flex flex-col p-4 bg-white rounded-lg">
                                <input
                                    type="text"
                                    ref={nameRef}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={`http://localhost:3000/invitation/join/${space.invitation_code}`}
                                    readOnly
                                />
                                <button className="bg-gray-200 text-black rounded-sm px-4 py-2 mt-4" onClick={() => setShowInvitationModal(false)}> Cancel </button>
                            </div>
                        </div>
                    }

                    {
                        showFlashCardCreateModel && <div className="top-0 left-0 w-[100vw] h-[100vh] flex flex-col items-center justify-center " style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", position: "fixed" }}>
                            <div className="flex flex-col p-4 bg-white rounded-lg">
                                <input
                                    type="text"
                                    ref={flashCardRef}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Add name"
                                />
                                <button className="bg-blue-600 text-white rounded-sm px-4 py-2 mt-4" onClick={submitFlashDeck}> Submit </button>
                                <button className="bg-gray-200 text-black rounded-sm px-4 py-2 mt-4" onClick={() => setShowFlashCardCreateModel(false)}> Cancel </button>
                            </div>
                        </div>
                    }

                </>}

            </div>

        </div>
    )
}