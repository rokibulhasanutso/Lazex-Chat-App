import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { closeModal } from "../../redux/slice/modalSlice";
import ProfileModal from "./profileModal/ProfileModal";
import SignoutModal from "./signoutModal/SignoutModal";

const AppModal = () => {
    const allModalState = useSelector((state) => state.allModal)
    const dispatch = useDispatch()
    const modalRef = useRef(null)

    // allModalState just carry modals true false boolean 
    // and find method check which modal boolean first is true 
    // and return modalActive true other ways false
    const modalActive = Object.values(allModalState).find((modalState) => modalState)
    const { imageProfileModal, signoutModal } = allModalState

    useEffect(() => {
        const clickWithoutModal = (event) => {
            if (event.target === modalRef.current) {
                dispatch(closeModal())
            }
        }

        window.addEventListener('click', clickWithoutModal)
        return () => { window.removeEventListener('click', clickWithoutModal) }
    }, [dispatch])

    useEffect(() => {
        // when modal is show then scroll stop or hidden
        if (modalActive) {
            document.documentElement.style.overflowY = 'hidden'
        }
        else {
            document.documentElement.style.overflowY = ''
        }
    }, [modalActive])

    return (
        <>{
            modalActive &&
            <div 
                ref={modalRef}
                className={`fixed z-[999] bg-black/75 inset-0 flex justify-center items-center`}
            >
                { imageProfileModal && <ProfileModal/> }
                { signoutModal && <SignoutModal/> }

            </div>
        }</>
    );
};

export default AppModal;