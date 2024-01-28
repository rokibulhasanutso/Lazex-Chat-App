import { getDatabase, ref, update } from "firebase/database"
import { app } from "./firebaseConfig"
import { getAuth } from 'firebase/auth';
import { localStorageAuthData } from "../utils/getLocalStorage";

export const db = getDatabase(app)
export let uid = () => getAuth(app).currentUser?.uid || localStorageAuthData?.uid;

// ref
export const dbRef = (rootPath, path) => {
   return ref(db, rootPath + '/' + uid() + '/' + path)
}

export const dbActiveRef = () => dbRef('users', '')
export const dbUserRef = () => dbRef('users', 'userInfo')
export const dbImageRef = () => dbRef('users', 'profilePicture')
export const dbFriendReqRef = (key) => ref(db, 'friends/' + key)
export const dbNotificationRef = (key) => ref(db, 'users/' + key + '/notification')

// functions 
export const dbUpdateUserBio = (data) => {
    if (!data) throw Error('Userbio : Your data could not be found.')
    return update(dbRef('users'), {
        userBio : data
    })
}

export const dbUpdatePersonalInfo = (data) => {
    if (!data) throw Error('User personal info : Your data could not be found.')
    return update(dbRef('users'), data)
}
