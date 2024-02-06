import { useEffect, useState } from "react";
import ImageHeader from '../../../../components/common/ImageHeader';
import { FaUserPlus } from "react-icons/fa";
import { onValue, push, ref, remove, update } from "firebase/database";
import { db, dbFriendReqRef, dbNotificationRef, uid } from "../../../../firebase/realtimeDatabaseFunctions";
import { useSelector } from "react-redux";

const UserList = () => {
    const users = useSelector((state) => state.userCategoryList.userList)
    const [filterUsers, setFilterUsers] = useState([])
    const [friends, setFriends] = useState([])
    
    useEffect(() => {
        onValue(ref(db, 'friends'), (snapshot) => {
            if (snapshot.exists()) {
                let friendsObj = snapshot.val();

                const friendReq = Object.values(friendsObj || []).filter((val) => {
                    return val.from === uid() && val.status === 'pending'
                })

                setFriends(friendReq)
            }
            else {
                setFriends([])
            }
        })
    }, [])

    useEffect(() => {
        // users set without friends
        onValue(ref(db, 'friends'), (snapshot) => {
            if (snapshot.exists()) {
                let friendsObj = snapshot.val();

                // user filter by accepted friends 
                const acceptedReq = Object.values(friendsObj || []).map((val) => {
                    if (val.status === 'accepted' || val.status === 'block') {
                        if (val.from === uid()) {
                            return val.to
                        }
                        else if (val.to === uid()) {
                            return val.from
                        }
                    }
                })

                const newUsers = users?.filter((val) => !acceptedReq.includes(val.id))
                // set users without accepted status or friends 
                setFilterUsers(newUsers)
            }
            else {
                setFriends([])
                setFilterUsers(users)
            }
        })
    }, [users])

    const sendFrinedRequest = (userId) => {
        const id = push(ref(db)).key

        update(dbFriendReqRef(id), {
            id,
            from: uid(),
            to: userId,
            status: 'pending'
        })

        // notify of user
        push(dbNotificationRef(userId), {
            id,
            notifyFrom: uid(),
            date: `${new Date()}`,
            msg: 'Sent a friend request'
        })
    }

    const cancelFrinedRequest = (id) => {
        remove(dbFriendReqRef(id))
    }

    return (
        <div className="">
        {
            filterUsers?.
            filter((value) => value.id !== uid())
            .map((val, i) => (
                <div key={i} className="hover:bg-slate-100 py-2">
                    <div className="px-6 flex items-center gap-4">
                        <ImageHeader 
                            activity={val.active} 
                            photoUrl={val?.profilePicture?.sm} 
                            size={'xs'} 
                            name={val?.userInfo?.name}
                        />
                        <span className="flex-1 text-lg">{val?.userInfo?.name}</span>
                        {
                            (() => {
                                const valReq = friends.find((friendReq) => friendReq.to === val.id)
                                
                                return valReq
                                ? <button onClick={() => cancelFrinedRequest(valReq.id)} >
                                    Cancel
                                  </button>
                                : <button onClick={() => sendFrinedRequest(val.id)}>
                                    <FaUserPlus className="text-2xl text-slate-500"/>
                                  </button>
                            })()
                        }
                    </div>
                </div>
            ))
        }
        </div>
    );
};

export default UserList;