import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseConfig";
import setlocalStorage from "../utils/setLocalStorage";

const auth = getAuth(app);

const signInUser = ({email, password}, userData) => {

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        // set data on localStorage
        setlocalStorage(user)

        userData({
            ok: true,
            // user
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        userData({
            ok: false,
            error: {
                errorCode,
                errorMessage
            }
        })
    })

}

export default signInUser

