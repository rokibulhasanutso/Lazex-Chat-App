import { useEffect } from "react";
import ImageHeader from "../../components/common/ImageHeader";
import ShortMessegeContent from "../../components/common/ShortMessegeContent";
import { GrEmoji } from "react-icons/gr";
import { IoImageOutline } from "react-icons/io5";

const Messages = () => {

    const messageEditor = (event) => {
        const { keyCode, shiftKey } = event;

        if (keyCode === 13) {
            event.preventDefault()
        }

        if (keyCode === 13 && shiftKey) {
            document.execCommand("insertLineBreak", false, null)
        }
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className="flex h-full rounded-md border-2 border-slate-300 bg-white">
            {/* message list content */}
            <div className="max-w-[400px] w-full border-r border-slate-300 bg-gray-50">
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

            {/* chat content */}
            <div className="flex-1 h-full">
                <div className="flex flex-col justify-between h-full">
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
                    <div className="flex-1 flex flex-col justify-end px-8">
                        <div className="flex justify-end items-end gap-x-4 my-2">
                            <p className="bg-app-primary text-white px-5 mb-3 py-3 max-w-sm rounded-3xl rounded-br-none relative">
                                hello
                            </p>
                            <ImageHeader size={'xs'} activity={false} />
                        </div>
                        <div className="flex items-end gap-x-4 my-2">
                            <ImageHeader size={'xs'} activity={false} />
                            <p className="bg-gray-200 border px-5 mb-3 py-3 max-w-sm rounded-3xl rounded-bl-none relative">
                                hello
                            </p>
                        </div>
                    </div>
                    
                    {/* chat footer content */}
                    <div className="px-6 py-5">
                        <div className="border-2 rounded-md px-5 py-3 flex focus-within:border-app-primary">
                            {/* <textarea 
                                id='messageBox' 
                                placeholder='Write here your message'
                                rows={1}
                                className="w-full text-xl outline-none rounded-md"
                            /> */}
                            <div 
                                contentEditable='true'
                                spellCheck='true'
                                data-lexical-editor="true"
                                tabIndex='0'
                                role="textbox"
                                className="w-full text-xl outline-none rounded-md max-h-80 overflow-x-auto"
                                onKeyDown={messageEditor}
                            />
                            <div className="ps-4 items-end flex gap-x-4">
                                <button
                                    onClick={() => {}}
                                    className="text-slate-500"
                                >
                                    <IoImageOutline className="text-3xl hover:text-app-primary"/>
                                </button>

                                <button
                                    onClick={() => {}}
                                    className="text-slate-500 "
                                >
                                    <GrEmoji className="text-3xl hover:text-app-primary"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;