import { useSelector } from "react-redux";
import ImageHeader from "../../../components/common/ImageHeader";
import { db, uid } from "../../../firebase/realtimeDatabaseFunctions";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";

const GroupMemberView = ({groupId, setAdminName}) => {
    const users = useSelector((state) => state.userCategoryList.userList)
    const [groupMember, setGroupMember] = useState([])
    const [filteredUserBySearch, setFilteredUserBySearch] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        onValue(ref(db, `chats/group/${groupId}/members`), (snapshot) => {
            if (snapshot.exists()) {
                const admin = Object.values(snapshot.val()).find(({type}) => type === 'admin')
                setAdminName(admin)

                console.log(admin)

                const membersArray = []

                snapshot.forEach((eachItem) => {
                    const getuser = users?.find(eachUser => eachUser.id === eachItem.key)

                    membersArray.push({
                        ...eachItem.val(),
                        profilePicture: getuser?.profilePicture,
                        userInfo: getuser?.userInfo
                    })
                })

                setGroupMember(membersArray)
                setFilteredUserBySearch(membersArray)
            }
        })
    }, [groupId, users])

    const userSearch = (e) => {
        const searchInput = e.target.value.toLowerCase()
        const filteredResult = groupMember.filter(
            (eachUser) => eachUser.userInfo.name.toLowerCase().includes(searchInput)
        )
        setFilteredUserBySearch(filteredResult)
    }

    return (
        <div className="w-full max-w-lg mx-auto border-t flex flex-col justify-between">
            <div className="px-6 my-4">
                <input 
                    type="text"
                    name="search"
                    id="search"
                    className="w-full px-2 py-1 text-lg outline-none rounded-md border border-slate-400 placeholder:text-slate-400 placeholder:italic"
                    placeholder="Search..."
                    onChange={userSearch}
                />
            </div>

            <div className="py-2 max-h-96 overflow-auto">
                {filteredUserBySearch?.filter((value) => value.id !== uid())
                .map((val) => (
                    <div key={val.id} className="hover:bg-slate-100 py-2">
                        <div onClick={() => navigate('/messages/to/' + val.id)} className="px-6 flex items-center gap-4">
                            <ImageHeader 
                                activity={val.active}
                                photoUrl={val?.profilePicture?.sm}
                                size={'xs'}
                                name={val?.userInfo?.name}
                            />
                            <span className="flex-1 text-lg">{val?.userInfo?.name}</span>
                            <Link
                                to={'/messages/to/' + val.id}
                                className='text-white bg-app-primary px-4 py-2 rounded-md active:scale-95'
                            >
                                Remove
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupMemberView;