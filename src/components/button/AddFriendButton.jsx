import { FaUserPlus } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";

const AddFriendButton = ({actionClick}) => {
    return (
        <>
            <button
                onClick={actionClick}
                className="px-2 py-2 rounded-full"
            >
                {/* <FaUserPlus className="mx-auto text-2xl text-slate-400 group-hover:active:text-app-primary/50 group-hover:text-app-primary "/> */}
                <LuLoader2 className="mx-auto z-0 text-xl text-app-primary animate-spin"/>
                {/* <span className="mx-auto text-sm text-app-primary bg-slate-50 active:bg-slate-100 leading-relaxed border border-slate-300 rounded-md px-2 py-1">
                    Cancel request
                </span> */}
            </button>
        </>
    );
};

export default AddFriendButton