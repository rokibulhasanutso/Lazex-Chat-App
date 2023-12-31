import PostContent from "./container/PostContent";
import PostFooter from "./container/PostFooter";
import PostHeader from "./container/PostHeader";

const ImportantPost = () => {
    return (
        <div>
            <div className="border-t first:border-t-0 border-slate-400 pt-4 first:pt-0 ">
                <PostHeader>
                    
                </PostHeader>
                <div className="">
                    <PostContent/> 
                    <PostFooter/>
                </div>
            </div>
        </div>
    );
};

export default ImportantPost;