import { useState } from "react";
import useImageUploader from "../../hooks/useImageUploader";

const Setting = () => {
    const {uploadImage, progress} = useImageUploader()

    const [imagefile, setImagefile] = useState(null)

    const handleChange = (e) => {
        setImagefile(e.target)
    }

    const handleUpload = () => {
        uploadImage({
            image: imagefile,
            path: 'profile_picture',
            size: { sm: 64, md: 100, lg: 1024 },
        })
    }

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <progress value={progress} max="100"/>
        </div>
    );
};

export default Setting;