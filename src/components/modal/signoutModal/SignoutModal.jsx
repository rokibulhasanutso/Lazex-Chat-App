import { useDispatch } from "react-redux";
import { showSignoutModal } from "../../../redux/slice/modalSlice";
import userSignOut from "../../../firebase/signOut";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SignoutModal = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [signoutStatus, setSignoutStatus] = useState('')
    const navigate = useNavigate()

    const signoutAction = (action) => {
        setLoading(true)

        if (action) {
            userSignOut((res) => {
                if (res === 'success') {
                    setSignoutStatus(res)
                    setTimeout(() => {
                        dispatch(showSignoutModal(false))
                        navigate('/signin')
                    }, 500)
                }
                else if (res === 'error') {
                    setSignoutStatus(res)
                }
            })
        }
        else {
            dispatch(showSignoutModal(false))
        }
    }

    return (
        <div className="md:w-[500px] h-[300px] w-full">
            <div className="bg-white p-8 rounded-md h-full flex justify-center flex-col">
                {
                    loading 
                    ? <>
                        <div className=" flex justify-center">
                            <div className="relative">
                                {
                                    signoutStatus == '' &&
                                    <>
                                        <AiOutlineLoading3Quarters 
                                            className="text-[150px] text-green-500 animate-spin"
                                        />
                                        <span 
                                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold whitespace-nowrap"
                                        >
                                            Sign Out...
                                        </span>
                                    </>
                                }
                                {
                                    signoutStatus == 'success' &&
                                    <>
                                        <FiCheckCircle 
                                            className="text-[100px] text-green-500 mx-auto"
                                        />
                                        <span 
                                            className="font-semibold whitespace-nowrap block mt-5"
                                        >
                                            Sign Out Successfuly
                                        </span>
                                    </>
                                }
                                {
                                    signoutStatus == 'error' &&
                                    <>
                                        <div>
                                            <MdOutlineErrorOutline 
                                                className="text-[100px] text-red-500"
                                            />
                                            <span 
                                                className="font-semibold whitespace-nowrap block text-center text-red-500"
                                            >
                                                Sign Out error
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => signoutAction(false)}
                                            className="bg-red-500 font-semibold px-6 py-2 mt-8 text-white mx-auto block rounded-md"
                                        >
                                            close
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </>
                    :<>
                        <p className="text-center text-2xl text-slate-500 ">Are you sure Signout?</p>
                        <div className="flex justify-center gap-5 mt-10">
                            <button
                                onClick={() => signoutAction(false)}
                                className="bg-app-primary font-semibold px-6 py-2 text-white rounded-md"
                            >
                                No
                            </button>
                            <button
                                onClick={() => signoutAction(true)}
                                className="bg-white border border-gray-500 hover:border-transparent font-semibold hover:bg-slate-200 px-6 py-2 rounded-md"
                            >
                                Yes
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default SignoutModal;