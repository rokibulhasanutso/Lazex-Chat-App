import { remove, update } from "firebase/database";
import { dbFriendReqRef, uid } from "../../../../firebase/realtimeDatabaseFunctions";
import ImageHeader from "../../../../components/common/ImageHeader";
import { BsThreeDots } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const FriendList = () => {
    const friends = useSelector((state) => state.userCategoryList.friendList)

    const userUnfriend = (id) => {
        remove(dbFriendReqRef(id))
    }

    const userBlock = (id) => {
        update(dbFriendReqRef(id), {
            status: 'block',
            blockBy: uid()
        })
    }

    return (
        <>{
            friends?.length <= 0 
            ? <span className="mt-4 px-8 text-center block text-slate-500">
                Could not find your friendlist friends.
              </span>

            : <div className="">
              {
                friends?.map((val, i) => (
                    <div key={i} className="hover:bg-slate-100 py-2">
                        <div className="px-6 flex items-center gap-4">
                            <ImageHeader 
                                activity={val?.active} 
                                photoUrl={val?.imgUrl?.sm} 
                                size={'xs'} 
                                name={val?.name}
                            />
                            <span className="flex-1 text-lg">{val?.name}</span>

                            {/* sand massage Buttons */}
                            <Link
                                to={`messages/to/${val.userId}`} 
                                className="text-2xl text-slate-400 hover:text-app-primary active:scale-95"
                            >
                                <AiFillMessage/>
                            </Link>

                            {/* option buttons */}
                            <div className="relative">
                                <button className="peer p-2"><BsThreeDots/></button>
                                <div className="hidden peer-hover:block hover:block absolute top-4 z-10 left-0 -translate-x-[calc(100%-20px)]">
                                    <div className="flex flex-col mt-2 py-1 bg-white border rounded-md shadow">
                                        <button
                                            onClick={() => userUnfriend(val.reqId)}
                                            className="hover:bg-slate-200 py-1 px-4 text-start"
                                        >
                                            Unfriend
                                        </button>
                                        <button 
                                            onClick={() => userBlock(val.reqId)}
                                            className="hover:bg-slate-200 py-1 px-4 text-start"
                                        >
                                            Block
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
              }
              </div>
        }</>
        
    );
};

export default FriendList;