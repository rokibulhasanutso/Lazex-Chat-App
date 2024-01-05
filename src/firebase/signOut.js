import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebaseConfig";
import setlocalStorage from "../utils/setLocalStorage";

const userSignOut = (callback) => {
    const auth = getAuth(app);
    
    signOut(auth).then(() => {
        // console.log("user is signed out")
        setlocalStorage(null)
        callback('success')

    }).catch((error) => {
        callback('error')
        console.log(error)
    })
}

export default userSignOut


