import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebaseConfig";

const userSignOut = () => {
    const auth = getAuth(app);
    
    signOut(auth).then(() => {
        // console.log("user is signed out")

    }).catch((error) => {
        console.log(error)
    })
}

export default userSignOut


