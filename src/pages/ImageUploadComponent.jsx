import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase/firebaseConfig';
import imageFileReader from '../utils/imageFileReader';
import imageCompression from '../utils/imageCompression';
import { v4 as uuid } from 'uuid';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { localStorageAuthData } from '../utils/getLocalStorage';
import { uid } from '../firebase/realtimeDatabaseFunctions';

const storage = getStorage(app);

const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    imageFileReader(e.target, (data) => {
        imageCompression(data.imageData, 3024, ({blob}) => {
            setImage(blob);
        })
    })
  };

  const handleUpload = () => {
    const imagePath = '/profile/profile_picture'
    const uploadImgRef = () => ref(storage, uid + imagePath)
    const uploadImage = uploadBytesResumable(uploadImgRef() , image)

    uploadImage.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // console.log(progress)
        setProgress(progress);
      },
      (error) => {
        console.error(error.message);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
        .then((downloadUrl) => {
            console.log(downloadUrl)
        })
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <progress value={progress} max="100"/>
    </div>
  );
};

export default ImageUploadComponent;
