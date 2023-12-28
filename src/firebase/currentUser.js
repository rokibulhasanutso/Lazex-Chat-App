import { getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

const currentUser = (callback) => {
    const user = getAuth(app).currentUser
    callback(user || {})
    console.log(user)
}

export const getUserData = () => {
    const user = getAuth(app).currentUser

    if (user) {

        console.log('User ID:', user.uid);
        console.log('Email:', user.email);
        console.log('Display Name:', user.displayName);

    } else {
    console.log('No user is currently authenticated.');
    }

    console.log(user)
}

export default currentUser;