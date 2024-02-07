import { memo } from "react";
import ImageHeader from "../../../components/common/ImageHeader";
import { uid } from "../../../firebase/realtimeDatabaseFunctions";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';
import { useSelector } from "react-redux";

const MessageSidebar = () => {
    const { userId } = useParams()
    const friendChatList = useSelector((state) => state.chatInfo.friendLastchatList)
    const groupChatList = useSelector((state) => state.chatInfo.groupLastchatList)
    const users = useSelector((state) => state.userCategoryList.userList)

    const callUserName = (userId) => {
        const userData = users?.find(user => user.id === userId)
        const username = userData?.userInfo?.name

        return username
    }

    return (
        <div className="rounded-t-md flex flex-col justify-between h-full">
            <div className="px-8 py-5 bg-white rounded-t-md overflow-hidden border-b">
                <h2 className="text-2xl font-semibold">Messages</h2>
            </div>

            <div className="flex-1 overflow-x-auto">
            {
                [...groupChatList, ...friendChatList]?.length <= 0 &&
                <span className="mt-4 px-8 text-center block text-slate-500">
                    Could not find your chat list.
                </span>
            }
            {
                [...groupChatList, ...friendChatList]?.sort((val1, val2) => val2.date - val1.date)
                ?.map((val) => (
                    <Link key={val.id} to={`/messages/${val.chatType === 'single' && 'to' || val.chatType === 'group' && 'with' }/${val.userId}`}>
                        <div className={`relative border-b ${val?.userId === userId ? 'after:absolute' : 'hover:after:absolute'} after:rounded-tr-md after:rounded-br-md after:bg-app-primary after:w-1.5 after:h-[calc(100%+2px)] after:z-50 after:-top-px after:-left-[2px]`}>
                            <div className={`flex gap-x-4 px-8 py-4 ${val?.userId === userId ? 'bg-indigo-100' : 'bg-white'}`}>
                                {/* head image */}
                                <ImageHeader size={'sm'} activity={val?.active} photoUrl={val?.imgUrl?.sm || val?.imgUrl?.md} name={val?.name}/>
                                
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 select-none py-0.5 transition-all">
                                        <div className="flex-1">
                                            <p className="font-semibold text-xl">{val?.name}</p>
                                        </div>
                                        <div className="items-stretch my-auto">
                                            <span className="text-sm py-1.5 text-slate-500">{format(new Date(val?.date), 'p')}</span>
                                        </div>
                                    </div>

                                    {/* message content */}
                                    <p className="text-base leading-normal tracking-tight text-slate-600 whitespace-pre-line line-clamp-2">
                                    {   
                                        val?.chatType === 'single' && (
                                            val?.msg_react && val?.reactId === val?.userId
                                            ? <span>Reacted {val?.msg_react} to your message</span>
                                            : <span>{`${val?.senderId === uid() ? 'You:' : ''} ${val?.message === 'thumbsup' ? '👍' : val?.message}`}</span>
                                        )
                                    }
                                    {   
                                        val?.chatType === 'group' && (
                                            val?.msg_react && val?.reactId !== uid()
                                            ? <span>{callUserName(val.reactId)} Reacted {val?.msg_react} to {`${val?.senderId === uid() ? 'Your' : callUserName(val.senderId)}`} message</span>
                                            : <span>{`${val?.senderId === uid() ? 'You' : callUserName(val.senderId)}: ${val?.message === 'thumbsup' ? '👍' : val?.message}`}</span>
                                        )
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