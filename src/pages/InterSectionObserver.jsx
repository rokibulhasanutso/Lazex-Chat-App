import { useEffect, useRef} from "react";
import AdditonalPost from "./home/container/AdditonalPost";

const InterSectionObserver = () => {
    const revealContents = useRef()

    const handleReval = () => {
        // const innerheight = window.innerHeight
        const elements = revealContents.current.querySelectorAll('.reveal')

        const contents = []
        elements.forEach(ele => {
            contents.push(ele)
            ele.classList.remove('active', 'border-2', 'border-app-primary')
        })

        const findElement = contents.find((element) => {
            const eleTopPosition = element.getBoundingClientRect().top
            return eleTopPosition >= 36
        })

        findElement.classList.add('active', 'border-2', 'border-app-primary')
    }

    useEffect(() => {

        handleReval()

        window.addEventListener('scroll', handleReval)

        return () => {
            window.removeEventListener('scroll', handleReval)
        }
    }, [])

    

    return (
        <div className="app max-w-[680px] mx-auto" ref={revealContents}>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
            <div className="reveal"><AdditonalPost/></div>
                    
        </div>
    );
};

export default InterSectionObserver;