import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostButton from '../../../components/button/PostButton';

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