import { useEffect, useRef, useState } from "react";
import ImageHeader from "../../../components/common/ImageHeader";
import { onValue, ref, update } from "firebase/database";
import { db, uid } from "../../../firebase/realtimeDatabaseFunctions";
import { format } from "date-fns";
import { FaThumbsUp } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidShare } from "react-icons/bi";
import { BsEmojiSmileFill } from "react-icons/bs";
import ToolTip from "../../../components/common/ToolTip";
import { Link } from "react-router-dom";

const ChatViewContent = ({convertionType, convertionId, currentUserImage, replyMessagesData}) => {
    const [chatList, setChatList] = useState([])
    const chatviewRef = useRef()
    const weekName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    useEffect(() => {
        setChatList([]) // init

        onValue(ref(db, `chats/${convertionType}/${convertionId}`), (snapshot) => {
            if (snapshot.exists()) {
                const chatArray = Object.values(snapshot.val())
                setChatList(chatArray)
            }
        })
    }, [convertionType, convertionId])

    // all ways scroll bottom when chat list update 
    useEffect(() => {
        chatviewRef.current.parentElement.scrollTop = chatviewRef.current.parentElement.scrollHeight;
    }, [chatList.length])

    // remove chat
    const removeChat = (id) => {
        update(ref(db, `chats/${convertionType}/${convertionId}/${id}`), {
            remove: true,
            message: 'Remove this message.',
            imageUrl: '',
            msg_react: '',
            replyMessage: ''
        })
    }

    // message react
    const messageReact = (id, react) => {
        update(ref(db, `chats/${convertionType}/${convertionId}/${id}`), {
            msg_react: react
        })
    }

    // targeted reply message
    const replyMessage = (getMessageData) => {
        replyMessagesData({
            id: getMessageData.id,
            msg: getMessageData.message,
            senderId: getMessageData.senderId
        })
    }

    return (
        <div ref={chatviewRef} className={chatList.length === 0 ? 'h-full' : ''}>
            {/* Chat content intro */}
            <div className={`flex flex-col items-center justify-center ${chatList.length === 0 ? 'h-full' : 'my-16'}`}>
                <ImageHeader activity={false} photoUrl={currentUserImage}/>
                <div className="py-4 text-center">
                    <p className="leading-relaxed font-medium text-xl text-slate-500">Now you are friends and both can chat.</p>
                    <Link className="text-indigo-500 hover:underline leading-relaxed">See this profile</Link>
                </div>
            </div>

            {/* Chat list */}
            <div className="flex flex-col justify-end self-end px-8">
                {chatList?.map((val) => {
                    if (val.senderId === uid()) {
                        return (
                            <div key={val.id} className="flex gap-x-4">
                                <div className="relative flex-1 flex flex-col justify-end gap-x-4 my-2">
                                    
                                    {/* reply message */}
                                    {val?.replyMessage &&
                                    <p
                                        className="self-end line-clamp-3 -mb-2 max-w-sm bg-gray-300 px-5 py-2 rounded-3xl whitespace-pre-line"
                                    >
                                        {val?.replyMessage}
                                    </p>}
                                    
                                    <div className={`relative flex flex-1 flex-row-reverse gap-x-4 items-center group/options`}>
                                        <div className="relative ">
                                            {
                                                val.message === 'like'
                                                ? <FaThumbsUp className="text-app-primary text-5xl min-w-[70px] text-center"/>
                                                // other ways normal message
                                                : <div className="max-w-sm min-w-[70px] flex justify-end">
                                                    <p className={`${val?.remove === true ? 'bg-gray-100 border-2 border-gray-200 rounded-full text-gray-400' : `bg-app-primary rounded-3xl ${val?.msg_react ? '' : 'rounded-br-none'} text-white`} inline-block relative`}>
                                                        <span className="block whitespace-pre-line text-lg px-5 py-3">
                                                            {val.message}
                                                        </span>
                                                    </p>
                                                </div>
                                            }
                                            {
                                                val?.msg_react && 
                                                <span className="block relative z-20 -mt-4 text-right text-2xl">{val?.msg_react}</span>
                                            }
                                        </div>
                                        {/* options */}
                                        {
                                            !val?.remove &&
                                            <div className="text-slate-500 text-lg hidden group-hover/options:block">
                                                    
                                                    {/* remove massage */}
                                                    <button onClick={() => removeChat(val.id)} className="relative group/remove p-1.5 rounded-full hover:bg-slate-200">
                                                        <AiFillDelete/>
                                                        <ToolTip target={'group-hover/remove:block'}>
                                                            <span className="text-xs">Remove</span>
                                                        </ToolTip>
                                                    </button>
                                                    {/* reply message */}
                                                    <button
                                                        onClick={() => replyMessage(val)}
                                                        className="relative group/reply p-1.5 rounded-full hover:bg-slate-200"
                                                    >
                                                        <BiSolidShare/>
                                                        <ToolTip target={'group-hover/reply:block'}>
                                                            <span className="text-xs">Reply</span>
                                                        </ToolTip>
                                                    </button>
                                                    {/* react of message */}
                                                    <button className="relative group/react p-1.5 rounded-full hover:bg-slate-200">
                                                        <BsEmojiSmileFill/>
                                                        <div className={`absolute group-hover/react:-translate-y-4 group-hover/react:opacity-100 opacity-0 group-hover/react:visible invisible rounded-full border border-slate-400 transition-all -top-full left-1/2 -translate-x-1/2`}>
                                                            <div className='rounded-full p-1 bg-slate-100 text-white'>
                                                                <div className="flex items-center text-3xl">
                                                                    <span onClick={() => messageReact(val.id, '😆')} className="hover:scale-110">😆</span> 
                                                                    <span onClick={() => messageReact(val.id, '💝')} className="hover:scale-110">💝</span>
                                                                    <span onClick={() => messageReact(val.id, '😮')} className="hover:scale-110">😮</span> 
                                                                    <span onClick={() => messageReact(val.id, '😞')} className="hover:scale-110">😞</span>
                                                                    <span onClick={() => messageReact(val.id, '😡')} className="hover:scale-110">😡</span> 
                                                                    <span onClick={() => messageReact(val.id, '👍')} className="hover:scale-110">👍</span>
                                                                </div>
                                                            </div>
                                                        </div>        
                                                    </button>
                                            </div>
                                        }
                                    </div>
                                    {/* date */}
                                    <span className="text-gray-500 text-sm space-x-2 self-end">
                                        <span>{weekName[new Date(val.date).getDay()]}</span>
                                        <span>{format(new Date(val.date), 'p')}</span>
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div key={val.id} className="flex gap-x-4">
                                <div className="self-end mb-7">
                                    <ImageHeader size={'xs'} activity={false} photoUrl={currentUserImage}/>
                                </div>
                                <div className="relative flex-1 flex flex-col justify-end gap-x-4 my-2">
                                    {/* reply message */}
                                    {val?.replyMessage &&
                                    <p 
                                        className="line-clamp-3 -mb-2 max-w-sm self-start bg-gray-300 px-5 py-2 rounded-3xl whitespace-pre-line"
                                    >
                                        {val?.replyMessage}
                                    </p>}
                                    
                                    <div className={`relative flex gap-x-4 items-center group/options`}>
                                        <div className="relative ">
                                            {
                                                val.message === 'like'
                                                ? <FaThumbsUp className="text-app-primary text-5xl min-w-[70px] text-center"/>
                                                // other ways normal message
                                                : <div className="max-w-sm min-w-[70px] flex justify-start">
                                                    <p className={`${val?.remove === true ? 'bg-gray-100 border-2 border-gray-200 rounded-full text-gray-400' : `bg-gray-200 rounded-3xl ${val?.msg_react ? '' : 'rounded-bl-none'} text-black`} inline-block relative`}>
                                                        <span className="block whitespace-pre-line text-lg px-5 py-3">
                                                            {val.message}
                                                        </span>
                                                    </p>
                                                </div>
                                            }
                                            {
                                                val?.msg_react && 
                                                <span className="block relative z-20 -mt-4 text-right text-2xl">{val?.msg_react}</span>
                                            }
                                        </div>
                                        {/* options */}
                                        {
                                            !val?.remove &&
                                            <div className="text-slate-500 group-hover/options:flex flex-row-reverse hidden text-lg">
                                                    
                                                    {/* remove massage */}
                                                    <button onClick={() => removeChat(val.id)} className="relative group/remove p-1.5 rounded-full hover:bg-slate-200">
                                                        <AiFillDelete/>
                                                        <ToolTip target={'group-hover/remove:block'}>
                                                            <span className="text-xs">Remove</span>
                                                        </ToolTip>
                                                    </button>
                                                    {/* reply message */}
                                                    <button
                                                        onClick={() => replyMessage(val)}
                                                        className="relative group/reply p-1.5 rounded-full hover:bg-slate-200"
                                                    >
                                                        <BiSolidShare/>
                                                        <ToolTip target={'group-hover/reply:block'}>
                                                            <span className="text-xs">Reply</span>
                                                        </ToolTip>
                                                    </button>
                                                    {/* react of message */}
                                                    <button className="relative group/react p-1.5 rounded-full hover:bg-slate-200">
                                                        <BsEmojiSmileFill/>
                                                        <div className={`absolute group-hover/react:-translate-y-4 group-hover/react:opacity-100 opacity-0 group-hover/react:visible invisible rounded-full border border-slate-400 transition-all -top-full left-1/2 -translate-x-1/2`}>
                                                            <div className='rounded-full p-1 bg-slate-100 text-white'>
                                                                <div className="flex items-center text-3xl">
                                                                    <span onClick={() => messageReact(val.id, '😆')} className="hover:scale-110">😆</span> 
                                                                    <span onClick={() => messageReact(val.id, '💝')} className="hover:scale-110">💝</span>
                                                                    <span onClick={() => messageReact(val.id, '😮')} className="hover:scale-110">😮</span> 
                                                                    <span onClick={() => messageReact(val.id, '😞')} className="hover:scale-110">😞</span>
                                                                    <span onClick={() => messageReact(val.id, '😡')} className="hover:scale-110">😡</span> 
                                                                    <span onClick={() => messageReact(val.id, '👍')} className="hover:scale-110">👍</span>
                                                                </div>
                                                            </div>
                                                        </div>        
                                                    </button>
                                            </div>
                                        }
                                    </div>
                                    
                                    {/* date */}
                                    <span className="text-gray-500 text-sm space-x-2">
                                        <span>{weekName[new Date(val.date).getDay()]}</span>
                                        <span>{format(new Date(val.date), 'p')}</span>
                                    </span>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
};

export default ChatViewContent;