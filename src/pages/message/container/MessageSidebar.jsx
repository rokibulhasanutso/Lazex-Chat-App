import ShortMessegeContent from "../../../components/common/ShortMessegeContent";

const MessageSidebar = () => {
    return (
        <div className="w-full bg-gray-50">
            <div className="rounded-t-md">
                <div className="px-8 py-5 bg-white rounded-t-md overflow-hidden">
                    <h2 className="text-2xl font-semibold">Messages</h2>
                </div>

                <ShortMessegeContent
                    name={'Rokibul Hasan'} 
                    shortMessage={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque labore ...'}
                />
            </div>
        </div>
    );
};

export default MessageSidebar;