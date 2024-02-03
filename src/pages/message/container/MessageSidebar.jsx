import { memo, useEffect, useState } from "react";
import ImageHeader from "../../../components/common/ImageHeader";
import { child, get, onValue, query, ref } from "firebase/database";
import { db, uid } from "../../../firebase/realtimeDatabaseFunctions";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

const MessageSidebar = () => {
    const [friendlist, setFriendlist] = useState([])
    const [chatList, setChatList] = useState([])

    useEffect(() => {
        onValue(ref(db, 'friends'), (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((eachItem) => {
                    const fromId = eachItem.val().from 
                    const toId = eachItem.val().to
                    const status = eachItem.val().status
                    // get friendList filterred from firebase friends database object
                    const friendId = status === 'accepted' && fromId === uid() && toId || toId === uid() && fromId

                    if (friendId) {
                        get(child(ref(db), `users/${friendId}`)).then((snapshot) => {
                            setFriendlist(friendList => [
                                ...friendList,
                                {
                                    userId: snapshot.key,
                                    name: snapshot.val().userInfo.name,
                                    imgUrl: snapshot.val()?.profilePicture.sm,
                                }
                            ])
                        })
                    }
                })
            }
        })
    }, [])

    useEffect(() => {
        onValue(query(ref(db, 'chats/single')), (snapshot) => {
            if (snapshot.exists()) {
                const chatListArray = []

                snapshot.forEach((eachItem) => {
                    const chatId = eachItem.key.split('_')

                    if (chatId.includes(uid())) {
                        const chatList = Object.values(eachItem.val())
                        const lastChatItem = chatList[chatList.length - 1]
                        
                        chatListArray.push({
                            ...friendlist.find((val) => val.userId === chatId.find((val) => val !== uid())),
                            ...lastChatItem
                        })
                    }
                })

                setChatList(chatListArray)
            }
            else {
                console.log('data not found')
            }
        })
    }, [friendlist])

    return (
        <div className="rounded-t-md flex flex-col justify-between h-full">
            <div className="px-8 py-5 bg-white rounded-t-md overflow-hidden border-b">
                <h2 className="text-2xl font-semibold">Messages</h2>
            </div>

            <div className="flex-1 overflow-x-auto">
            {
                chatList?.map((val) => (
                    <Link key={val.id} to={`/messages/to/${val.userId}`}>
                        <div className="relative border-b hover:after:absolute after:rounded-tr-md after:rounded-br-md after:bg-app-primary after:w-1.5 after:h-[calc(100%+2px)] after:z-50 after:-top-px after:-left-[2px]">
                            <div className="flex gap-x-4 px-8 py-4 bg-white rounded-xl">
                                {/* head image */}
                                <ImageHeader size={'sm'} photoUrl={val?.imgUrl} name={val?.name}/>
                                
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 select-none py-0.5 transition-all">
                                        <div className="flex-1">
                                            <p className="font-semibold text-xl">{val?.name}</p>
                                        </div>
                                        <div className="items-stretch my-auto">
                                            <span className="text-sm py-1.5 text-slate-500">{format(new Date(val.date), 'p')}</span>
                                        </div>
                                    </div>

                                    {/* message content */}
                                    <p className="text-base leading-normal tracking-tight text-slate-600 whitespace-pre-line line-clamp-2">
                                    {
                                        val?.msg_react
                                        ? <span>{val.senderId !== uid() ? `Reacted ${val?.msg_react} to your message` : ''}</span>
                                        : <span>{`${val.senderId === uid() ? 'You:' : ''} ${val?.message}`}</span>
                                    }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            }
            </div>
        </div>       
    );
};

export default memo(MessageSidebar);