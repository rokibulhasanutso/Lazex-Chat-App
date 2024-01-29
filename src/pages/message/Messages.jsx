import ImageHeader from "../../components/common/ImageHeader";
import MessageEditor from "./container/MassageEditor"
import ChatViewContent from "./container/ChatViewContent";
import MessageSidebar from "./container/MessageSidebar";

const Messages = () => {

    return (
        <div className="flex h-full rounded-md border-2 border-slate-300 bg-white">
            {/* message list content */}
            <div className="max-w-[400px] ">
                <MessageSidebar/>
            </div>

            {/* chat content */}
            <div className="flex-1 h-full">
                <div className="flex flex-col justify-between h-full">
                    {/* chat header content */}
                    <div className="px-8 py-5 border-b">
                        {/* chat header */}
                        <div className="flex items-center space-x-3 mt select-none cursor-pointer py-0.5 transition-all">
                            {/* author image */}
                            <ImageHeader size={'lg'} name={'Rokibul Hasan'}/>

                            <div className="px-2 py-1 flex-1">
                                <p className="font-semibold text-3xl">Rokibul Hasan</p>
                            </div>
                        </div>
                    </div>

                    {/* chatting list content */}
                    <div className="flex-1">
                        <ChatViewContent/>
                    </div>
                    
                    {/* chat Message Sand and Editor content */}
                    <div className="px-6 py-5">
                        <MessageEditor/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;