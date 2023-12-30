import { IoIosArrowDown } from "react-icons/io";
import { TbFolderShare, TbHeartShare, TbCameraShare } from "react-icons/tb";
import { CgMailReply } from "react-icons/cg";

const AdditonalPost = () => {
    return (
        <div className="border-t first:border-t-0 border-slate-400 pt-4 first:pt-0 ">
            <div className="flex items-center justify-between px-8 py-2 border-b border-slate-300 ">
                <div className="flex space-x-3">
                    <div className="relative">
                        <div className="w-16 h-16 border overflow-hidden rounded-full">
                            <img src='/app_Images/profile_picture1.jpg' alt="Post Image" />
                        </div>
                        <span className="inline-block rounded-full absolute right-0 bottom-1 w-4 h-4 border border-white bg-green-500"></span>
                    </div>
                    <div className="px-2 py-1 ">
                        <div className="flex space-x-2">
                            <p className="font-semibold">Rokibul Hasan</p>
                            <a href="#" className="text-indigo-600 hover:underline bg-indigo-50 leading-6 px-2 text-sm rounded-full">@rokibulHasan</a>
                        </div>

                        <p className="text-base leading-5 tracking-tight py-1 text-slate-600">I am share my project</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <p className="text-sm text-slate-500 space-x-1">
                        <span>11</span>
                        <span>munite</span>
                    </p>
                    <button
                        className="text-xl text-slate-500"
                        onClick={() => {}}
                    >
                        <IoIosArrowDown/>
                    </button>
                </div>
            </div>

            <div className="">
                <div className="px-8 py-4">
                    <p>Hello, My name is Rokibul Hasan. I am Front-End developer on web.</p>    
                    <p>I created awasome chat application by react and firebase.</p>    
                    <p>This app name is Lazexchat. It is basically use for chat users and share some story and post.</p>
                    <p className="text-app-primary font-semibold my-2">
                        #Follow the app 
                        <a href="#" className="underline mx-1">
                            Lazexchat
                        </a>
                    </p>
                </div> 

                <div className="px-8 py-1 pb-4 flex justify-between">
                    <div className="flex">
                        <button 
                            className="text-[22px] text-stone-700 flex items-center space-x-2 border border-transparent py-1 px-2 transition-all rounded-md hover:border-slate-400"
                            onClick={() => {}}
                        >
                            <TbFolderShare/>
                            <span className="text-sm">Read latter</span>
                        </button>

                        <button 
                            className="text-[22px] text-stone-700 flex items-center space-x-2 border border-transparent py-1 px-2 transition-all rounded-md hover:border-slate-400"
                            onClick={() => {}}
                        >
                            <TbCameraShare/>
                            <span className="text-sm">Clip share</span>
                        </button>

                        <button 
                            className="text-[22px] text-stone-700 flex items-center space-x-2 border border-transparent py-1 px-2 transition-all rounded-md hover:border-slate-400"
                            onClick={() => {}}
                        >
                            <TbHeartShare/>
                            <span className="text-sm">Appreciate</span>
                            <span className="text-sm">15</span>
                        </button>
                    </div>

                    <div>
                        <button 
                            className="text-[22px] bg-app-primary/90 active:bg-app-primary text-white flex items-center space-x-1 py-1 px-2 transition-all rounded-md hover:shadow-md"
                            onClick={() => {}}
                        >
                            <CgMailReply/>
                            <span className="text-sm pe-1">Replay</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditonalPost;