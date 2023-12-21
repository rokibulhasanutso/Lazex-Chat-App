import { Link, useNavigate } from "react-router-dom";
import '../../assets/css/signInPage.css'
import AppLogo from "../../components/logo/AppLogo";
import { useEffect, useRef, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import signInUser from "../../firebase/signInUser";
import { LuLoader2 } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

const SignIn = () => {
    
    const navigate = useNavigate()

    const [ inputLavel, setInputLabel ] = useState({email: false, password: false})
    const [ formData, setFormData ] = useState({email: '', password: ''})
    const [ error, setError ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)

    // auth
    const [userCreationLoading, setUserCreationLoading] = useState(false)
    const [userCreationMessage, setUserCreationMessage] = useState({ status: '', message: ''})

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const passwordEyeRef = useRef(null)

    const inputFocused = (event, isFocused) => {
       const { name } = event.target

       setInputLabel({
            ...inputLavel,
            [name]: formData[name] ? true : isFocused
       })
    }

    const getFormData = (event) => {
        const { name, value } = event.target

        if (error) setError(false)
        if (userCreationMessage.status) setUserCreationMessage({ status: '', message: ''})

        setFormData({
            ...formData,
            [name]: value.trim()
        })
    }

    useEffect(() => {
        // when first time page open then email is focused
        emailRef.current.focus()

        const handleWindowClick = (event) => {
            if (
                event.target !== passwordEyeRef.current &&
                event.target !== passwordRef.current 
            ) {
                setShowPassword(false)
            }
        }

        window.addEventListener('click', handleWindowClick)

        return () => {
            window.removeEventListener('click', handleWindowClick)
        }
    }, []);

    const formSubmission = (event) => {
        event.preventDefault()
        setUserCreationLoading(true)

        signInUser(formData, (response) => {
            setUserCreationLoading(false)

            // console.log(response);

            if (response.ok) {
                setUserCreationMessage({ 
                    status: 'success',
                    message: 'You are login successfully'
                })
                
                // when form submit successfully then every feild is reset
                setInputLabel({email: false, password: false})
                setFormData({email: '', password: ''})
                
                setTimeout(() => {
                    navigate('/')
                }, 500);
                
            }
            else {
                setUserCreationMessage({ 
                    status: 'error',
                    message: response.error.errorCode === 'auth/invalid-email'
                            ? 'Invalid email'
                            : response.error.errorCode === 'auth/invalid-credential'
                                ? 'Invalid email or password!\n Please try again.'
                                : 'Something is Wrong authenticaion.'
                })
                setError(true)
            }
        })
    }

    return (
        <div>
            <div className="flex justify-between h-auto">
                <section className="signIn_input_section">
                    <div className='mx-auto'>
                        <div className="mb-7">
                            {/* logo */}
                            <AppLogo size={48} className={'lg:text-left text-center'}/>

                            {/* titile */}
                            <h1 className="signIn_title">Login to your account !</h1>

                            {/* short discription */}
                            <p className="signIn_short_desc hidden"></p>
                        </div>

                        <div className="authenticaionWithOther mb-7">
                            {/* google authenticaion button */}
                            <div className="inline-block cursor-pointer active:bg-slate-100">
                                <div className="border border-gray-400 px-7 py-5 rounded-md flex gap-2 items-center">
                                    <div className="googleAuth-img">
                                        <img src="/public/app_Images/google-icon.png" alt="Google Icon" />
                                    </div>
                                    <span className="font-semibold text-[#11175D] select-none">Login with Google</span>
                                </div>
                            </div>
                        </div>

                        {/* submission messsages */}
                        {
                            userCreationMessage.status &&
                            <div className={`px-8 py-3.5 transform ${
                                userCreationMessage.status === 'error' ? 'text-red-500 border-red-500 bg-red-50' : ''
                            } ${
                                userCreationMessage.status === 'success' ? 'text-green-500 border-green-500 bg-green-50' : ''
                            } transition-all ease-in inline-block mt-10 text-xl border font-semibold rounded-md`}>
                                <div className='flex space-x-2 items-center'>
                                    {
                                        userCreationMessage.status === 'success' 
                                        ? <><IoMdCheckmarkCircleOutline className='text-2xl'/>
                                          <span>{userCreationMessage.message}</span></>
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

                        <div className='sm:w-[370px] lg:mx-0 mx-auto'>
                            <form className="mt-10 md:w-[370px]" onSubmit={formSubmission} noValidate>
                                {/* email field */}
                                <section className={`SignIn_form_input_field_section`}>
                                    <div className={`SignIn_form_input_field_area ${
                                        inputLavel.email || error
                                            ? `${error ? 'border-red-500' : 'border-emerald-500'}` 
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
                                        <p className={`SignIn_form_input_label ${
                                            inputLavel.email || error
                                                ? `top-0 scale-75 origin-left bg-white ${ 
                                                  error ? 'text-red-500' :'text-emerald-500'
                                                }`
                                                : 'top-1/2 text-slate-500'
                                        }`}>Email Address</p>
                                    </div>
                                </section>

                                {/* password field */}
                                <section className={`SignIn_form_input_field_section`}>
                                    <div className={`SignIn_form_input_field_area ${
                                        inputLavel.password || error
                                            ? `${error ? 'border-red-500' : 'border-emerald-500'}` 
                                            : 'border-gray-300'
                                    }`}>
                                        <input 
                                            type={showPassword ? 'text' :'password'}
                                            name="password"
                                            className={'!pe-10'}
                                            ref={passwordRef}
                                            onChange={getFormData}
                                            onFocus={(event) => { inputFocused(event, true) }}
                                            onBlur={(event) => { inputFocused(event, false) }}
                                            value={formData.password}
                                        />
                                        <p className={`SignIn_form_input_label ${
                                            inputLavel.password || error
                                                ? `top-0 scale-75 origin-left bg-white ${ 
                                                  error ? 'text-red-500' :'text-emerald-500'
                                                }`
                                                : 'top-1/2 text-slate-500'
                                        }`}>Password</p>
                                        <span className='absolute z-[1] top-1/2 right-2 text-slate-400 cursor-pointer transform -translate-y-1/2 text-2xl'>
                                            {showPassword ? <RiEyeFill/> : <RiEyeOffFill/>}
                                            <span 
                                                className='absolute inset-0 block'
                                                onClick={() => setShowPassword(!showPassword)}
                                                ref={passwordEyeRef}
                                            ></span>
                                        </span>
                                    </div>
                                </section>

                                {/* submission button */}
                                <div className="SignIn_form_submission_button">
                                    {
                                        userCreationLoading 
                                        ? <div className='loader'><LuLoader2 className='text-2xl mx-auto animate-spin'/></div>
                                        : <input type="submit" value={'Login to Continue'} className='cursor-pointer'/>
                                    }
                                </div>
                            </form>

                            <p className='mt-9 text-left'>
                                <Link to={'/resetpassword'} className=' hover:underline text-orange-500 font-medium'>Forget Password</Link>
                            </p>

                            <p className='mt-5 text-left text-[#11175D]'>
                                Don’t have an account ? 
                                <Link to={'/signUp'} className='ms-2 text-orange-500 font-medium'>Sign Up</Link>
                            </p>

                        </div>
                    </div>
                </section>
                
                <section className="signIn_body_image_section">
                    <img 
                        src="/app_Images/signinPage_FontImage.png" 
                        alt="Login Page Body Image"
                        className={`h-full w-full`}
                    />
                </section>
            </div>
        </div>
    );
};

export default SignIn;