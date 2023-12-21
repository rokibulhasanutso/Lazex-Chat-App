import { useEffect, useMemo, useRef, useState } from 'react';
import '../../assets/css/signUpPage.css'
import AppLogo from "../../components/logo/AppLogo";
import { Link, useNavigate } from 'react-router-dom';
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";
import createUser from '../../firebase/createUser';

const SignUp = () => {
    const navigate = useNavigate()

    // inputs
    const [ inputLavel, setInputLabel ] = useState({email: false, name: false, password: false})
    const [ formData, setFormData ] = useState({email: '', name: '', password: ''})
    const [ errors, setErrors ] = useState({active: false, msg: {}})
    const [ showPassword, setShowPassword ] = useState(false)

    // auth
    const [userCreationLoading, setUserCreationLoading] = useState(false)
    const [userCreationMessage, setUserCreationMessage] = useState({ status: '', message: ''})

    // component ref
    const emailRef = useRef(null)
    const nameRef = useRef(null)
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

        // name validation check
        if (!formData.name) {
            errors.name = "Name is required"
        }
        else if (/^[0-9]/.test(formData.name)) {
            errors.name = `You can't start number with your name`
        }
        else if (!/^[A-Za-z0-9\s]+$/.test(formData.name)) {
            errors.name = `You can't use special characters in your name`
        }
        else if (!/^.{2,30}$/.test(formData.name)) {
            errors.name = `Length must be between 2 and 30 characters`
        }

        // password validation check
        if (!formData.password) {
            errors.password = "Password is required";
        } 
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)(?!.* ).{8,}/.test(formData.password)) {
            
            errors.password = [];

            if (!/^(?=.*[a-z])/.test(formData.password)) {
                errors.password.push("Minimum one character is lowerCase");
            }
            if (!/^(?=.*[A-Z])/.test(formData.password)) {
                errors.password.push("Minimum one character is upperCase");
            }
            if (!/^(?=.*[0-9])/.test(formData.password)) {
                errors.password.push("Minimum one number must be between");
            }
            if (!/^(?=.*\W)/.test(formData.password)) {
                errors.password.push("Minimum one special character");
            }
            if (!/^.{8,}/.test(formData.password)) {
                errors.password.push("Must be at least 8 characters");
            }
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
        event.preventDefault();
        setUserCreationLoading(true);

        // form data trim before submission
        let submissionData;
        Object.entries(formData)
            .forEach(([key, value]) => 
                submissionData = {
                    ...submissionData,
                    [key]: value.trim() 
                }
            )
        

        setErrors({...errors, active: true})

        const errorList = Object.keys(validation)
        
        if (errorList.length !== 0) {
            setUserCreationLoading(false);

            if (errorList.includes('email')) {
                // setFormData({
                //     ...formData,
                //     email: ''
                // })
                emailRef.current.focus()
            }
            else if (errorList.includes('name')) {
                // setFormData({
                //     ...formData,
                //     name: ''
                // })
                nameRef.current.focus()
            }
            else if (errorList.includes('password')) {
                // setFormData({
                //     ...formData,
                //     password: ''
                // })
                passwordRef.current.focus()
            }
        }
        else {
            // here, you can submit your form data post on server
            // console.log(submissionData)

            createUser(submissionData, (response) => {
                setUserCreationLoading(false)

                // console.log(response);

                if (response.ok) {
                    setUserCreationMessage({ 
                        status: 'success',
                        message: 'Your account created successfully'
                    })
                    
                    

                    setTimeout(() => {
                        navigate('/')
                    }, 500);
                }
                else {
                    setUserCreationMessage({ 
                        status: 'error',
                        message: response.error.errorCode === 'auth/email-already-in-use'
                                ? 'This email already used.'
                                : 'Your account creation failed! Please try again.'
                    })
                }

                // when form submit successfully then every feild is reset
                setErrors({ active: false, msg: {} })
                setFormData({email: '', name: '', password: ''})
                setInputLabel({email: false, name: false, password: false})
            })

        }
    }

    return (
        <div>
            <div className='flex justify-between h-auto'>
                <section className="signUp_input_section">
                    <div className='mx-auto'>
                        <div>
                            {/* logo */}
                            <AppLogo size={48} className={'lg:text-left text-center'}/>

                            {/* titile */}
                            <h1 className="signUp_title">Get started with easily register</h1>

                            {/* short discription */}
                            <p className="signUp_short_desc">Free register and you can enjoy it</p>
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

                                {/* full_name field */}
                                <section className={`form_input_field_section`}>
                                    <div className={`form_input_field_area ${
                                        inputLavel.name || errors.msg.name
                                            ? `${errors.msg.name ? 'border-red-500' : 'border-emerald-500'}` 
                                            : 'border-gray-300'
                                    }`}>
                                        <input 
                                            type="text"
                                            name='name'
                                            ref={nameRef}
                                            onChange={getFormData}
                                            onFocus={(event) => { inputFocused(event, true) }}
                                            onBlur={(event) => { inputFocused(event, false) }}
                                            value={formData.name}
                                        />
                                        <p className={`form_input_label ${
                                            inputLavel.name || errors.msg.name
                                                ? `top-0 scale-75 origin-left bg-white ${
                                                    errors.msg.name ? 'text-red-500' : 'text-emerald-500'
                                                }`
                                                : 'top-1/2 text-slate-500'
                                        }`}>Full Name</p>
                                    </div>
                                    {errors.active ? <p className={`form_input_errors`}>{errors.msg.name}</p> : null}
                                </section>

                                {/* password field */}
                                <section className={`form_input_field_section`}>
                                    <div className={`form_input_field_area ${
                                        inputLavel.password || errors.msg.password
                                            ? `${errors.msg.password ? 'border-red-500' : 'border-emerald-500'}` 
                                            : 'border-gray-300'
                                    }`}>
                                        <input 
                                            type={showPassword ? 'text' :'password'}
                                            name="password"
                                            ref={passwordRef}
                                            onChange={getFormData}
                                            onFocus={(event) => { inputFocused(event, true) }}
                                            onBlur={(event) => { inputFocused(event, false) }}
                                            value={formData.password}
                                        />
                                        <p className={`form_input_label ${
                                            inputLavel.password || errors.msg.password
                                                ? `top-0 scale-75 origin-left bg-white ${ 
                                                  errors.msg.password ? 'text-red-500' :'text-emerald-500'
                                                }`
                                                : 'top-1/2 text-slate-500'
                                        }`}>Password</p>
                                        <span className='absolute z-[1] top-1/2 right-5 text-slate-400 cursor-pointer transform -translate-y-1/2 text-2xl'>
                                            {showPassword ? <RiEyeFill/> : <RiEyeOffFill/>}
                                            <span 
                                                className='absolute inset-0 block'
                                                onClick={() => setShowPassword(!showPassword)}
                                                ref={passwordEyeRef}
                                            ></span>
                                        </span>
                                    </div>
                                    {errors.active ? 
                                        Array.isArray(errors.msg.password) 
                                        ? <ul className='ps-7 my-2 list-disc'>
                                           { errors.msg.password.map((msg, index) => {
                                                return <li key={index} className={`text-red-500`}>{msg}</li>
                                           })}
                                          </ul>
                                        : <p className={`form_input_errors`}>{errors.msg.password}</p>
                                     : null}
                                </section>

                                {/* submission button */}
                                <div className="form_submission_button">
                                    {
                                        userCreationLoading 
                                        ? <div className='loader'><LuLoader2 className='text-2xl mx-auto animate-spin'/></div>
                                        : <input type="submit" value={'Sign up'} className='cursor-pointer'/>
                                    }
                                </div>
                            </form>

                            <p className='mt-9 text-center text-[#11175D]'>
                                Already have an account ? 
                                <Link to={'/signin'} className='ms-2 text-orange-500 font-medium'>Sign In</Link>
                            </p>
                        </div>
                    </div>
                </section>
                
                <section className="signUp_body_image_section">
                    <img 
                        src="/app_Images/signupPage_FontImage.png" 
                        alt="signUp Page Body Image"
                        className={`h-full w-full`}
                    />
                </section>
            </div>
        </div>
    );
};

export default SignUp;