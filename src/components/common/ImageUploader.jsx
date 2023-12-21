import { MdCloudUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showImageProfileModal } from "../../redux/slice/modalSlice";

const ImageUploader = ({className}) => {
    const dispatch = useDispatch()

    return (
        <>
            <div 
                onClick={() => dispatch(showImageProfileModal(true))}
                className={`absolute bg-black/25 inset-0 cursor-pointer ${className}`}
            >
                <MdCloudUpload 
                    className="text-2xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>
        </>
    );
};

export default ImageUploader;