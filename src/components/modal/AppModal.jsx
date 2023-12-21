import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { closeModal } from "../../redux/slice/modalSlice";
import ProfileModal from "./profileModal/ProfileModal";

const AppModal = () => {
    const allModalState = useSelector((state) => state.allModal)
    const dispatch = useDispatch()
    const modalRef = useRef(null)

    const modalActive = Object.values(allModalState).find((modalState) => modalState)
    const { imageProfileModal } = allModalState

    useEffect(() => {
        const clickWithoutModal = (event) => {
            if (event.target === modalRef.current) {
                dispatch(closeModal())
            }
        }

        window.addEventListener('click', clickWithoutModal)
        return () => { window.removeEventListener('click', clickWithoutModal) }
    }, [])

    return (
        <>{
            modalActive &&
            <div 
                ref={modalRef}
                className={`fixed ${ modalActive ? 'scale-100' : 'scale-75'} transition-all z-[999] bg-black/75 inset-0 flex justify-center items-center`}
            >
                { imageProfileModal && <ProfileModal/> }

            </div>
        }</>
    );
};

export default AppModal;