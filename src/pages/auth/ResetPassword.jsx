import { useEffect, useMemo, useRef, useState } from 'react';
import '../../assets/css/signUpPage.css'
import AppLogo from "../../components/logo/AppLogo";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";
import passwordReset from '../../firebase/resetPassword';

const ResetPassword = () => {
    const navigate = useNavigate()

    // inputs
    const [ inputLavel, setInputLabel ] = useState({email: false})
    const [ formData, setFormData ] = useState({email: ''})
    const [ errors, setErrors ] = useState({active: false, msg: {}})

    // auth
    const [userCreationLoading, setUserCreationLoading] = useState(false)
    const [userCreationMessage, setUserCreationMessage] = useState({ status: '', message: ''})

    // component ref
    const emailRef = useRef(null)
   

    const inputFocused = (event, isFocused) => {
       const { name } = event.target

       setInputLabel({
            ...inputLavel,
            [name]: formData[name] ? true : isFocused
       })
    }

    const getFormData = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validation = useMemo(() => {

        const errors = {}

        // email validation check
        if (!formData.email) {
            errors.email = "Email is required"
        }
        else if (!/^[a-z0-9.]+@([a-z]+\.)+[a-z]{2,3}/.test(formData.email)) {
            errors.email = 'Please enter a valid email address'
        }

        return errors;
    }, [formData]);

    useEffect(() => {
        if (errors.active) {
            setErrors({
                ...errors,
                msg: validation
            })
        }
    }, [formData, errors.active]);

    useEffect(() => {
        // when first time page open then email is focused
        emailRef.current.focus()
    }, []);

    const formSubmission = (event) => {
        event.preventDefault();
        setUserCreationLoading(true);
        

        setErrors({...errors, active: true})

        const errorList = Object.keys(validation)
        
        if (errorList.length !== 0) {
            setUserCreationLoading(false);

            if (errorList.includes('email')) {
                setFormData({
                    ...formData,
                    email: ''
                })
                emailRef.current.focus()
            }
        }
        else {
            // here, you can submit your form data post on server
            // console.log(formData)

            passwordReset(formData.email, (response) => {

                setUserCreationLoading(false)

                console.log(response)

                if (response.ok) {
                    setUserCreationMessage({
                        status: 'success',
                        message: response.message
                    })

                    setErrors({active: false, msg: {}})

                    setFormData({
                        ...formData,
                        email: ''
                    })
                }
                else {
                    setUserCreationMessage({
                        status: 'error',
                        message: response.message
                    })

                    console.log(response.message)
                }
            })
        }
    }

    return (
        <div>
            <div className='flex justify-between h-screen'>
                <section className="signUp_input_section sm:w-[370px]">
                    <div className=''>
                        <div>
                            {/* logo */}
                            <AppLogo size={48} className={'text-center'}/>

                            <h1 className="signUp_title text-center">Reset password</h1>

                            {/* short discription */}
                            {
                                userCreationMessage.status !== 'success' && 
                                <p className="signUp_short_desc text-center mt-10">
                                    Enter the email you provided during account your creation.
                                </p>
                            }
                        </div>

                        {/* submission messsages */}
                        {
                            userCreationMessage.status &&
                            <div className={`px-8 py-4 transform ${
                                userCreationMessage.status === 'error' ? 'text-red-500 border-red-500 bg-red-50' : ''
                            } ${
                                userCreationMessage.status === 'success' ? 'text-green-500 border-green-500 bg-green-50' : ''
                            } transition-all ease-in inline-block mt-10 text-xl border font-semibold rounded-md`}>
                                <div className='flex space-x-2 items-center'>
                                    {
                                        userCreationMessage.status === 'success' 
                                        ? <>
                                            <div className='text-xl space-y-2 sm:w-[400px]'>
                                                <div className='flex items-center space-x-2 mb-4 text-green-500 font-semibold'>
                                                    <IoMdCheckmarkCircleOutline className='text-2xl'/>
                                                    <span>{userCreationMessage.message}</span>
                                                </div>
                                                <div className='text-black font-normal px-6'>
                                                    <ul className='list-decimal space-y-2'>
                                                        <li>Password reset link send on your email.</li>
                                                        <li>Open your email and click <strong>Click To Reset Your Password</strong> button.</li>
                                                        <li>After complete reset your password then you will go to 
                                                            <Link to={'/signin'} className='mx-1 text-app-primary underline'><strong>SignIn</strong></Link>
                                                            page.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                        : null
                                    }
                                    {
                                        userCreationMessage.status === 'error' 
                                        ? <><MdErrorOutline className='text-2xl'/>
                                          <span>{userCreationMessage.message}</span></>
                                        : null
                                    }
                                    
                                </div>
                            </div>
                        }

                        <div className={userCreationMessage.status === 'success' ? 'hidden' : null}>
                            <form className='mt-10 md:w-[370px]' onSubmit={formSubmission} noValidate>
                                {/* email field */}
                                <section className={`form_input_field_section`}>
                                    <div className={`form_input_field_area ${
                                        inputLavel.email || errors.msg.email
                                            ? `${errors.msg.email ? 'border-red-500' : 'border-emerald-500'}` 
                                            : 'border-gray-300'
                                    }`}>
                                        <input 
                                            type="text"
                                            name='email'
                                            ref={emailRef}
                                            onChange={getFormData}
                                            onFocus={(event) => { inputFocused(event, true) }}
                                            onBlur={(event) => { inputFocused(event, false) }}
                                            value={formData.email}
                                        />
                                        <p className={`form_input_label ${
                                            inputLavel.email || errors.msg.email
                                                ? `top-0 scale-75 origin-left bg-white ${ 
                                                  errors.msg.email ? 'text-red-500' :'text-emerald-500'
                                                }`
                                                : 'top-1/2 text-slate-500'
                                        }`}>Email Address</p>
                                    </div>
                                    {errors.active ? <p className={`form_input_errors`}>{errors.msg.email}</p> : null}
                                </section>

                                

                                

                                {/* submission button */}
                                <div className="form_submission_button">
                                    {
                                        userCreationLoading 
                                        ? <div className='loader'><LuLoader2 className='text-2xl mx-auto animate-spin'/></div>
                                        : <input type="submit" value={"Send Email"} className='cursor-pointer'/>
                                    }
                                </div>
                            </form>

                            <p className='mt-9 text-center text-[#11175D]'>
                                <button 
                                    onClick={() => navigate(-1)}
                                    className='px-4 py-2 border border-slate-400 hover:font-semibold active:bg-slate-200 rounded-md'
                                >
                                    Go Back
                                </button>
                            </p>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
};

export default ResetPassword;