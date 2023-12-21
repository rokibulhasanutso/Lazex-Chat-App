import { BsThreeDotsVertical } from "react-icons/bs";

const ListComponent = ({listName, name, title, children}) => {

    return (
        <div className="w-[400px]">
            <div className="bg-white border rounded-md h-full">
                {/* component header */}
                <div className="flex justify-between px-5 py-4 border-b text-slate-700">
                    <p className="capitalize font-semibold text-[18px]">{ listName || 'list name' }</p>

                    {/* menu icons */}
                    <button>
                        <BsThreeDotsVertical/>
                    </button>
                </div>

                {/* content list */}
                <div className="overflow-y-scroll py-2 h-96">
                    <div className="group">
                        <div className="flex justify-between gap-5 group-hover:bg-slate-100 py-2 px-5">
                            <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
                                <img src="/app_Images/profile_picture.jpg" alt="Content Image" />
                            </div>
                            
                            <div className="my-auto">
                                <p className="font-semibold text-[18px]">{name || 'Your name'}</p>
                                <p className="text-slate-500">{title || 'Your title'}</p>
                            </div>
                            
                            <div className="flex-grow flex justify-end">
                                <div className="my-auto">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListComponent;