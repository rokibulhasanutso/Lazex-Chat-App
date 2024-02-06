import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentProfilePicture, setProfilePicture } from '../../../../redux/slice/profileSlice';
import Cropper from 'react-easy-crop';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import cropImage from '../../../../utils/cropImage';
import imageFileReader from '../../../../utils/imageFileReader';
import { FiPlus } from 'react-icons/fi';
import useImageUploader from '../../../../hooks/useImageUploader';
import { update } from 'firebase/database';
import { dbImageRef, uid } from './../../../../firebase/realtimeDatabaseFunctions';

const ProfileImageSection = () => {

    const dispatch = useDispatch()
    const { profilePicture, currentProfilePicture, userProfilePicture } = useSelector((state) => state.profileSet)
    const { male, female } = useSelector((state) => state.profileSet.defaultAvater)

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedPixel, setCroppedPixel] = useState(null)

    const [imgUploadLoading, setImgUploadLoading] = useState(false)
    // const [imgselectLoading, setImgselectLoading] = useState(false)

    const { uploadImage, progress } = useImageUploader() // custom hook

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedPixel(croppedAreaPixels)
    }, [])

    const selectProfileImage = (event) => {
        imageFileReader(event.target.files[0], ({imageData}) => {
            dispatch(setProfilePicture(imageData))
        })
    }

    const imageUploadOnDatabase = async () => {
        setImgUploadLoading(true)

        const croppedImagedata = await cropImage(
            currentProfilePicture,
            croppedPixel.x,
            croppedPixel.y,
            croppedPixel.width,
            croppedPixel.height
        )

        // upload image on firebase storage
        // and set image link or profile picture link on firebase realtime database
        uploadImage({
            image: croppedImagedata.data,
            path: `${uid()}/profile_picture`,
            size: { sm: 64, md: 100, lg: 1024 },
        })
        .then((imageUrl) => {
            // update profile picture link on firebase realtime database
            update(dbImageRef(), imageUrl)
            .then(() => {
                setImgUploadLoading(false)
            })
            .catch((error) => {
                console.error('Error: ', error);
            })
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }

    // when unmound component then reset db profile picture
    useEffect(() => () => { 
        dispatch(changeCurrentProfilePicture(userProfilePicture?.lg))
    }, [userProfilePicture?.lg, dispatch])


    return (
        <div className="w-[400px] h-auto relative">
            <div className="h-[300px] relative after:border-none max-h-none">
                <Cropper
                    image={currentProfilePicture}
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
                                .filter(url => url !== currentProfilePicture)
                                .map((url, index) => (
                                    <div 
                                        key={index}
                                        className="w-20 h-20 overflow-hidden border-2 border-gray-300 hover:border-app-primary cursor-pointer rounded-md bg-white">
                                        <img
                                            src={url}
                                            onClick={() => dispatch(changeCurrentProfilePicture(url))}
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
            
            <div className={`${currentProfilePicture === userProfilePicture?.lg ? "select-none pointer-events-none" : ""}`}>
                <button 
                    onClick={imageUploadOnDatabase}
                    className='inline-block w-full px-6 cursor-pointer py-3 border-2 border-gray-300 hover:border-app-primary bg-gray-100 hover:bg-app-primary hover:text-white text-gray-500 transition-all font-semibold rounded-md'
                >
                    Update Image
                </button>
            </div>

            {/* image uploading on database presentational content */}
            {
                imgUploadLoading &&
                <div className='absolute inset-0 backdrop-blur-sm bg-app-primary/75 rounded-md flex justify-center items-center'>
                    <div className='w-28 h-28 bg-white p-4 rounded-full shadow-sm'>
                        <CircularProgressbarWithChildren 
                            value={progress} strokeWidth={10} 
                            styles={{path: {stroke: "#5F35F5"}}}
                        >
                            <span className='text-slate-500 font-semibold text-lg'>
                                {parseInt(progress) + '%'}
                            </span>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProfileImageSection;