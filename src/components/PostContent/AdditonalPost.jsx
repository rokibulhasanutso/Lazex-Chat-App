import PostContent from "./container/PostContent";
import PostFooter from "./container/PostFooter";
import PostHeader from "./container/PostHeader";
import PostButton from './../button/PostButton';

const AdditonalPost = () => {
    return (
        <div className="border-t first:border-t-0 border-slate-400 py-4 first:pt-0 ">
            <PostHeader>
                <PostButton variant={'menu'} position={'self-baseline'}/>
            </PostHeader>
            <PostContent/>
            <PostFooter/>
        </div>
    );
};

export default AdditonalPost;