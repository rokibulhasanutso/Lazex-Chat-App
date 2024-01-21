import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { uid } from '../firebase/realtimeDatabaseFunctions';
import { app } from '../firebase/firebaseConfig';
import { useState } from 'react';
import imageFileReader from '../utils/imageFileReader';
import imageCompression from '../utils/imageCompression';

const useImageUploader = () => {
    const [progress, setprogress] = useState(0)

    const uploadImageData = async (data, imagePath, imageName, size) => {  
        return await new Promise((resolve) => {
            imageFileReader(data, (returnData) => {
                imageCompression(returnData.imageData, size, ({blob}) => {

                    const uploadImgRef = () => ref(getStorage(app), `${uid}/${imagePath}/${imageName}`)
                    const uploadImage = uploadBytesResumable(uploadImgRef() , blob)

                    uploadImage.on( 'state_changed',
                        {
                            'next': (snapshot) => {
                                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                // console.log(progress)
                                setprogress(progress);
                            },

                            'error': (error) => {
                                console.error(error.message);
                            },

                            'complete': () => {
                                getDownloadURL(uploadImage.snapshot.ref)
                                .then((downloadUrl) => {
                                    resolve(downloadUrl)
                                })
                            }
                        }
                    );
                })
            })
        })
    }

    const uploadImage = async (imageContainer) => {
        const allSizeImageUrl = {}

        for(const index in Object.values(imageContainer.size)) {

            const key = Object.keys(imageContainer.size)[index]
            const value = Object.values(imageContainer.size)[index]

            const data = await uploadImageData(
                imageContainer.image, 
                imageContainer.path,
                key,
                value
            )

            allSizeImageUrl[key] = data
        }

        console.log(allSizeImageUrl)
    }

    return {
        uploadImage,
        progress,
    };
};

export default useImageUploader;