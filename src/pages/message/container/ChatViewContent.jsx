import { useEffect, useState } from "react";
import ImageHeader from "../../../components/common/ImageHeader";
import { onValue, ref } from "firebase/database";
import { db, uid } from "../../../firebase/realtimeDatabaseFunctions";

const ChatViewContent = ({convertionType, convertionId}) => {
    const [chatList, setChatList] = useState([])

    useEffect(() => {
        onValue(ref(db, `chats/${convertionType}/${convertionId}`), (snapshot) => {
            if (snapshot.exists()) {
                const chatArray = Object.values(snapshot.val())
                setChatList(chatArray)
            }
            else {
                setChatList([])
            }
        })
    }, [convertionType, convertionId])

    return (
        <div className="h-full flex flex-col justify-end px-8">
            {
                chatList?.length === 0 
                ? <p>No chat found</p> 
                
                : chatList?.map((val) => {
                    if (val.senderId === uid()) {
                        return (
                            <div key={val.id} className="flex justify-end items-end gap-x-4 my-2">
                                <p className="bg-indigo-600 whitespace-pre-wrap text-white px-5 mb-3 py-3 max-w-sm rounded-3xl rounded-br-none relative">
                                    {val.message}
                                </p>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div key={val.id} className="flex items-end gap-x-4 my-2">
                                <ImageHeader size={'xs'} activity={false} />
                                <p className="bg-gray-200 whitespace-pre-wrap border px-5 mb-3 py-3 max-w-sm rounded-3xl rounded-bl-none relative">
                                    {val.message}
                                </p>
                            </div>
                        )
                    }
                })
            }
            
            
        </div>
    );
};

export default ChatViewContent;