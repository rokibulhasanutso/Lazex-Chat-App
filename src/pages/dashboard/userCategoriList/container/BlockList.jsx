import { onValue, ref, update } from "firebase/database";
import { db, dbFriendReqRef, uid } from "../../../../firebase/realtimeDatabaseFunctions";
import { useEffect, useState } from "react";
import ImageHeader from "../../../../components/common/ImageHeader";

const BlockList = () => {
    const [blockFriends, setBlockFriends] = useState([])
    
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

                        // user filter by blocked friends 
                        const acceptedReq = Object.values(friendsObj || []).map((val) => {
                            if (val.status === 'block') {
                                if (val.blockBy === uid()) {
                                    return {
                                        // The id of the person opposite to the one who blocked will be in ref
                                        ref: val.from === val.blockBy ? val.to : val.from,
                                        refId: val.id
                                    }
                                }
                            }
                        })
                        .filter((val) => val !== undefined) // remove from undefined and pure array

                        const BlockFriendList = userArr?.map((val) => {
                            const exacUser = acceptedReq?.find((reqVal) => reqVal?.ref === val.id)

                            if (exacUser) {
                                return {
                                    ...val,
                                    reqId : exacUser.refId
                                }
                            }
                        })
                        .filter((val) => val !== undefined) // remove from undefined and pure array

                        setBlockFriends(BlockFriendList) // set friends with reqId
                    }
                    else {
                        setBlockFriends([])
                    }
                })
            }
        })
    }, [])

    const userUnblock = (id) => {
        update(dbFriendReqRef(id), {
            status: 'accepted',
            blockBy: null
        })
    }

    return (
        <>{
            blockFriends?.length <= 0 
            ? <span className="mt-4 px-8 text-center block text-slate-500">
                Could not find your blocked friends.
              </span>

            : <div className="">
              {
                blockFriends?.map((val, i) => (
                    <div key={i} className="hover:bg-slate-100 py-2">
                        <div className="px-6 flex items-center gap-4">
                            <ImageHeader  
                                photoUrl={val?.profilePicture?.sm} 
                                size={'xs'} 
                                name={val?.userInfo?.name}
                            />
                            <span className="flex-1 text-lg">{val?.userInfo?.name}</span>
                            <button 
                                onClick={() => userUnblock(val.reqId)}
                                className="hover:bg-slate-300 bg-slate-200 text-base py-0.5 rounded-md border hover:border-transparent px-2 text-start"
                            >
                                Unblock
                            </button>
                        </div>
                    </div>
                ))
              }
              </div>
        }</>
    );
};

export default BlockList;