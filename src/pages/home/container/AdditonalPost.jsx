import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostButton from '../../../components/button/PostButton';

const AdditonalPost = () => {
    return (
        <div className="">
            <PostHeader>
                <PostButton variant={'menu'} position={'self-baseline'}/>
            </PostHeader>
            <PostContent/>
            <PostFooter/>
        </div>
    );
};

export default AdditonalPost;