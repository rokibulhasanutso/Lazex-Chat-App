import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ImageHeader from "../../../components/common/ImageHeader";
import { uid } from "../../../firebase/realtimeDatabaseFunctions";

const SearchUser = ({openGroupMember, setOpenGroupMember}) => {
    const navigate = useNavigate()
    const users = useSelector((state) => state.userCategoryList.userList)
    const [filteredUserBySearch, setFilteredUserBySearch] = useState(users)

    const userSearch = (e) => {
        const searchInput = e.target.value.toLowerCase()
        const filteredResult = users.filter(
            (eachUser) => eachUser.userInfo.name.toLowerCase().includes(searchInput)
        )
        setFilteredUserBySearch(filteredResult)
    }

    return (
        <>{openGroupMember &&
                <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-[.3] z-[9999] flex justify-center items-center">
                    <div className=" relative bg-white block max-w-lg w-full border rounded-md overflow-hidden">
                        <button 
                            onClick={() => {setOpenGroupMember(false)}}
                            className="text-2xl absolute top-2.5 right-2.5 rounded-full hover:bg-slate-300 px-1 py-1"
                        >
                            <IoClose/>
                        </button>
                        
                        <p className="text-center py-3 text-xl text-slate-600">Search User</p>

                        <div>
                            <div className="w-full max-w-md mx-auto border rounded-md flex flex-col justify-between">
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
                                                    chat
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default SearchUser;