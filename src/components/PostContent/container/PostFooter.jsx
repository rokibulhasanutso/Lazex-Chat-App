import PostButton from "../../button/PostButton";

const PostFooter = () => {
    return (
        <div className="px-8 py-1 pb-4 flex justify-between">
            <div className="flex">
                <PostButton variant={'read-latter'} label={'Read latter'}/>
                <PostButton variant={'clip-share'} label={'Clip share'}/>
                <PostButton variant={'appreciate'} label={'Appreciate'} count={0}/>
            </div>

            <div>
                <PostButton variant={'comment'} label={'Comment'} count={123}/>
            </div>
        </div>
    );
};

export default PostFooter;