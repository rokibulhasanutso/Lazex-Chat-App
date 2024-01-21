import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebaseConfig";
import setlocalStorage from "../utils/setLocalStorage";

const auth = getAuth(app);
const db = getDatabase(app);

const createUser = ({name, email, password}, userData) => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        set(ref(db, `users/${user.uid}/userInfo`), {
            name: name,
            email: user.email,
        })
        
        return user
    })
    .then((user) => {
        // set data on localStorage
        setlocalStorage(user)

        userData({
            ok: true, // response back for redirect on home page
            //user // if you need user creation data send back
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