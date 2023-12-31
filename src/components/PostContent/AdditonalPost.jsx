import PostContent from "./container/PostContent";
import PostFooter from "./container/PostFooter";
import PostHeader from "./container/PostHeader";

const AdditonalPost = () => {
    return (
        <div className="border-t first:border-t-0 border-slate-400 pt-4 first:pt-0 ">
            <PostHeader/>
            <div className="">
                <PostContent/> 
                <PostFooter/>
            </div>
        </div>
    );
};

export default AdditonalPost;