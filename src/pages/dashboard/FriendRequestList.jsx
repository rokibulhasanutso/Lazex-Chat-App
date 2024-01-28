import { useEffect, useState } from 'react';
import HeadText from '../../components/common/HeadText';
import { onValue, push, ref, remove, update } from 'firebase/database';
import { db, dbFriendReqRef, dbNotificationRef, uid } from '../../firebase/realtimeDatabaseFunctions';
import ImageHeader from '../../components/common/ImageHeader';

const FriendRequestList = () => {
    const [friendRequestList, setFriendRequestList] = useState([])
    const [users, setUsers] = useState(null)
    
    useEffect(() => {
        onValue(ref(db, 'users'), (snapshot) => {
            if (snapshot.exists()) setUsers(snapshot.val())
        })

        onValue(dbFriendReqRef(''), (snapshot) => {
            if (snapshot.exists()) {
                const reqList = Object.values(snapshot.val()).filter((val) => val.status === 'pending' && val.to === uid())
                setFriendRequestList(reqList)
            }
            else {
                setFriendRequestList([])
            }
        })
    }, [])

    const cancelFrinedRequest = (id) => {
        remove(dbFriendReqRef(id))
    }

    const acceptFrinedRequest = (val) => {
        update(dbFriendReqRef(val.id), {
            status: "accepted"
        })

        // notify of user
        push(dbNotificationRef(val.from), {
            id: push(ref(db)).key,
            notifyFrom: uid(),
            date: `${new Date()}`,
            msg: 'Accept your friend request',
            status: 'unread'
        })
    }

    return (
        <>{ friendRequestList.length > 0 &&
            <div className="w-full border-2 border-slate-400 rounded-md bg-white">
                <div className="max-h-60 overflow-y-auto">
                    <HeadText name={'Friend Request'} padding={'px-6 py-3'}/>
                    {
                        friendRequestList?.map((val, i) => (
                            <div key={i} className="hover:bg-slate-100 py-2 last:mb-3">
                                <div className="px-6 flex items-center gap-x-4">
                                    <ImageHeader 
                                        photoUrl={users[val?.from]?.profilePicture?.sm} 
                                        size={'sm'} 
                                        name={users[val?.from]?.userInfo?.name}
                                    />
                                    <div className='space-y-1'>
                                        <span className="block flex-1 text-lg">{users[val?.from]?.userInfo?.name}</span>
                                        <div className='text-xs space-x-1'>
                                            <button 
                                                onClick={() => acceptFrinedRequest(val)}
                                                className='bg-app-primary hover:border-transparent text-white px-2 py-0.5 border rounded-[4px]'
                                            >
                                                Confirm
                                            </button>
                                            <button 
                                                onClick={() => cancelFrinedRequest(val.id)}
                                                className='hover:bg-red-500 hover:border-transparent hover:text-white px-2 py-0.5 border rounded-[4px]'
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        }</>
    );
};

export default FriendRequestList;