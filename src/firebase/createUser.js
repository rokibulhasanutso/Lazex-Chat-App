import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

const createUser = ({name, email, password}, userData) => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {displayName: name})

        return user
    })
    .then((user) => {
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

export default createUser