import { onValue, ref, remove, update } from "firebase/database";
import { db, dbFriendReqRef, uid } from "../../../../firebase/realtimeDatabaseFunctions";
import { useEffect, useState } from "react";
import ImageHeader from "../../../../components/common/ImageHeader";
import { BsThreeDots } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setFriendlist } from "../../../../redux/slice/chatSlice";

const FriendList = () => {
    const [friends, setFriends] = useState([])
    const dispatch = useDispatch()
    
    useEffect(() => {
        onValue(ref(db, 'users'), (snapshot) => {
            if (snapshot.exists()) {
                const userArr = Object.values(snapshot.val()).map((value, i) => {
                    return {
                        ...value,
                        id: Object.keys(snapshot.val())[i]
                    }
                })

                // filter friends from users
                onValue(ref(db, 'friends'), (snapshot) => {
                    if (snapshot.exists()) {
                        let friendsObj = snapshot.val();

                        // user filter by accepted friends 
                        const acceptedReq = Object.values(friendsObj || []).map((val) => {
                            if (val.status === 'accepted') {
                                if (val.from === uid()) {
                                    return {
                                        ref: val.to,
                                        refId: val.id
                                    }
                                }
                                else if (val.to === uid()) {
                                    return {
                                        ref: val.from,
                                        refId: val.id
                                    }
                                }
                            }
                        })
                        .filter((val) => val !== undefined) // remove from undefined and pure array

                        const friendList = userArr?.map((val) => {
                            const exacUser = acceptedReq?.find((reqVal) => reqVal?.ref === val.id)

                            if (exacUser) {
                                return {
                                    ...val,
                                    reqId : exacUser.refId
                                }
                            }
                        })
                        .filter((val) => val !== undefined) // remove from undefined and pure array

                        setFriends(friendList) // set friends with reqId
                        dispatch(setFriendlist(friendList))
                    }
                    else {
                        setFriends([])
                    }
                })
            }
        })
    }, [dispatch])

    const userUnfriend = (id) => {
        remove(dbFriendReqRef(id))
    }

    const userBlock = (id) => {
        update(dbFriendReqRef(id), {
            status: 'block',
            blockBy: uid()
        })
    }

    return (
        <>{
            friends?.length <= 0 
            ? <span className="mt-4 px-8 text-center block text-slate-500">
                Could not find your friendlist friends.
              </span>

            : <div className="">
              {
                friends?.map((val, i) => (
                    <div key={i} className="hover:bg-slate-100 py-2">
                        <div className="px-6 flex items-center gap-4">
                            <ImageHeader 
                                activity={val?.active} 
                                photoUrl={val?.profilePicture?.sm} 
                                size={'xs'} 
                                name={val?.userInfo?.name}
                            />
                            <span className="flex-1 text-lg">{val?.userInfo?.name}</span>

                            {/* sand massage Buttons */}
                            <Link
                                to={`messages/to/${val.id}`} 
                                className="text-2xl text-slate-400 hover:text-app-primary active:scale-95"
                            >
                                <AiFillMessage/>
                            </Link>

                            {/* option buttons */}
                            <div className="relative">
                                <button className="peer p-2"><BsThreeDots/></button>
                                <div className="hidden peer-hover:block hover:block absolute top-4 z-10 left-0 -translate-x-[calc(100%-20px)]">
                                    <div className="flex flex-col mt-2 py-1 bg-white border rounded-md shadow">
                                        <button
                                            onClick={() => userUnfriend(val.reqId)}
                                            className="hover:bg-slate-200 py-1 px-4 text-start"
                                        >
                                            Unfriend
                                        </button>
                                        <button 
                                            onClick={() => userBlock(val.reqId)}
                                            className="hover:bg-slate-200 py-1 px-4 text-start"
                                        >
                                            Block
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
              }
              </div>
        }</>
        
    );
};

export default FriendList;