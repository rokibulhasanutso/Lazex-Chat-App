import { CgMailReply } from 'react-icons/cg';
import { TbFolderShare, TbHeartShare, TbCameraShare } from "react-icons/tb";

const PostButton = ({label, count, variant, action,}) => {

    const button = {}

    if (variant === 'read-latter') {
        button.classList = 'text-[22px] text-stone-700 flex items-center space-x-2 border border-transparent py-1 px-2 transition-all rounded-md hover:border-slate-400'
        button.icon = <TbFolderShare/>
    }
    else if (variant === 'clip-share') {
        button.classList = 'text-[22px] text-stone-700 flex items-center space-x-2 border border-transparent py-1 px-2 transition-all rounded-md hover:border-slate-400'
        button.icon = <TbCameraShare/>
    }
    else if (variant === 'appreciate') {
        button.classList = 'text-[22px] text-stone-700 flex items-center space-x-2 border border-transparent py-1 px-2 transition-all rounded-md hover:border-slate-400'
        button.icon = <TbHeartShare/>
    }
    else if (variant === 'replay') {
        button.classList = 'text-[22px] bg-app-primary/90 active:bg-app-primary text-white flex items-center space-x-1 py-1 px-2 transition-all rounded-md hover:shadow-md'
        button.icon = <CgMailReply/>
    }

    return (
        <button 
            className={button.classList}
            onClick={action}
        >
            {button.icon}
            <span className="text-sm">{label}</span>
            {count && <span className="text-sm">{count}</span>}
        </button>
    );
};

export default PostButton;