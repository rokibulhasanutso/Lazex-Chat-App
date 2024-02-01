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

const ChatViewContent = ({convertionType, convertionId, currentUserImage}) => {
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
        chatviewRef.current.scrollTop = chatviewRef.current.scrollHeight;
    }, [chatList])

    // remove chat
    const removeChat = (id) => {
        update(ref(db, `chats/${convertionType}/${convertionId}/${id}`), {
            remove: true,
            message: 'Remove this message.',
            imageUrl: '',
            msg_react: ''
        })
    }

    // message react
    const messageReact = (id, react) => {
        update(ref(db, `chats/${convertionType}/${convertionId}/${id}`), {
            msg_react: react
        })
    }

    return (
        <div ref={chatviewRef} className="max-h-[calc(100vh-285px)] overflow-x-auto">
            <div className="flex flex-col justify-end self-end px-8">
            {
                chatList?.length === 0 
                ? <p>No chat found</p> 
                
                : chatList?.map((val) => {
                    if (val.senderId === uid()) {
                        return (
                            <div key={val.id} className="flex flex-col justify-end items-end gap-x-4 my-2">
                                <div className="relative flex flex-row-reverse gap-x-4 items-center group/options">
                                    <div className="">
                                        {
                                            val.message === 'like'
                                            ? <FaThumbsUp className="text-app-primary text-5xl min-w-[70px] text-center"/>
                                            // other ways normal message
                                            : <p className={`${val?.remove === true ? 'bg-gray-100 border-2 border-gray-200 rounded-full text-gray-400' : 'bg-app-primary rounded-3xl rounded-br-none text-white'} whitespace-pre-wrap text-lg px-5 py-3 max-w-sm min-w-[70px] text-center relative`}>
                                                {val.message}
                                                
                                                {
                                                    val?.msg_react && 
                                                    <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/4 text-2xl">{val?.msg_react}</span>
                                                }
                                              </p>
                                        }
                                    </div>

                                    {/* options */}
                                    {
                                        !val?.remove &&
                                        <div className="text-slate-500 text-lg hidden group-hover/options:block">
                                            <button onClick={() => removeChat(val.id)} className="relative group/remove p-1.5 rounded-full hover:bg-slate-200">
                                                <AiFillDelete/>
                                                <ToolTip target={'group-hover/remove:block'}>
                                                    <span className="text-xs">Remove</span>
                                                </ToolTip>
                                            </button>
                                            <button className="relative group/reply p-1.5 rounded-full hover:bg-slate-200">
                                                <BiSolidShare/>
                                                <ToolTip target={'group-hover/reply:block'}>
                                                    <span className="text-xs">Reply</span>
                                                </ToolTip>
                                            </button>
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
                        )
                    }
                    else {
                        return (
                            <div key={val.id} className="flex flex-col justify-end gap-x-4 my-2">
                                <div className="relative flex gap-x-4 items-center group/options">
                                    <ImageHeader size={'xs'} activity={false} photoUrl={currentUserImage}/>
                                    <div className="">
                                        {
                                            val.message === 'like'
                                            ? <FaThumbsUp className="text-app-primary text-5xl min-w-[70px] text-center"/>
                                            // other ways normal message
                                            : <p className={`${val?.remove === true ? 'bg-gray-100 border-2 border-gray-200 rounded-full text-gray-400' : 'bg-gray-200 rounded-3xl rounded-bl-none text-black'} whitespace-pre-wrap text-lg px-5 py-3 max-w-sm min-w-[70px] text-center relative`}>
                                                {val.message}
                                                
                                                {
                                                    val?.msg_react && 
                                                    <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/4 text-2xl">{val?.msg_react}</span>
                                                }
                                              </p>
                                        }
                                    </div>

                                    {/* options */}
                                    {
                                        !val?.remove &&
                                        <div className="text-slate-500 text-lg hidden group-hover/options:block">
                                            <button onClick={() => removeChat(val.id)} className="relative group/remove p-1.5 rounded-full hover:bg-slate-200">
                                                <AiFillDelete/>
                                                <ToolTip target={'group-hover/remove:block'}>
                                                    <span className="text-xs">Remove</span>
                                                </ToolTip>
                                            </button>
                                            <button className="relative group/reply p-1.5 rounded-full hover:bg-slate-200">
                                                <BiSolidShare/>
                                                <ToolTip target={'group-hover/reply:block'}>
                                                    <span className="text-xs">Reply</span>
                                                </ToolTip>
                                            </button>
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
                        )
                    }
                })
            }
            </div>
        </div>
    );
};

export default ChatViewContent;