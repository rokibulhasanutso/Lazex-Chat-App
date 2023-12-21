import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

const signInUser = ({email, password}, userData) => {

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        userData({
            ok: true,
            user
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

// auth/invalid-credential