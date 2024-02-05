import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db, dbNotificationRef, uid } from "../../firebase/realtimeDatabaseFunctions";
import ImageHeader from "../../components/common/ImageHeader";
import { format } from "date-fns";

const Notification = () => {
    const [notifications, setNotifications] = useState([])
    const [users, setUsers] = useState(null)
    
    useEffect(() => {
        onValue(ref(db, 'users'), (snapshot) => {
            if (snapshot.exists()) {
                onValue(ref(db, 'users'), (snapshot) => {
                    if (snapshot.exists()) {
                        setUsers(snapshot.val())
                    }
                })
            } 
        })

        onValue(dbNotificationRef(uid()), (snapshot) => {
            if (snapshot.exists()) {
                const allNotifications = Object.values(snapshot.val())
                
                setNotifications(allNotifications)
            }
            else {
                setNotifications([])
            }
        })
    }, [])

    return (
        <div className="h-screen py-9">
        <div className="flex flex-col justify-between gap-y-2 max-w-2xl mx-auto h-full">
            <div className="px-8 py-5 shadow bg-white rounded-t-md overflow-hidden border-b">
                <h2 className="text-2xl font-semibold">Notifications</h2>
            </div>

            <div className="flex flex-col-reverse gap-y-2 flex-1 overflow-auto">
            {
                notifications?.map((val, i) => (
                    <div key={i} className="bg-slate-50 py-6 px-8 shadow rounded-md">
                        <div className="flex items-center gap-x-4">
                            <div className="self-start">
                                <ImageHeader 
                                    size={'sm'}
                                    name={users[val?.notifyFrom]?.userInfo?.name}
                                    photoUrl={users[val?.notifyFrom]?.profilePicture?.sm}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-semibold text-slate-700">{users[val?.notifyFrom]?.userInfo?.name}</span>
                                <span className="space-x-2 text-sm text-slate-500">
                                    <span>{format(new Date(val.date), 'PP')}</span>
                                    <span>at {format(new Date(val.date), 'p')}</span>
                                </span>
                                <p className="text-lg mt-2">{val.msg}</p>
                            </div>
                            
                        </div>
                        
                    </div>
                )) 
            }
            </div>
        </div>
        </div>
    );
};

export default Notification;