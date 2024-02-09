import { onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db, uid } from "../firebase/realtimeDatabaseFunctions";
import { setGroupLastchatList } from "../redux/slice/chatSlice";

const useGroupsLastChatList = () => {
    const [chatList, setChatList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        onValue(query(ref(db, 'chats/group')), (snapshot) => {
            if (snapshot.exists()) {
                const chatListArray = []

                snapshot.forEach((eachItem) => {
                    const groupMembers = Object.values(eachItem?.val()?.members || {})
                    const hasGroupMember = groupMembers?.find(val => val.id === uid())

                    if(hasGroupMember?.id === uid()) {
                        const chatList = Object.values(eachItem.val().chatlist)
                        const lastChatItem = chatList[chatList.length - 1]

                        chatListArray.push({
                            ...lastChatItem,
                            name: eachItem.val()?.name,
                            imgUrl: eachItem.val()?.imgUrl,
                            userId: eachItem.key,
                            chatId: eachItem.key,
                            chatType: snapshot.key
                        })
                    }
                })
                
                // Get the last chat list of each friend in the friendlist.
                const chatListShortedArray = chatListArray.sort((val1, val2) => val2.date - val1.date)
                setChatList(chatListShortedArray)
                dispatch(setGroupLastchatList(chatListShortedArray))
            }
            else {
                console.log('data not found')
            }
        })
    }, [dispatch])

    return chatList;
};

export default useGroupsLastChatList;