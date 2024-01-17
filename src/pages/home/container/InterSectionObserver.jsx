import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid_v4 } from 'uuid'
import AdditonalPost from "./AdditonalPost";
import CreatePost from './CreatePost';

const InterSectionObserver = ({activeCreatePost, closeContent}) => {
    const [activeElement, setActiveElement] = useState(0)
    const revealContents = useRef()
    const createPostComponent = useRef()
    const postData = [...Array(10)];

    const handleReval = useCallback(() => {
        const nodeList = revealContents.current.querySelectorAll('.reveal')
        const contents = Array.from(nodeList)

        contents.find((element, index) => {
            const eleTopPosition = element.getBoundingClientRect().top
            const componentTopPosition = createPostComponent?.current?.getBoundingClientRect().top

            if (eleTopPosition >= 36) {
                if (activeCreatePost) {
                    const scrollTopPositon = document.documentElement.scrollTop
                    document.documentElement.scrollTop =  scrollTopPositon  + componentTopPosition - 36
                    setTimeout(() => {
                        document.documentElement.style.overflow = 'hidden'
                    }, 0);

                    window.removeEventListener('scroll', handleReval)
                }
                else {
                    setActiveElement(index)
                    document.documentElement.style.overflow = ''
                }
                return true;
            }
        })
    }, [activeCreatePost])

    useEffect(() => {

        handleReval() // initial time call this function
        window.addEventListener('scroll', handleReval)

        return () => {
            window.removeEventListener('scroll', handleReval)
        }
    }, [handleReval])

    
    return (
        <div className="flex justify-center relative mx-auto">
            <div className="bg-white" ref={revealContents}>
                {
                    postData.map((_, index) => (
                        <div 
                            key={uuid_v4()}
                            className={`reveal border-t first:border-t-0 border-slate-400 py-4 first:pt-0`}
                        >
                            {
                                activeCreatePost &&
                                activeElement === index && 
                                <CreatePost
                                    componentRef={createPostComponent} 
                                    closeContent={closeContent}
                                />
                            }
                            <AdditonalPost/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default InterSectionObserver;