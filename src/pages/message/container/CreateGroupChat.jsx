import { useSelector } from "react-redux";
import ImageHeader from "../../../components/common/ImageHeader";
import { db, uid } from "../../../firebase/realtimeDatabaseFunctions";
import { useEffect, useState } from "react";
import { IoClose, IoImageOutline } from "react-icons/io5";
import { push, ref, update } from "firebase/database";
import imageFileReader from "../../../utils/imageFileReader";
import imageCompression from "../../../utils/imageCompression";
import useImageUploader from "../../../hooks/useImageUploader";
import { useNavigate } from "react-router-dom";

const CreateGroupChat = () => {
    const users = useSelector((state) => state.userCategoryList.userList)
    const [filteredUser, setFilteredUser] = useState(users)
    const [filteredUserBySearch, setFilteredUserBySearch] = useState(filteredUser)
    const [selectedUser, setSelectedUser] = useState([])
    const [filteredSelectedUser, setFilteredSelectedUser] = useState([])
    const [groupName, setGroupName] = useState('')
    const [groupImage, setGroupImage] = useState(null)
    const [groupImageBlob, setGroupImageBlob] = useState(null)
    const [creationLoading, setCreationLoading] = useState(false)
    const { uploadImage, progress } = useImageUploader() // custom hook
    const navigate = useNavigate()

    const userSearch = (e) => {
        const searchInput = e.target.value.toLowerCase()
        const filteredResult = filteredUser.filter(
            (eachUser) => eachUser.userInfo.name.toLowerCase().includes(searchInput)
        )
        setFilteredUserBySearch(filteredResult)
    }

    const addUser = (userId) => {
        setSelectedUser(preUserId => [
            ...preUserId,
            userId
        ])
    }

    const removeSelectedUser = (userId) => {
        setSelectedUser(preUserIds => preUserIds.filter(preUserId => preUserId !== userId))
    }

    useEffect(() => {
        const withOutSelectedUsers = users.filter((val) => !selectedUser.includes(val.id))
        setFilteredUser(withOutSelectedUsers)
        setFilteredUserBySearch(withOutSelectedUsers)

        const selectedUsers = users.filter((val) => selectedUser.includes(val.id))
        setFilteredSelectedUser(selectedUsers)
    }, [selectedUser, users])

    // get select image function
    const getSelectedImage = (event) => {
        imageFileReader(event.target.files[0], ({imageData}) => {
            imageCompression(imageData, 124, ({data}) => {
                setGroupImage(data)   // image show for which image get selected  
            })
            setGroupImageBlob(imageData)  // main file set message in message blob
        })
        event.target.value = null   // reset input image file
    }

    const createGroup = async () => {
        setCreationLoading(true)
        const key = push(ref(db)).key

        const memberList = selectedUser.reduce(
            (object, selectedId) => {
                object[selectedId] = {id: selectedId, type: 'normal'}
                return object
            }, 
            {[uid()]: {id: uid(), type: 'admin'}}
        )

        if(groupName) {

            let imageUrl = {};
            if (groupImageBlob) {

                // uploadImage is a custom hook
                // it get object argument for upload image 
                imageUrl = await uploadImage({ 
                    image: groupImageBlob,
                    path: `chat_image/${key}/group_image`,
                    size: { md: 124 },
                })
                .then((imageUrl) => {
                    return imageUrl
                })
                .catch((error) => {
                    console.error('Error: ', error);
                })
            }

            update(ref(db, `chats/group/${key}`), {
                groupId: key,
                name: groupName,
                imgUrl: groupImageBlob ? imageUrl : '',
                members: memberList
            })
            .then(() => {
                setCreationLoading(false)
                navigate('/messages/with/' + key)
            })
        }
    }

    return (
        <>{
            creationLoading
            ? <div className="text-xl font-medium text-center my-10 text-slate-500">Group creating please wait...</div>
            : <div className="w-full max-w-md mx-auto flex flex-col justify-between border rounded-md">
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

                {filteredSelectedUser.length !== 0 &&
                <div className="px-6 py-4 bg-indigo-50">
                    <div className="flex flex-wrap gap-1 flex-1 mb-2">
                        {filteredSelectedUser.map((val) => (
                            <div key={val.id} className="flex items-center gap-x-1 border-2 bg-white rounded-full px-1 py-0.5">
                                <img src={val.profilePicture.sm} className="w-6 h-6 rounded-full overflow-hidden object-cover"/>
                                <span className="text-base font-medium text-slate-500">{val.userInfo.name}</span>
                                <span onClick={() => removeSelectedUser(val.id)} className="px-1 py-1 rounded-full bg-slate-200 text-sm cursor-pointer"><IoClose/></span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <div
                            className="text-slate-500 -me-2"
                        >
                            <label htmlFor='uploadImage' className='cursor-pointer'>
                                {
                                    groupImage 
                                    ? <img src={groupImage} className="w-8 h-8 rounded-full"/>
                                    : <IoImageOutline className="text-3xl text-app-primary active:scale-90"/>
                                }
                            </label>
                            <input 
                                id="uploadImage" 
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                hidden
                                onChange={getSelectedImage}
                            />
                        </div>

                        <input 
                            type="text"
                            name="search"
                            id="search"
                            className="flex-1 px-2 py-0.5 outline-none rounded-md border border-slate-300 placeholder:text-slate-400 placeholder:italic"
                            placeholder="Group Name"
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <button
                            onClick={createGroup}
                            type='button'
                            className={`disabled:opacity-50 self-stretch text-white bg-app-primary px-4 py-1 rounded-md`}
                            disabled={!groupName && true}
                        >
                            Create
                        </button>
                    </div>
                </div>}

                <div className="py-2 overflow-auto max-h-96">
                    {filteredUserBySearch.length === 0 && 
                        <span className="px-8 text-center block text-slate-500">
                            Could not find your search result.
                        </span>
                    }
                    {filteredUserBySearch?.filter((value) => value.id !== uid())
                    .map((val) => (
                        <div key={val.id} className="hover:bg-slate-100 py-2">
                            <div className="px-6 flex items-center gap-4">
                                <ImageHeader 
                                    activity={val.active} 
                                    photoUrl={val?.profilePicture?.sm} 
                                    size={'xs'} 
                                    name={val?.userInfo?.name}
                                />
                                <span className="flex-1 text-lg">{val?.userInfo?.name}</span>
                                <button
                                    onClick={() => addUser(val.id)}
                                    type='button'
                                    className='text-white bg-app-primary px-4 py-2 rounded-md active:scale-95'
                                >
                                    add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        }</>
        
    );
};

export default CreateGroupChat;