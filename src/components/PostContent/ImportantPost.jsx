import { useState } from "react";
import PostButton from "../button/PostButton";
import PostContent from "./container/PostContent";
import PostFooter from "./container/PostFooter";
import PostHeader from "./container/PostHeader";

const ImportantPost = () => {
    const [expanded, setExpanded] = useState(false)

    const handleContentExpand = () => {
        setExpanded(!expanded)
    }

    return (
        <>{ 
            !expanded 
            ? <div
                onClick={handleContentExpand}
                className="flex space-x-2 border border-slate-400 m-1 p-2 rounded-md odd:ms-8 even:me-8 select-none cursor-pointer"
              >
                <div className="relative">
                    <div className="w-12 h-12 border overflow-hidden rounded-full">
                        <img src='/app_Images/profile_picture1.jpg' alt="Post Image" />
                    </div>
                    <span className="inline-block rounded-full absolute right-0 bottom-1 w-3 h-3 border border-white bg-green-500"></span>
                </div>
                <div className="px-1 py-.5">
                    <div className="flex space-x-1">
                        <p className="font-semibold">Rokibul Hasan</p>
                    </div>
                    <p className="text-base leading-5 tracking-tight text-slate-600">I am share my project</p>
                </div>
              </div>

            // show this content when expand is enabled
            : <div className={`${expanded ? 'py-4 first:pt-0 my-4 first:mt-0 border-b border-t first:border-t-0 border-slate-400' : ''} transition-all col-span-2`}>
                <PostHeader>
                    <PostButton 
                        variant={'expand'} 
                        expand={expanded} 
                        position={'self-baseline'}
                        action={handleContentExpand}
                    />
                </PostHeader>
                <div className={!expanded ? 'h-0 overflow-hidden' : ''}>
                    <PostContent/> 
                    <PostFooter/>
                </div>
              </div>
        }</>
    );
};

export default ImportantPost;