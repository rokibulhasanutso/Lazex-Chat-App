import { GrEmoji } from "react-icons/gr";
import { IoImageOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { FaThumbsUp } from "react-icons/fa6";
import { AiFillCloseCircle } from "react-icons/ai";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react';
import { useEffect, useRef, useState } from "react";
import { push, ref, update } from "firebase/database";
import { db, uid } from "../../../firebase/realtimeDatabaseFunctions";

const MassageEditor = ({convertionType, convertionId, replyMessage, replyUserName, removeRelyMsg}) => {
    const [emojiOpen, setEmojiOpen] = useState(false)
    const [isEditorEmpty, setIsEditorEmpty] = useState(true)
    const emojiContentRef = useRef('') 
    const editorRef= useRef('') 

    // check editor is empty or not
    const getEditorInput = (e) => {
        if (e.target.innerText === '') {
            setIsEditorEmpty(true)
        }
        else {
            setIsEditorEmpty(false)
        }
    }

    // key down editor box function
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

    // set emoji function
    const selectEmoji = (emojiObject) => {
        // get Emoji
        const symbol = emojiObject.unified.split("_")
        const codeArray = []
        symbol.forEach(element => codeArray.push('0x' + element))
        const emoji = String.fromCodePoint(...codeArray)

        console.log(emoji)

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

    // when emoji box open and click outside then close emoji box
    useEffect(() => {
        const emojiCloseClickOutside = (e) => {
            if (emojiOpen && !emojiContentRef.current?.contains(e.target)) {
                setEmojiOpen(false);
            }
        }
        window.addEventListener('mousedown', emojiCloseClickOutside)
        return () => window.removeEventListener('mousedown', emojiCloseClickOutside)
    }, [emojiOpen])

    // send message on database
    const sendmessage = () => {
        const key = push(ref(db)).key

        update(ref(db, `chats/${convertionType}/${convertionId}/${key}`), {
            id: key,
            date: new Date().getTime(),
            senderId: uid(),
            message: editorRef.current.innerText.trim() || 'like',
            read: false,
            replyMessage: replyMessage?.msg || null
        })
        .then(() => {
            // close reply content for set empty object
            removeRelyMsg({})
            // clear editor input section
            editorRef.current.innerHTML = ''
            setIsEditorEmpty(true) // set confirmation editor is empty
        })
    }

    return (
        <div>
            {Object.keys(replyMessage).length > 0 &&
                <div className="py-2 relative">
                    <p className="font-semibold text-lg">Replying to {
                        replyMessage.senderId === uid() ? 'your self' : replyUserName 
                    }</p>
                    <p className="line-clamp-3 whitespace-pre-line">{replyMessage.msg}</p>
                    <button 
                        onClick={() => removeRelyMsg({})} // remove reply message
                        className="absolute top-0 right-0 text-slate-400 text-2xl active:scale-95 m-1.5"
                    >
                        <AiFillCloseCircle/>
                    </button>
                </div>}
            
            <div className="flex gap-x-2">
                <div className="flex-1 border-2 rounded-xl px-5 py-3 flex focus-within:border-app-primary">
                    <div 
                        ref={editorRef}
                        contentEditable='true'
                        spellCheck='true'
                        data-lexical-editor="true"
                        tabIndex='0'
                        role="textbox"
                        className="w-full text-xl outline-none max-h-80 overflow-x-auto"
                        onKeyDown={messageEditor}
                        onInput={getEditorInput}
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
                {
                    isEditorEmpty
                    ? <button 
                        onClick={sendmessage} 
                        className=" self-end rounded-xl w-[58px] h-[58px] grid place-content-center m-px"
                    >
                        <FaThumbsUp className="text-app-primary text-5xl"/>
                    </button>

                    : <button 
                        onClick={sendmessage} 
                        className="bg-app-primary self-end rounded-xl w-[58px] h-[58px] grid place-content-center m-px"
                    >
                        <IoIosSend className="text-white text-2xl"/>
                    </button>
                }
            </div>
        </div>
    );
};

export default MassageEditor;