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
import imageFileReader from "../../../utils/imageFileReader";
import imageCompression from "../../../utils/imageCompression";
import useImageUploader from "../../../hooks/useImageUploader";
import { useSelector } from "react-redux";

// component function 
const MassageEditor = ({convertionType, convertionId, replyMessage, removeRelyMsg}) => {
    const users = useSelector((state) => state.userCategoryList.userList)
    const [emojiOpen, setEmojiOpen] = useState(false)
    const [isEditorEmpty, setIsEditorEmpty] = useState(true)
    const [messageImage, setMessageImage] = useState(null)
    const [messageImageBlob, setMessageImageBlob] = useState(null)
    const [messageImageUploading, setMessageImageUploading] = useState(false)
    const emojiContentRef = useRef('') 
    const editorRef= useRef('') 
    const { uploadImage, progress } = useImageUploader() // custom hook

    const callUserName = (userId) => {
        const userData = users?.find(user => user.id === userId)
        const username = userData?.userInfo?.name

        return username
    }
    
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

    // get select image function
    const getSelectedImage = (event) => {
        imageFileReader(event.target.files[0], ({imageData}) => {
            imageCompression(imageData, 128, ({data}) => {
                setMessageImage(data)   // image show for which image get selected  
            })
            setMessageImageBlob(imageData)  // main file set message in message blob
        })
        event.target.value = null   // reset input image file
    }

    // cancel selected image of send for message image
    const cancelMessageImage = () => {
        setMessageImageBlob(null)
        setMessageImage(null)
    }

    // send message on database
    const sendmessage = async (defaultMessage) => {
        const key = push(ref(db)).key
        
        let chatPath;
        if (convertionType === 'single') {
            chatPath = convertionId
        }
        else if (convertionType === 'group') {
            chatPath = convertionId + '/chatlist'
        }

        // message selection here 
        let exactMessage;
        const WriteMsg = editorRef.current.innerText.trim()

        if (typeof defaultMessage === 'string') {
            exactMessage = defaultMessage
        }
        else if (WriteMsg) {
            exactMessage = WriteMsg
        }
        else {
            exactMessage = ''
        }

        // if image selected then frist upload image then sand message with image url
        let imageUrl = {};
        if (messageImageBlob) {
            setMessageImageUploading(true)

            // uploadImage is a custom hook
            // it get object argument for upload image 
            imageUrl = await uploadImage({ 
                image: messageImageBlob,
                path: `chat_image/${convertionId}/${key}`,
                size: { md: 512, lg: 1024 },
            })
            .then((imageUrl) => {
                return imageUrl
            })
            .catch((error) => {
                console.error('Error: ', error);
            })
        }

        // upload or send message on firebase realtime database
        update(ref(db, `chats/${convertionType}/${chatPath}/${key}`), {
            id: key,
            date: new Date().getTime(),
            senderId: uid(),
            message: exactMessage,
            msgImgUrl: Object.keys(imageUrl).length !== 0 ? imageUrl : null,
            read: false,
            replyMessage: replyMessage?.msg || null,
            isUpdate: true
        })
        .then(() => {
            setMessageImageUploading(false)     // imageUploading loading close
            cancelMessageImage()                // cancel selected image
            removeRelyMsg({})                   // close reply content for set empty object
            editorRef.current.innerHTML = ''    // clear editor input section
            setIsEditorEmpty(true)              // set confirmation editor is empty
        })
    }

    return (
        <div className="relative">
            {/* when upload image time show loading */}
            {
                messageImageUploading &&
                <div className="absolute grid place-content-center inset-0 z-50 backdrop-blur border rounded-2xl">
                    <p className="font-semibold">Please wait for image upload {progress}</p>
                </div>
            }

            {/* reply target message */}
            {
                Object.keys(replyMessage).length > 0 &&
                <div className="py-2 relative">
                    <p className="font-semibold text-lg">Replying to {
                        replyMessage.senderId === uid() ? 'your self' : callUserName(replyMessage.senderId) 
                    }</p>
                    <p className="line-clamp-3 whitespace-pre-line">{replyMessage.msg}</p>
                    <button 
                        onClick={() => removeRelyMsg({})} // remove reply message
                        className="absolute top-0 right-0 text-slate-400 text-2xl active:scale-95 m-1.5"
                    >
                        <AiFillCloseCircle/>
                    </button>
                </div>
            }

            {/* add image with message */}
            {
                messageImage && 
                <div className="m-1.5 space-y-2">
                    <p className="font-semibold text-slate-500 text-lg">Add image with message</p>
                    <div>
                        <div className="relative inline-block">
                            <div className="w-16 h-16 rounded-md object-center overflow-hidden">
                                <img src={messageImage} alt="Get message image" />
                            </div>
                            <button 
                                onClick={cancelMessageImage} // remove image
                                className="absolute -top-2 -right-2 text-slate-500 bg-white rounded-full shadow text-2xl active:scale-95 "
                            >
                                <AiFillCloseCircle/>
                            </button>
                        </div>
                    </div>
                </div>
            }
            
            {/* editor content or message input */}
            <div className="flex gap-x-2">
                <div className="flex-1 border-2 rounded-xl px-5 py-3 flex focus-within:border-app-primary">
                    {/* message editor */}
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
                        {/* get select image button */}
                        <div
                            className="text-slate-500"
                        >
                            <label htmlFor='uploadImage' className='cursor-pointer'>
                                <IoImageOutline className="text-3xl hover:text-app-primary"/>
                            </label>
                            <input 
                                id="uploadImage" 
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                hidden
                                onChange={getSelectedImage}
                            />
                        </div>

                        {/* emoji button */}
                        <div className="relative flex">
                            {/* emoji picker button */}
                            <button
                                onClick={() => setEmojiOpen(!emojiOpen)}
                                className="text-slate-500"
                            >
                                <GrEmoji className="text-3xl hover:text-app-primary"/>
                            </button>
                            
                            {/* emoji picker content */}
                            {emojiOpen &&
                            <div 
                                ref={emojiContentRef} 
                                className="border border-app-primary shadow-xl rounded-xl absolute z-30 bottom-0 -translate-y-14 left-full -translate-x-full"
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
                    isEditorEmpty && !messageImageBlob
                    ? <button 
                        onClick={() => sendmessage('thumbsup')} 
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