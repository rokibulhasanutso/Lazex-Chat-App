import { GrEmoji } from "react-icons/gr";
import { IoImageOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react';
import { useEffect, useRef, useState } from "react";
import { push, ref, update } from "firebase/database";
import { db, uid } from "../../../firebase/realtimeDatabaseFunctions";

const MassageEditor = ({convertionType, convertionId}) => {
    const [emojiOpen, setEmojiOpen] = useState(false)
    const emojiContentRef = useRef('') 
    const editorRef= useRef('') 

    useEffect(() => {
        const emojiCloseClickOutside = (e) => {
            if (emojiOpen && !emojiContentRef.current?.contains(e.target)) {
                setEmojiOpen(false);
            }
        }
        window.addEventListener('mousedown', emojiCloseClickOutside)
        return () => window.removeEventListener('mousedown', emojiCloseClickOutside)
    }, [emojiOpen])
    
    const sendmessage = () => {
        const key = push(ref(db)).key

        update(ref(db, `chats/${convertionType}/${convertionId}/${key}`), {
            id: key,
            date: new Date().getTime(),
            senderId: uid(),
            message: editorRef.current.innerText.trim(),
            read: false
        })
    }

    const messageEditor = (event) => {
        const { keyCode, shiftKey } = event;

        if (keyCode === 13 && shiftKey) {
            // insert a line break
            // document.execCommand("insertLineBreak", false, null)
        }
        else if (keyCode === 13) {
            event.preventDefault()
            // console.log(editorRef.current.innerText.trim())
            sendmessage()
        }
    }

    const selectEmoji = (emojiObject) => {

        // get Emoji
        const symbol = emojiObject.unified.split("_")
        const codeArray = []
        symbol.forEach(element => codeArray.push('0x' + element))
        const emoji = String.fromCodePoint(...codeArray)

        // add emoji inside editalbe content
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            
            // Check if the range is within the contenteditable element
            if (editorRef.current.contains(range.commonAncestorContainer)) {
                // add emoji on slection
                const fragment = range.createContextualFragment(emoji)
                range.insertNode(fragment)
            }
            
            // selection range close or end
            range.collapse(false)
        }
    }


    return (
        <div className="flex gap-x-2">
            <div className="flex-1 border-2 rounded-xl px-5 py-3 flex focus-within:border-app-primary">
                {/* <textarea 
                    id='messageBox' 
                    placeholder='Write here your message'
                    rows={1}
                    className="w-full text-xl outline-none rounded-md"
                /> */}
                <div 
                    ref={editorRef}
                    contentEditable='true'
                    spellCheck='true'
                    data-lexical-editor="true"
                    tabIndex='0'
                    role="textbox"
                    className="w-full text-xl outline-none max-h-80 overflow-x-auto"
                    onKeyDown={messageEditor}
                />

                {/* buttons */}
                <div className="ps-4 items-end flex gap-x-4">
                    <button
                        onClick={() => {}}
                        className="text-slate-500"
                    >
                        <IoImageOutline className="text-3xl hover:text-app-primary"/>
                    </button>

                    <div className="relative flex">
                        <button
                            onClick={() => setEmojiOpen(!emojiOpen)}
                            className="text-slate-500"
                        >
                            <GrEmoji className="text-3xl hover:text-app-primary"/>
                        </button>
                        
                        {/* emoji picker */}
                        {emojiOpen &&
                        <div 
                            ref={emojiContentRef} 
                            className="border border-app-primary shadow-xl rounded-xl absolute bottom-0 -translate-y-14 left-full -translate-x-full"
                        >
                            <Picker
                                data={data}
                                emojiButtonRadius={'6px'}
                                previewPosition={'none'}
                                navPosition={'bottom'}
                                // autoFocus={true}
                                emojiSize={28}
                                emojiButtonSize={40}
                                perLine={8}
                                onEmojiSelect={selectEmoji}
                                theme={'light'}
                            />
                        </div>}
                    </div>
                </div>
            </div>

            {/* messge send button */}
            <button 
                onClick={sendmessage} 
                className="bg-app-primary self-end rounded-xl w-[58px] h-[58px] grid place-content-center m-px"
            >
                <IoIosSend className="text-white text-2xl"/>
            </button>
        </div>
    );
};

export default MassageEditor;