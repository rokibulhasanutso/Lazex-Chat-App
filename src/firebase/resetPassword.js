import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "./firebaseConfig";

const passwordReset = (email, message) => {

    const auth = getAuth(app);
    
    sendPasswordResetEmail(auth, email)
    .then(() => {
        message({
            ok: true,
            message: 'Email send successfully'
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;

        message({
            ok: false,
            message: errorCode,
        })
    });
}

export default passwordReset