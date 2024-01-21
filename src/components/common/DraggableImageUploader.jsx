import { useEffect, useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { LuImageOff } from "react-icons/lu";
import imageFileReader from "../../utils/imageFileReader";
import { changeCurrentProfilePicture, setProfilePicture } from "../../redux/slice/profileSlice";
import { useDispatch } from "react-redux";

const DraggableImageUploader = ({dragOverRef}) => {
    const dispatch = useDispatch()
    const [showDropContainer, setShowDropContainer] = useState(false)
    const [showPresentationContainer, setShowPresentationContainer] = useState(false)
    const [dropContainerData, setDropContainerData] = useState('')

    const dragOverEvent = (event) => {
        event.preventDefault()

        setShowDropContainer(true)
        setShowPresentationContainer(true)
    }

    const dragLeaveEvent = (event) => {
        event.preventDefault()

        setShowDropContainer(false)
        setShowPresentationContainer(false)
    }

    const dropEvent = (event) => {
        event.preventDefault()
        setShowDropContainer(false)
        setDropContainerData('loadding...')

        const accessFileTypes = ['image/png', 'image/jpeg', 'image/jpg']
        const file = event.dataTransfer.files[0] || {type: '', name: '.unknown'}

        // file validation
        if (accessFileTypes.includes(file?.type)) {
            // imageFileReader get an array argument
            imageFileReader(event.dataTransfer, ({imageData}) => {
                
                dispatch(changeCurrentProfilePicture(imageData))
                dispatch(setProfilePicture(imageData))

                setShowPresentationContainer(false)
                setDropContainerData('')
            })
        }
        else {
            setDropContainerData(
                <div className="flex flex-col justify-center items-center space-y-10">
                    <LuImageOff className="text-7xl text-rose-500"/>
                    <p className="text-slate-500">Your current uploaded file type is 
                        <span className="mx-1 text-rose-500 font-semibold">
                        {
                            file.type.split('/')[1] || file.name.split('.')[1]
                        }
                        </span>
                    </p>
                    <p className="font-semibold text-stone-500 text-xl">
                        You can just upload 
                        <span className="text-app-primary/90 mx-1">
                            [ png, jpg, jpeg ]
                        </span> 
                        this type of images
                    </p>

                    <button 
                        onClick={() => {setDropContainerData(''), setShowPresentationContainer(false)}}
                        className="text-white font-semibold bg-app-primary px-8 py-1 rounded-md"
                    >
                        Ok
                    </button>
                </div>
            )
        }
    }

    useEffect(() => {
        dragOverRef?.addEventListener('dragover', dragOverEvent)

        return () => {
            dragOverRef?.removeEventListener('dragover', dragOverEvent)
        }
    }, [dragOverRef])

    return (
        <>
        <div 
            onDragLeave={dragLeaveEvent} 
            onDrop={dropEvent}
            className={`fixed inset-0 z-[9999] ${showDropContainer ? '' : 'hidden'}`}
        />

        <div className={`absolute inset-0 z-10 rounded-md bg-white ${showPresentationContainer ? '' : 'hidden'}`}>
            <div className="w-full h-full flex justify-center items-center">
                {
                    dropContainerData ? dropContainerData
                    : <div className="flex flex-col justify-center items-center">
                        <BiSolidImageAdd className="text-7xl text-app-primary"/>
                        <p>Upload your profile picture.</p>
                    </div>
                }
            </div>
        </div>
        </>
    );
};

export default DraggableImageUploader;