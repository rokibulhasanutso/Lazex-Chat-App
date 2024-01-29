import { GrEmoji } from "react-icons/gr";
import { IoImageOutline } from "react-icons/io5";

const MassageEditor = () => {

    const messageEditor = (event) => {
        const { keyCode, shiftKey } = event;

        if (keyCode === 13) {
            event.preventDefault()
        }

        if (keyCode === 13 && shiftKey) {
            document.execCommand("insertLineBreak", false, null)
        }
    }

    return (
        <div className="border-2 rounded-md px-5 py-3 flex focus-within:border-app-primary">
            {/* <textarea 
                id='messageBox' 
                placeholder='Write here your message'
                rows={1}
                className="w-full text-xl outline-none rounded-md"
            /> */}
            <div 
                contentEditable='true'
                spellCheck='true'
                data-lexical-editor="true"
                tabIndex='0'
                role="textbox"
                className="w-full text-xl outline-none rounded-md max-h-80 overflow-x-auto"
                onKeyDown={messageEditor}
            />
            <div className="ps-4 items-end flex gap-x-4">
                <button
                    onClick={() => {}}
                    className="text-slate-500"
                >
                    <IoImageOutline className="text-3xl hover:text-app-primary"/>
                </button>

                <button
                    onClick={() => {}}
                    className="text-slate-500 "
                >
                    <GrEmoji className="text-3xl hover:text-app-primary"/>
                </button>
            </div>
        </div>
    );
};

export default MassageEditor;