import { useDispatch } from 'react-redux';
import { showImageProfileModal } from '../../../redux/slice/modalSlice';
import { IoIosCloseCircle } from 'react-icons/io';
import ProfileImageSection from './ProfileImageSection';
import ProfileUserDetails from './ProfileUserDetails';
import { useEffect, useRef, useState } from 'react';
import DraggableImageUploader from '../../common/DraggableImageUploader';

const ProfileModal = () => {
    const dispatch = useDispatch()
    const modalRef = useRef()
    const [parentElement, setParentElement] = useState(null)

    useEffect(() => {
        setParentElement(modalRef.current.parentElement)
    }, [])

    return (
        <div className="bg-white rounded-md relative overflow-hidden" ref={modalRef}>
            <DraggableImageUploader dragOverRef={parentElement}/>

            <div className=''>
                <div className=" px-4 py-2.5 border-b flex justify-between items-center">
                    <p className="font-semibold text-slate-600">Image cropper</p>

                    <button 
                        onClick={() => dispatch(showImageProfileModal(false))}
                        className="group/mcb cursor-pointer"
                    >
                        <IoIosCloseCircle
                            className="text-2xl text-slate-600 group-active/mcb:text-slate-400"
                        />
                    </button>
                </div>

                <div className="p-4">
                    <div className="w-auto h-auto lg:flex lg:space-x-4">
                        <ProfileImageSection/>
                        <ProfileUserDetails/>
                    </div>
                </div>

                {/* cancel or save button */}
                <div className="px-4 py-2 border-t text-end space-x-2">
                    <button 
                        onClick={() => dispatch(showImageProfileModal(false))}
                        className='px-4 py-2 rounded-md font-semibold bg-slate-200 text-slate-700 active:opacity-75'
                    >
                        Cencle
                    </button>
                    <button 
                        className='px-4 py-2 rounded-md font-semibold bg-app-primary text-white active:opacity-75'
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;