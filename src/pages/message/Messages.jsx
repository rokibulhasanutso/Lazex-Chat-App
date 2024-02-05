import ImageHeader from "../../components/common/ImageHeader";
import MessageEditor from "./container/MassageEditor"
import ChatViewContent from "./container/ChatViewContent";
import MessageSidebar from "./container/MessageSidebar";
import { useParams } from "react-router-dom";
import { child, get, onValue, ref, update } from 'firebase/database';
import { db, uid } from './../../firebase/realtimeDatabaseFunctions';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Messages = () => {
    const chatList = useSelector((state) => state.chatInfo.friendLastchatList)
    const { conversionCategory, userId } = useParams()
    const [currentUserName, setCurrentUserName] = useState('')
    const [currentUserImage, setCurrentUserImage] = useState('')
    const [currentUserActive, setCurrentUserActive] = useState('')
    const [convertionId, setConvertionId] = useState(null)
    const [convertionType, setConvertionType] = useState(null)
    // get reply target message from chatviewContent
    const [replyMessage, setReplyMessage] = useState({})

    useEffect(() => {
        onValue(ref(db, 'users/' + userId + '/userInfo/name'), (snapshot) => {
            if (snapshot.exists()) setCurrentUserName(snapshot.val())
            else setCurrentUserName('') // set default
        })
        onValue(ref(db, 'users/' + userId + '/profilePicture/md'), (snapshot) => {
            if (snapshot.exists()) setCurrentUserImage(snapshot.val())
            else setCurrentUserImage('') // set default
        })
        onValue(ref(db, 'users/' + userId + '/active'), (snapshot) => {
            if (snapshot.exists()) setCurrentUserActive(snapshot.val())
            else setCurrentUserActive('') // set default
        })


        // convertion configuration
        if (conversionCategory === 'to') {
            // set convertion type
            setConvertionType('single')

            // set convertion id
            get(child(ref(db), `chats/single/${uid()}_${userId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setConvertionId(`${uid()}_${userId}`)
                }
                else {
                    setConvertionId(`${userId}_${uid()}`)
                }
            })
        }
        else if (conversionCategory === 'with') {
            // set convertion type
            setConvertionType('group')
        }

    }, [conversionCategory, userId])

    // when message component open and chatlist update then set chatlist update message false
    useEffect(() => {
        if (chatList) {
            chatList.forEach(chatListItem => {
                if (chatListItem.isUpdate && chatListItem.senderId !== uid()) {
                    update(ref(db, `chats/${chatListItem.chatType}/${chatListItem.chatId}/${chatListItem.id}`), {
                        isUpdate: false
                    })
                    console.log('work')
                }
            });
        }
    }, [chatList])

    return (
        <div className='h-screen py-9'>
            <div className="flex h-full rounded-md border-2 border-slate-300 bg-white">
                {/* message list content */}
                <div className="border-r border-slate-300">
                    <div className="w-[400px] bg-gray-50 h-full">
                        <MessageSidebar />
                    </div>
                </div>

                {/* chat content */}
                <div className="flex-1 h-full">
                    <div className="flex flex-col justify-between h-full">
                        {/* chat header content */}
                        <div className="px-8 py-5 border-b">
                            {/* chat header */}
                            <div className="flex items-center space-x-3 mt select-none cursor-pointer py-0.5 transition-all">
                                {/* author image */}
                                <ImageHeader
                                    activity={currentUserActive}
                                    photoUrl={currentUserImage}
                                    size={'lg'} 
                                    name={currentUserName}
                                />
                                <div className="px-2 py-1 flex-1">
                                    <p className="font-semibold text-3xl">{currentUserName}</p>
                                </div>
                            </div>
                        </div>

                        {/* chatting list content */}
                        <div className="flex-1 overflow-auto">
                            <ChatViewContent
                                convertionType={convertionType}
                                convertionId={convertionId}
                                currentUserImage={currentUserImage}
                                // when any target message reply data get by setReplyMessage function
                                replyMessagesData={setReplyMessage}
                            />
                        </div>
                        
                        {/* chat Message Sand and Editor content */}
                        <div className="px-6 py-5">
                            <MessageEditor
                                convertionType={convertionType}
                                convertionId={convertionId}
                                replyMessage={replyMessage} // for target message send and view
                                replyUserName={currentUserName}
                                removeRelyMsg={setReplyMessage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;