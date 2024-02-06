import { useState } from 'react';
import AppLogo from './../../../components/logo/AppLogo';
import CreateGroupChat from './CreateGroupChat';
import CreateSingleChat from './CreateSingleChat';
const CreateChat = () => {
    const [createChatType, setCreateChatType] = useState('single')

    return (
        <div className='h-screen py-9'>
            <div className="flex h-full rounded-md border-2 border-slate-300 bg-white">
                <div className="flex flex-col items-center w-full gap-y-4">
                    <div className='mt-20'>
                        <h1 className='text-4xl font-bold flex gap-x-2 text-slate-500 my-5'>
                            <span>Welcome to </span>
                            <span> Messazex of</span>
                            <AppLogo size={36} />
                        </h1>
                    </div>
                    <div className='flex flex-col items-center gap-4 w-full'>
                        <p className='text-lg font-medium text-slate-500'>Select a Chat type to start messaging!</p>
                        <div className='inline-block border rounded-full'>
                            <div className='flex h-[56px] relative'>
                                <span className={`block absolute ${createChatType === 'single' ? 'translate-x-0' : 'translate-x-full'} transition-all h-full w-[155px] rounded-full bg-app-primary text-white`}></span>
                                <span onClick={() => setCreateChatType('single')} className={`flex items-center justify-center cursor-pointer relative z-10 text-lg transition-all ${createChatType === 'single' ? 'text-white' : 'text-slate-500'} font-medium h-full w-[155px]`}>Single</span>
                                <span onClick={() => setCreateChatType('group')} className={`flex items-center justify-center cursor-pointer relative z-10 text-lg transition-all ${createChatType === 'group' ? 'text-white' : 'text-slate-500'} font-medium h-full w-[155px]`}>Group</span>
                            </div>
                        </div>

                        <div className='w-full'>
                            {createChatType === 'single' && <CreateSingleChat/>}
                            {createChatType === 'group' && <CreateGroupChat/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateChat;