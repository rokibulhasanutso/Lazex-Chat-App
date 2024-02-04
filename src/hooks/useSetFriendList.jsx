import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db, uid } from "../firebase/realtimeDatabaseFunctions";
import { useDispatch } from "react-redux";
import { setFriendList } from "../redux/slice/userCategorySlice";

const useSetFriendList = () => {
    const [friendIdList, setFriendIdList] = useState([])
    const [friendlist, setFriendlist] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        onValue(ref(db, 'friends'), (snapshot) => {
            if (snapshot.exists()) {
                const friendIdListArray = []

                snapshot.forEach((eachItem) => {
                    const fromId = eachItem.val().from
                    const toId = eachItem.val().to
                    const status = eachItem.val().status
                    // get friendList filterred from firebase friends database object
                    const friendId = status === 'accepted' && fromId === uid() && toId || toId === uid() && fromId

                    if (friendId) {
                        friendIdListArray.push({
                            userId: friendId,
                            reqId: eachItem.key,
                        })
                    }
                })

                setFriendIdList(friendIdListArray)
            }
        })

    }, [dispatch])

    useEffect(() => {
        onValue(ref(db, `users`), (snapshot) => {
            if (snapshot.exists()) {
                const friendListArray = []

                snapshot.forEach((eachItem) => {
                    friendIdList.forEach((val) => {
                        if (eachItem.key === val.userId) {
                            friendListArray.push({
                                userId: val.userId,
                                reqId: val.reqId,
                                active: eachItem.val().active,
                                name: eachItem.val().userInfo.name,
                                bio: eachItem.val().userInfo.userBio,
                                imgUrl: eachItem.val().profilePicture,
                            })
                        }
                    })
                })

                setFriendlist(friendListArray)
                dispatch(setFriendList(friendListArray))
            }
        })
    }, [friendIdList, dispatch])

    return friendlist;
};

export default useSetFriendList;