import ImportantPost from "./container/ImportantPost";
import HeadText from "../../components/common/HeadText";
import { PiCirclesThreePlusFill } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import InterSectionObserver from "./container/InterSectionObserver";
import SearchUser from "./container/SearchUser";

const Home = () => {
    const [openGroupMember, setOpenGroupMember] = useState(false);
    const [activeCreatePost, setActiveCreatePost] = useState(false)

    return (
        <div className="my-9">
            <div className="max-w-[774px] mx-auto flex gap-4">
                <div className="border border-slate-400 rounded-xl overflow-hidden bg-white space-y-10">
                    <div className="">
                        <HeadText name={'Importants for you'}/>
                        <div className="grid grid-cols-2">
                            <ImportantPost/>
                            <ImportantPost/>
                            <ImportantPost/>
                            <ImportantPost/>
                            <ImportantPost/>
                        </div>
                    </div>
                    <div>
                        <HeadText name={'Feed news'}/>
                        <div>
                            <InterSectionObserver 
                                activeCreatePost={activeCreatePost}
                                closeContent={setActiveCreatePost}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="text-2xl h-auto flex flex-col gap-y-2 sticky top-10">
                        <div
                            className="shadow-lg w-[58px] h-[58px] rounded-full cursor-pointer"
                        >
                            <div className="w-[54px] h-[54px] active:scale-95 rounded-full ring-2 ring-app-primary ring-offset-2 overflow-hidden">
                                <img src="/app_Images/profile_picture1.jpg" alt=""/>
                            </div>
                        </div>
                        <button
                            onClick={() => setActiveCreatePost(true)}
                            className="border p-4 bg-white rounded-full shadow-lg active:scale-95"
                        >
                            <PiCirclesThreePlusFill/>
                        </button>
                        <button
                            onClick={() => {setOpenGroupMember(true)}}
                            className="border p-4 bg-white rounded-full shadow-lg active:scale-95"
                        >
                            <IoSearchSharp/>

                            <SearchUser setOpenGroupMember={setOpenGroupMember} openGroupMember={openGroupMember}/>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Home;