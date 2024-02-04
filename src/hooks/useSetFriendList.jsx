import { child, get, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db, uid } from "../firebase/realtimeDatabaseFunctions";
import { useDispatch } from "react-redux";
import { setFriendList } from "../redux/slice/userCategorySlice";

const useSetFriendList = () => {
    const [friendlist, setFriendlist] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        onValue(ref(db, 'friends'), (snapshot) => {
            if (snapshot.exists()) {
                const friendListArray = []

                snapshot.forEach((eachItem) => {
                    const fromId = eachItem.val().from
                    const toId = eachItem.val().to
                    const status = eachItem.val().status
                    // get friendList filterred from firebase friends database object
                    const friendId = status === 'accepted' && fromId === uid() && toId || toId === uid() && fromId

                    if (friendId) {
                        const promise = get(child(ref(db), `users/${friendId}`)).then((snapshot) => {
                            return {
                                active: snapshot.val().active,
                                userId: snapshot.key,
                                reqId: eachItem.key,
                                name: snapshot.val().userInfo.name,
                                bio: snapshot.val().userInfo.userBio,
                                imgUrl: snapshot.val().profilePicture,
                            }
                        })

                        friendListArray.push(promise)
                    }
                })

                Promise.all(friendListArray).then((friendList) => {
                    dispatch(setFriendList(friendList))
                    setFriendlist(friendList)
                })
            }
        })

    }, [dispatch])

    return friendlist;
};

export default useSetFriendList;