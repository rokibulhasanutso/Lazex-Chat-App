import { CgMailReply } from 'react-icons/cg';
import { IoIosArrowDown, IoIosMore } from 'react-icons/io';
import { TbFolderShare, TbHeartShare, TbCameraShare } from "react-icons/tb";

const PostButton = ({label, count, variant, action, position, expand}) => {

    const button = {}

    if (variant === 'read-latter') {
        button.classList = 'text-[22px] text-stone-700 flex items-center space-x-2 border border-transparent py-1 px-2 transition-all rounded-md hover:border-slate-400 active:scale-90'
        button.icon = <TbFolderShare/>
    }
    else if (variant === 'clip-share') {
        button.classList = 'text-[22px] text-stone-700 flex items-center space-x-2 border border-transparent py-1 px-2 transition-all rounded-md hover:border-slate-400 active:scale-90'
        button.icon = <TbCameraShare/>
    }
    else if (variant === 'appreciate') {
        button.classList = 'text-[22px] text-stone-700 flex items-center space-x-2 border border-transparent py-1 px-2 transition-all rounded-md hover:border-slate-400 active:scale-90'
        button.icon = <TbHeartShare/>
    }
    else if (variant === 'comment') {
        button.classList = 'text-[22px] font-semibold bg-app-primary/90 active:bg-app-primary text-white flex items-center space-x-1 py-1 px-2 transition-all rounded-md hover:shadow-md'
        button.icon = <CgMailReply/>
    }
    else if (variant === 'menu') {
        button.classList = `text-xl text-slate-500 ${position} py-2`
        button.icon = <IoIosMore className={`rotate-90`}/>
    }
    else if (variant === 'expand') {
        button.classList = `text-xl text-slate-500 ${position} py-2`
        button.icon = <IoIosArrowDown className={expand ? 'rotate-180 transition-all' : ''}/>
    }

    return (
        <button 
            className={button.classList}
            onClick={action}
        >
            {button.icon}
            {label ? <span className="text-sm">{label}</span> : null}
            {count !== 0 ? <span className="text-sm">{count}</span> : null}
        </button>
    );
};

export default PostButton;