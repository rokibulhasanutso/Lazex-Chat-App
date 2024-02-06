import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase/realtimeDatabaseFunctions";
import { useDispatch } from 'react-redux';
import { setUserList } from "../redux/slice/userCategorySlice";

const useGetUserList = () => {
    const [users, setUsers] = useState([])
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
                setUsers(userArr)
                dispatch(setUserList(userArr))
            }
            else {
                setUsers([])
                dispatch(setUserList([]))
            }
        })
    }, [dispatch])

    return users
};

export default useGetUserList;