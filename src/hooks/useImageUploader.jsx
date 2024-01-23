import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { uid } from '../firebase/realtimeDatabaseFunctions';
import { app } from '../firebase/firebaseConfig';
import { useState } from 'react';
import imageCompression from '../utils/imageCompression';

const useImageUploader = () => {
    const [progress, setprogress] = useState(0)

    const uploadImageData = async (data, imagePath, imageName, sizeValue, index, sizeLength) => {  
        return await new Promise((resolve) => {
            imageCompression(data, sizeValue, ({blob}) => {

                const uploadImgRef = () => ref(getStorage(app), `${uid()}/${imagePath}/${imageName}`)
                const uploadImage = uploadBytesResumable(uploadImgRef() , blob)

                // upload of progress
                uploadImage.on( 'state_changed',
                    {
                        'next': (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setprogress(((index * 100) + progress) / sizeLength);
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
    }

    const uploadImage = async (imageContainer) => {
        const allSizeImageUrl = {}

        for(const index in Object.values(imageContainer.size)) {

            const key = Object.keys(imageContainer.size)[index]
            const value = Object.values(imageContainer.size)[index]
            const sizeLength = Object.values(imageContainer.size).length

            const data = await uploadImageData(
                imageContainer.image, 
                imageContainer.path,
                key, // object property name or image name
                value, // object property value or image size
                index,
                sizeLength
            )

            allSizeImageUrl[key] = data
        }

        return allSizeImageUrl
    }

    return {
        uploadImage,
        progress,
    };
};

export default useImageUploader;