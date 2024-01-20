import { getDatabase, onValue, push, ref, set, update } from "firebase/database";
import { app } from "../../firebase/firebaseConfig";
import getlocalStorage from "../../utils/getLocalStorage";


const Notification = () => {
    const handleClick = () => {
        // onValue(ref(getDatabase(app), 'users/' + getlocalStorage().uid), (snapshot) => {
            
        // })

        // set(push(ref(getDatabase(app), 'users/' + getlocalStorage().uid)), {
            // userinfo: {
            //     name: 'Rokibul',
            //     email: 'b@email.com'
            // }
        // })

        update(ref(getDatabase(app), 'users/' + getlocalStorage().uid), {
            'userbio': 'hello bio you are now updated'
        }).then(() => {
            console.log('bio update')
        })

    }

    return (
        <div>
            <button className="p-2 border" onClick={handleClick}>get all users</button>
        </div>
    );
};

export default Notification;