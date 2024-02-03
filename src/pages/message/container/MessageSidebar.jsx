import { memo, useEffect, useState } from "react";
import ImageHeader from "../../../components/common/ImageHeader";
import { child, get, limitToLast, onValue, query, ref } from "firebase/database";
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
                    const chatId = eachItem.key.split('_').find((val) => val !== uid())

                    if (chatId) {
                        const chatList = Object.values(eachItem.val())
                        const lastChatItem = chatList[chatList.length - 1]
                        
                        chatListArray.push({
                            ...friendlist.find((val) => val.userId === chatId),
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
            <div className="px-8 py-5 bg-white rounded-t-md overflow-hidden">
                <h2 className="text-2xl font-semibold">Messages</h2>
            </div>

            <div className="flex-1 overflow-auto">
            {
                chatList?.map((val) => (
                    <Link key={val.id} to={`/messages/to/${val.userId}`}>
                        <div key={val.id} className="relative px-8 py-4 border-y hover:bg-white hover:after:absolute after:rounded-tr-md after:rounded-br-md after:bg-app-primary after:w-1 after:h-[calc(100%+2px)] after:z-10 after:-top-px after:-left-[2px]">
                            <div className="flex items-center space-x-3 select-none py-0.5 transition-all">
                                {/* head image */}
                                <ImageHeader size={'sm'} photoUrl={val?.imgUrl} name={val?.name}/>
                                {/* {console.log(val)} */}

                                <div className="px-2 py-1 flex-1">
                                    <p className="font-semibold text-2xl">{val?.name}</p>
                                </div>
                                <div className="items-stretch my-auto">
                                    <span className="text-sm py-1.5 text-slate-500">{format(new Date(val.date), 'p')}</span>
                                </div>
                            </div>

                            {/* message content */}
                            <p className="text-base mt-2 leading-normal tracking-tight py-1 text-slate-600 whitespace-pre-line line-clamp-2">
                                {
                                    val?.msg_react
                                    ? <span>Reacted {val?.msg_react} to your message</span>
                                    : <span>{`${val.senderId === uid() ? 'You:' : ''} ${val?.message}`}</span>
                                }
                            </p>
                        </div>
                    </Link>
                ))
            }
            </div>
        </div>       
    );
};

export default memo(MessageSidebar);