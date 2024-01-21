import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentAvatar, setProfilePicture } from '../../../../redux/slice/profileSlice';
import Cropper from 'react-easy-crop';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { BiSolidImage } from "react-icons/bi";
import cropImage from '../../../../utils/cropImage';
import imageFileReader from '../../../../utils/imageFileReader';
import imageCompression from '../../../../utils/imageCompression';
import { FiPlus } from 'react-icons/fi';
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { ref } from 'firebase/database';
import { app } from '../../../../firebase/firebaseConfig';
import { v4 as uuid } from 'uuid';

const ProfileImageSection = () => {

    const dispatch = useDispatch()
    const { profilePicture } = useSelector((state) => state.profileSet)
    const { currentAvatar, male, female } = useSelector((state) => state.profileSet.defaultAvater)

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedPixel, setCroppedPixel] = useState(null)

    const [imgUploadLoading, setImgUploadLoading] = useState(false)
    const [imgselectLoading, setImgselectLoading] = useState(false)

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedPixel(croppedAreaPixels)
    }, [])


    const handelImageCropped = () => {
        cropImage(
            currentAvatar,
            croppedPixel.x,
            croppedPixel.y,
            croppedPixel.width,
            croppedPixel.height
        )
    }

    const selectProfileImage = (event) => {
        imageFileReader(event.target, ({imageData}) => {
            imageCompression(imageData, 1024, ({data}) => {

                console.log(data)
                dispatch(changeCurrentAvatar(imageData))
                dispatch(setProfilePicture(imageData))
            })
        })
    }

    const handleChange = (e) => {
        imageFileReader(e.target, (data) => {
            imageCompression(data.imageData, 50, ({blob}) => {
                setImage(blob);
            })
        })
    };

    const handleUpload = () => {
        const uploadTask = uploadBytesResumable(ref(getStorage(app), uuid()), image)

        uploadTask.on(
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
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadUrl) => {
                    console.log(downloadUrl)
                })
            }
        );
    };

    return (
        <div className="w-[400px] h-auto relative">
            <div className="h-[300px] relative after:border-none">
                <Cropper
                    image={currentAvatar}
                    classes={{
                        containerClassName: 'rounded-md',
                        mediaClassName: '',
                        cropAreaClassName: 'rounded-full !text-app-primary/75 !border-8 after:!content-none before:!content-none',
                    }}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>

            {/* default avater list */}
            <div>
                <div className="my-10">
                    <div className="flex gap-4 flex-wrap justify-center h-[176px] overflow-y-scroll">
                        {/* image upload button card */}
                        <div
                            className="w-20 h-20 group/selectImg overflow-hidden bg-gray-50 hover:bg-indigo-100 border-2 border-gray-300 hover:border-app-primary cursor-pointer rounded-md"
                        >
                            <label htmlFor='uploadImage' className='cursor-pointer'>
                                <FiPlus className='m-auto h-full text-2xl text-gray-400 group-hover/selectImg:text-app-primary'/>
                            </label>
                            <input 
                                id="uploadImage" 
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                hidden
                                onChange={selectProfileImage}
                            />
                        </div>

                        {/* uploaded image card */}
                        {
                            [...profilePicture, ...female, ...male]
                                .filter(url => url !== currentAvatar)
                                .map((url, index) => (
                                    <div 
                                        key={index}
                                        className="w-20 h-20 overflow-hidden border-2 border-gray-300 hover:border-app-primary cursor-pointer rounded-md bg-white">
                                        <img
                                            src={url}
                                            onClick={() => dispatch(changeCurrentAvatar(url))}
                                            alt="Avater Image" 
                                            className="w-full h-auto"
                                            onDragStart={(event) => {event.preventDefault()}}
                                        />
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>

            {/* update and upload image button */}
            <div className=''>
                <button 
                    onClick={() => setImgUploadLoading(true)}
                    className='inline-block w-full px-6 cursor-pointer py-3 border-2 border-gray-300 hover:border-app-primary bg-gray-100 hover:bg-app-primary hover:text-white text-gray-500 transition-all font-semibold rounded-md'
                >
                    Update Image
                </button>
            </div>

            {/* image uploading on database presentational content */}
            <div className='absolute inset-0 backdrop-blur-sm bg-app-primary/75 rounded-md flex justify-center items-center'>
                <div className='w-28 h-28 bg-white p-4 rounded-full shadow-sm'>
                    <CircularProgressbarWithChildren 
                        value={progress} strokeWidth={10} 
                        styles={{path: {stroke: "#5F35F5"}}}
                    >
                        <span className='text-slate-500 font-semibold text-lg'>
                            {progress + '%'}
                        </span>
                    </CircularProgressbarWithChildren>
                </div>
            </div>
        </div>
    );
};

export default ProfileImageSection;