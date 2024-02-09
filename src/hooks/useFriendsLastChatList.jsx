import { onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db, uid } from "../firebase/realtimeDatabaseFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setFriendLastchatList } from "../redux/slice/chatSlice";

const useFriendsLastChatList = () => {
    const userlistobj = useSelector((state) => state.userCategoryList.userListObj)
    const [chatList, setChatList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        onValue(query(ref(db, 'chats/single')), (snapshot) => {
            if (snapshot.exists()) {
                const chatListArray = []

                snapshot.forEach((eachItem) => {
                    const chatSplitId = eachItem.key.split('_')
                    const oppositeUserId = eachItem.key.split('_').find((val) => val !== uid())

                    if (chatSplitId.includes(uid())) {
                        const chatList = Object.values(eachItem.val())
                        const lastChatItem = chatList[chatList.length - 1]
                        const user = userlistobj[oppositeUserId]
                        
                        chatListArray.push({
                            ...lastChatItem,
                            userId: user?.id,
                            active: user?.active,
                            name: user?.userInfo.name,
                            bio: user?.userInfo.userBio,
                            imgUrl: user?.profilePicture,
                            chatId: eachItem.key,
                            chatType: snapshot.key
                        })
                    }
                })
                
                // Get the last chat list of each friend in the friendlist.
                const chatListShortedArray = chatListArray.sort((val1, val2) => val2.date - val1.date)
                setChatList(chatListShortedArray)
                dispatch(setFriendLastchatList(chatListShortedArray))
            }
            else {
                console.log('data not found')
            }
        })
    }, [userlistobj, dispatch])

    return chatList;
};

export default useFriendsLastChatList;