import { useState } from "react";
import useImageUploader from "../../hooks/useImageUploader";
import imageFileReader from "../../utils/imageFileReader";

const Setting = () => {
    const {uploadImage, progress} = useImageUploader()

    const [imagefile, setImagefile] = useState(null)

    const handleChange = (e) => {
        imageFileReader(e.target.files[0], ({imageData}) => {
            setImagefile(imageData)
        })
    }

    const handleUpload = () => {
        uploadImage({
            image: imagefile,
            path: 'profile_picture',
            size: { sm: 64, md: 100, lg: 1024 },
        }).then((imageUrl) => {
            console.log(imageUrl)
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