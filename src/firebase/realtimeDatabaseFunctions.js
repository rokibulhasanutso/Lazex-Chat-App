import { getDatabase, ref, update } from "firebase/database"
import { app } from "./firebaseConfig"
import { localStorageAuthData } from "../utils/getLocalStorage"

export const db = getDatabase(app)
export const uid = localStorageAuthData.uid

// ref
export const dbRef = (path) => {
   return ref(db, path + '/' + uid)
}

export const dbUserRef = () => dbRef('users')

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