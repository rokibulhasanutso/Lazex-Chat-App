import ImageHeader from "../../components/common/ImageHeader";
import MessageEditor from "./container/MassageEditor"
import ChatViewContent from "./container/ChatViewContent";
import MessageSidebar from "./container/MessageSidebar";
import { useParams } from "react-router-dom";
import { child, get, onValue, ref, update } from 'firebase/database';
import { db, uid } from './../../firebase/realtimeDatabaseFunctions';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GroupMemberView from "./container/GroupMemberView";
import { IoClose } from "react-icons/io5";

const Messages = () => {
    const {lastChatList} = useSelector((state) => state.chatInfo)
    const { conversionCategory, userId } = useParams()
    const [currentUserName, setCurrentUserName] = useState('')
    const [currentUserImage, setCurrentUserImage] = useState('')
    const [currentUserActive, setCurrentUserActive] = useState('')
    const [convertionId, setConvertionId] = useState(null)
    const [convertionType, setConvertionType] = useState(null)
    // get reply target message from chatviewContent
    const [replyMessage, setReplyMessage] = useState({})
    const [openGroupMember, setOpenGroupMember] = useState(false)
    const [adminName, setAdminName] = useState('')
    const users = useSelector((state) => state.userCategoryList.userList)

    const callUserName = (userId) => {
        const userData = users?.find(user => user.id === userId)
        const username = userData?.userInfo?.name

        return username
    }

    useEffect(() => {
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

            // set convertion id
            setConvertionId(userId)
        }

        let namePath, imagePath, userActivePath;

        if (conversionCategory === 'to') {
            namePath = `users/${userId}/userInfo/name`
            imagePath = `users/${userId}/profilePicture/md`
            userActivePath = `users/${userId}/active`
        }
        else if (conversionCategory === 'with') {
            namePath = `chats/group/${userId}/name`
            imagePath = `chats/group/${userId}/imgUrl/md`
            userActivePath = `chats/group/${userId}/active`
        }

        onValue(ref(db, `${namePath}`), (snapshot) => {
            if (snapshot.exists()) setCurrentUserName(snapshot.val())
            else setCurrentUserName('') // set default
        })
        onValue(ref(db, `${imagePath}`), (snapshot) => {
            if (snapshot.exists()) setCurrentUserImage(snapshot.val())
            else setCurrentUserImage('') // set default
        })
        onValue(ref(db, `${userActivePath}`), (snapshot) => {
            if (snapshot.exists()) setCurrentUserActive(snapshot.val())
            else setCurrentUserActive('') // set default
        })
    }, [conversionCategory, userId])

    // when message component open and chatlist update then set chatlist update message false
    useEffect(() => {
        if (lastChatList.length > 0) {
            lastChatList.forEach(chatListItem => {
                if (chatListItem.isUpdate && chatListItem.senderId !== uid()) {
                    const chatType = chatListItem.chatType
                    const chatId = chatListItem.chatId
                    const hasGroupChatlist = chatListItem.chatType === 'group' ? '/chatlist' : ''
                    const id = chatListItem.id

                    update(ref(db, `chats/${chatType}/${chatId}${hasGroupChatlist}/${id}`), {
                        isUpdate: false
                    })
                }
            });
        }
    }, [lastChatList])

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

                                <div className="px-2">
                                    <div className="py-1 flex-1">
                                        <p className="font-semibold text-3xl">{currentUserName}</p>
                                    </div>

                                    {
                                        convertionType === 'group' &&
                                        <div className="text-slate-500 font-medium">
                                            <button
                                                onClick={() => {setOpenGroupMember(true)}}
                                                className="text-app-primary hover:underline"
                                            >
                                                Group Member
                                            </button> 
                                            <span className="ms-1">Admin by {callUserName(adminName.id)}</span>

                                            {   openGroupMember &&
                                                <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-[.3] z-50 flex justify-center items-center">
                                                    <div className=" relative bg-white block max-w-lg w-full border rounded-md overflow-hidden">
                                                        <button 
                                                            onClick={() => {setOpenGroupMember(false)}}
                                                            className="text-2xl absolute top-2.5 right-2.5 rounded-full hover:bg-slate-300 px-1 py-1"
                                                        >
                                                            <IoClose/>
                                                        </button>
                                                        
                                                        <p className="text-center py-3 text-xl text-slate-600">Group Member</p>

                                                        <div>
                                                            <GroupMemberView groupId={userId} setAdminName={setAdminName}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    }
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