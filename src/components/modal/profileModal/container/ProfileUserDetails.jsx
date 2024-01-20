import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RxCalendar } from "react-icons/rx";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useSelector } from "react-redux";
import { dbUserRef } from "../../../../firebase/realtimeDatabaseFunctions";
import { RiLoader4Line } from "react-icons/ri";
import { update } from "firebase/database";

const ProfileUserDetails = () => {
    const { userPersonalInfo} = useSelector((state) => state.profileSet)
    const [bio, setBio] = useState({ edit: false, data: userPersonalInfo?.userBio })
    const [bioloading, setBioloading] = useState(false)
    const [personalInfo, setPersonalInfo] = useState({ edit: false, data: userPersonalInfo})
    const [personalInfoLoading, setPersonalInfoLoading] = useState(false)
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const dayPickerRef = useRef()

    // user bio functions start
    const changeBio = (e) => {
        setBio({...bio, data: e.target.value})
    }

    const bioContentEditCancel = () => {
        setBio({edit: false, data: userPersonalInfo.userBio})
    }

    const updateBio = () => {
        setBioloading(true)

        update(dbUserRef() , { userBio : bio.data }) // update realtime database firbase
        .then(() => {
            setBioloading(false)
            setBio({...bio, edit: false})
        })
        .catch(() => {
            setBioloading(false)
        })
    }
    // user bio functions end

    // personal info functions start
    const changePersonalInfo = (e) => {
        const {name, value} = e.target

        setPersonalInfo({
            ...personalInfo,
            data: {...personalInfo.data, [name]:value},
        })
    }

    const personalInfoEditCancel = () => {
        setPersonalInfo({edit: false, data:userPersonalInfo})
    }

    const updatePersonalInfo = () => {
        setPersonalInfoLoading(true)

        update(dbUserRef() , personalInfo.data) // update realtime database firbase
        .then(() => {
            setPersonalInfoLoading(false)
            setPersonalInfo({...personalInfo, edit: false})
        })
        .catch(() => {
            setPersonalInfoLoading(false)
        })
    }
    // personal info functions end

    // date picker contain or not 
    useEffect(() => {
        const dayPickerClose = (event) => {
            if (datePickerOpen) { 
                if (!dayPickerRef.current.contains(event.target)) {
                    setDatePickerOpen(false);
                }
            }
        }

        window.addEventListener('mousedown', dayPickerClose)
        return () => { window.removeEventListener('mousedown', dayPickerClose) }
    }, [datePickerOpen])

    return (
        <div className="min-w-[400px]">
            <div className="space-y-4">

                {/* user bio content */}
                <div className={`relative ${!bio.edit ? 'group/bioEdit hover:border-app-primary' : ''} py-2 px-4 border border-slate-300 rounded-md`}>
                    <p className="text-center text-xl font-semibold">Bio</p>
                    
                    {/* edit button */}
                    <button 
                        onClick={() => setBio({...bio, edit: true})}
                        className="absolute top-1 right-1 invisible group-hover/bioEdit:visible group-hover/bioEdit:bg-app-primary group-hover/bioEdit:text-white group-hover/bioEdit:active:bg-app-primary/75 rounded-full p-2"
                    >
                        <FiEdit/>
                    </button>

                    {/* bio input field */}
                    {
                        bio.edit
                        ? <textarea 
                            onChange={changeBio} 
                            className="max-w-[400px] h-32 w-full outline-app-primary border-2 border-app-primary rounded-md px-2 py-1 text-start text-lg " 
                            placeholder="Write start here..."
                            value={bio.data}
                          />
                        : <p className="max-w-[400px] py-1 text-center text-lg">
                            {userPersonalInfo?.userBio || <span className="text-gray-400">Write a summary about yourself...</span>}
                          </p>
                    }

                    {/* action field */}
                    {
                        bio.edit &&
                        <div className="flex gap-x-2 justify-end mt-2">
                            <button 
                                onClick={bioContentEditCancel}
                                className="border rounded-md bg-slate-100 px-3 py-1 text-sm text-gray-500 font-semibold"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={updateBio}
                                className="border rounded-md bg-app-primary px-3 py-1 text-sm text-white font-semibold"
                            >
                                Update
                            </button>
                        </div>
                    }

                    {/* loading content */}
                    {
                        bioloading && 
                        <div className="absolute inset-0 backdrop-blur-[1px] bg-app-primary/25 flex justify-center items-center">
                            <span className="block">
                                <RiLoader4Line className="animate-spin text-3xl text-blue-600"/>
                            </span>
                        </div>
                    }
                </div>

                {/* personal info */}
                <div className="relative group/infoEdit border border-slate-300 hover:border-app-primary py-2 px-4 rounded-md">
                    <p className="text-center text-xl font-semibold">Personal info</p>
                    
                    {/* edit button */}
                    <button 
                        onClick={() => setPersonalInfo({...personalInfo, edit: true})}
                        className="absolute top-1 right-1 invisible group-hover/infoEdit:visible group-hover/infoEdit:bg-app-primary group-hover/infoEdit:text-white group-hover/infoEdit:active:bg-app-primary/75 rounded-full p-2"
                    >
                        <FiEdit/>
                    </button>
                    
                    {/* form field */}
                    <div className="py-4 space-y-2">
                        {/* name field */}
                        <div className="text-xl py-1">
                            <span className="w-32 inline-block">Name : </span>
                            {
                                personalInfo.edit
                                ? <input 
                                    type="text" 
                                    value={personalInfo.data?.name}
                                    name="name"
                                    onChange={changePersonalInfo}
                                    className="border-2 border-app-primary outline-app-primary px-2 py-1 rounded-md"
                                  />
                                : <span className="ms-2">{userPersonalInfo?.name || <span className="text-gray-400">Set name</span>}</span>
                            }
                        </div>

                        {/* email field */}
                        <div className="text-xl py-1">
                            <span className="w-32 inline-block">Email : </span>
                            {
                                personalInfo.edit
                                ? <input 
                                    type="text" 
                                    value={personalInfo.data?.email}
                                    name="email"
                                    onChange={changePersonalInfo}
                                    className="border-2 border-app-primary outline-app-primary px-2 py-1 rounded-md"
                                  />
                                : <span className="ms-2">{personalInfo.data?.email || <span className="text-gray-400">Set email</span>}</span>
                            }
                        </div>

                        {/* date of birth */}
                        <div className="text-xl py-1">
                            <span className="w-32 inline-block">Date of birth : </span>
                            <div className="relative inline-block">
                                <span className="ms-2">{
                                    userPersonalInfo?.bithdate || personalInfo.edit 
                                    ? personalInfo.data?.birthdate
                                    : <span className="text-gray-400 font-normal capitalize">update birth date</span>
                                }</span>
                                
                                {
                                    personalInfo.edit &&
                                    <div className="inline-block">
                                        <button
                                            onClick={() => setDatePickerOpen(!datePickerOpen)}
                                            className="ms-2 p-1 bg-app-primary active:bg-app-primary/75 rounded-md text-white"
                                        >
                                            <RxCalendar/>
                                        </button>

                                        {
                                            datePickerOpen &&
                                            <div ref={dayPickerRef} className="absolute !m-auto left-1/2 -translate-x-1/2">
                                                <style>
                                                {`
                                                    .dayPicker-selected:not([disabled]) { 
                                                        background-color: #5F35F5;
                                                        color: #FFFFFF;
                                                        font-weight: 600;
                                                    }
                                                    .dayPicker-selected:hover:not([disabled]) { 
                                                        background-color: #5F35F5 !important;
                                                        color: #FFFFFF;import { useSelector } from 'react-redux';

                                                    }
                                                    .dayPicker-selected:hover { 
                                                        background-color: #5F35F5;
                                                        color: #FFFFFF;
                                                    }
                                                    .dayPicker-today {
                                                        color: #5F35F5;
                                                        font-weight: 600;
                                                    }
                                                `}
                                                </style>
                                                <DayPicker
                                                    className="!mt-2 shadow-2xl bg-white border rounded-md p-2 border-app-primary"
                                                    mode="single"
                                                    required
                                                    selected={new Date(personalInfo.data?.birthdate)}
                                                    onSelect={(date) => { 
                                                        setPersonalInfo({
                                                            ...personalInfo,
                                                            data: {...personalInfo.data, birthdate: format(date, 'PP')}
                                                        }) 
                                                    }}
                                                    captionLayout="dropdown-buttons"
                                                    fromYear={1971}
                                                    toDate={new Date()}
                                                    modifiersClassNames={{
                                                        selected: 'dayPicker-selected',
                                                        today: 'dayPicker-today'
                                                    }}
                                                    footer={
                                                        <div className="">
                                                            <button 
                                                                onClick={() => setDatePickerOpen(false)}
                                                                className="block border ms-auto px-4 py-1 font-semibold rounded-md bg-app-primary text-white text-sm"
                                                            >
                                                                OK
                                                            </button>
                                                        </div>
                                                    }
                                                />
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                        {/* gender field */}
                        <div className="text-xl py-1 flex">
                            <span className="w-32 inline-block">Gender : </span>
                            {
                                personalInfo.edit
                                ? <div className="flex space-x-3">
                                    <p
                                        onClick={() => setPersonalInfo({...personalInfo, data: { ...personalInfo.data, gender: 'male'}})}
                                        className={`capitalize px-2.5 py-0.5 text-base border ${personalInfo.data?.gender === 'male' ? 'bg-app-primary text-white border-transparent select-none pointer-events-none' : 'border-slate-400 text-black cursor-pointer'} rounded-md`}
                                    >male</p>
                                    <p
                                        onClick={() => setPersonalInfo({...personalInfo, data: { ...personalInfo.data, gender: 'female'}})}
                                        className={`capitalize px-2.5 py-0.5 text-base border ${personalInfo.data?.gender === 'female' ? 'bg-app-primary text-white border-transparent select-none pointer-events-none' : 'border-slate-400 text-black cursor-pointer'} rounded-md`}
                                    >female</p>
                                    <p
                                        onClick={() => setPersonalInfo({...personalInfo, data: { ...personalInfo.data, gender: 'others'}})}
                                        className={`capitalize px-2.5 py-0.5 text-base border ${personalInfo.data?.gender === 'others' ? 'bg-app-primary text-white border-transparent select-none pointer-events-none' : 'border-slate-400 text-black cursor-pointer'} rounded-md`}
                                    >others</p>
                                  </div>
                                : <span className="capitalize ms-2">{userPersonalInfo?.gender || <span className="text-gray-400">update gender</span>}</span>
                            }
                        </div>

                        {/* contact number field */}
                        <div className="text-xl py-1">
                            <span className="w-32 inline-block">Phone : </span>
                            {
                                personalInfo.edit 
                                ? <input 
                                    type="text" 
                                    value={personalInfo.data?.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changePersonalInfo}
                                    placeholder="+8801 xxxxxxxxx"
                                    className="border-2 border-app-primary outline-app-primary px-2 py-1 rounded-md"
                                />
                                : <span className="ms-2">{userPersonalInfo?.phoneNumber || <span className="text-gray-400">+8801 xxxxxxxxx</span>}</span>
                            }
                        </div>
                    </div>

                    {/* action field */}
                    {
                        personalInfo.edit &&
                        <div className="flex gap-x-2 justify-end mt-2">
                            <button 
                                onClick={personalInfoEditCancel}
                                className="border rounded-md bg-slate-100 px-3 py-1 text-sm text-gray-500 font-semibold"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={updatePersonalInfo}
                                className="border rounded-md bg-app-primary px-3 py-1 text-sm text-white font-semibold"
                            >
                                Update
                            </button>
                        </div>
                    }

                    {/* loading content */}
                    {
                        personalInfoLoading && 
                        <div className="absolute inset-0 backdrop-blur-[1px] bg-app-primary/25 flex justify-center items-center">
                            <span className="block">
                                <RiLoader4Line className="animate-spin text-3xl text-blue-600"/>
                            </span>
                        </div>
                    }
                </div>
            </div>

            
        </div>
    );
};

export default ProfileUserDetails;