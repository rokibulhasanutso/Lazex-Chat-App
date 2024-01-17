import HeadText from './../../../components/common/HeadText';
import { MdPublic } from "react-icons/md";
import { FaUsers, FaLock } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { useState } from 'react';

const CreatePost = ({closeContent, componentRef}) => {
    const [postAudience, setPostAudience] = useState({audience: 'public', edit: false});

    return (
        <div ref={componentRef} className='first:border-t-0 border-t-8 border-b-8 border-gray-100'>
            <div className="px-8">
                <div className='flex justify-between py-4'>
                    <HeadText name={'Create post'} padding={'p-0'}/>

                    {/* close content button */}
                    <div 
                        onClick={() => closeContent(false)} 
                        className='self-stretch flex items-center p-1.5 hover:bg-slate-200 cursor-pointer transition-all rounded-full'>
                        <GrClose className='text-lg'/>
                    </div>
                </div>

                <div className={`flex justify-between`}>
                    <div className="flex space-x-3">
                        <div className="flex items-center">
                            <div className="relative">
                                <div className="w-16 h-16 border overflow-hidden rounded-full">
                                    <img src='/app_Images/profile_picture1.jpg' alt="Post Image" />
                                </div>
                                <span className="inline-block rounded-full absolute right-0 bottom-1 w-4 h-4 border border-white bg-green-500"></span>
                            </div>
                        </div>
                        <div className="px-2 py-1">
                            <div className="flex space-x-2">
                                <p className="font-semibold">Rokibul Hasan</p>
                            </div>
                            <div className=''>
                                <div className={`flex ${postAudience.edit ? 'gap-3 border-slate-400 rounded-full px-2' : 'border-transparent'} border transition-all py-1 text-sm`}>
                                    <button 
                                        className={`flex items-center gap-1 font-semibold transition-all ${ postAudience.audience === 'public' ? 'text-app-primary scale-105' : postAudience.edit ? 'hover:scale-105 text-slate-700' : 'scale-0 text-[0px] text-slate-700'} `}
                                        onClick={() => setPostAudience({audience: 'public', edit: !postAudience.edit})}
                                    >
                                        <MdPublic/><span>Public</span>
                                    </button>
                                    <button 
                                        className={`flex items-center gap-1 font-semibold transition-all ${ postAudience.audience === 'friends' ? 'text-app-primary scale-105' : postAudience.edit ? 'hover:scale-105 text-slate-700' : 'scale-0 text-[0px] text-slate-700'} `}
                                        onClick={() => setPostAudience({audience: 'friends', edit: !postAudience.edit})} 
                                    >
                                        <FaUsers/><span>Finends</span>
                                    </button>
                                    <button 
                                        className={`flex items-center gap-1 font-semibold transition-all ${ postAudience.audience === 'onlyme' ? 'text-app-primary scale-105' : postAudience.edit ? 'hover:scale-105 text-slate-700' : 'scale-0 text-[0px] text-slate-700'} `}
                                        onClick={() => setPostAudience({audience: 'onlyme', edit: !postAudience.edit})}
                                    >
                                        <FaLock className='text-[12px]'/><span>Only me</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <textarea 
                        className='w-full py-5 outline-none text-slate-500 text-xl font-medium rounded-md min-h-[150px]'
                        placeholder="What's on your mind, Rokibul?"
                    />
                </div>

                <div className='py-4 flex justify-between'>
                    <div className='self-stretch'>
                        <button
                            className='text-2xl px-4 h-full flex items-center gap-2 text-slate-500 hover:text-white hover:bg-app-primary border hover:border-transparent border-slate-300 rounded-full transition-all active:scale-95'
                        >
                            <RiImageAddFill className=''/><span className='text-base'>Add Image</span>
                        </button>
                    </div>

                    <div>
                        <button
                            className='text-xl py-1.5 px-8 rounded-md font-semibold text-white bg-app-primary'
                            onClick={() => {}}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;