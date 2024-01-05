
import { BsGlobeAmericas } from "react-icons/bs";

const PostHeader = ({children}) => {
    return (
        <div className={`flex justify-between px-8 py-2 border-b border-slate-300`}>
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
                        <a href="#" className="text-indigo-600 hover:underline bg-indigo-50 leading-6 px-2 text-sm rounded-full">@rokibulHasan</a>
                    </div>
                    <p className="text-base leading-5 tracking-tight py-1 text-slate-600">I am share my project</p>
                </div>
            </div>
            <div className="flex space-x-4">
                <p className="text-sm text-slate-500 space-x-1 self-start flex items-center py-2">
                    <BsGlobeAmericas className="inline-block"/>
                    <span>11</span>
                    <span>munite</span>
                </p>

                {children}
            </div>
        </div>
    );
};

export default PostHeader;