import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentAvatar, setProfilePicture } from '../../../../redux/slice/profileSlice';
import Cropper from 'react-easy-crop';
import { BiSolidImage } from "react-icons/bi";
import cropImage from '../../../../utils/cropImage';
import imageFileReader from '../../../../utils/imageFileReader';
import imageCompression from '../../../../utils/imageCompression';

const ProfileImageSection = () => {

    const dispatch = useDispatch()
    const { profilePicture } = useSelector((state) => state.profileSet)
    const { currentAvatar, male, female } = useSelector((state) => state.profileSet.defaultAvater)

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedPixel, setCroppedPixel] = useState(null)

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

    const UploadProfileImage = (event) => {
        imageFileReader(event.target, ({imageData}) => {

            dispatch(changeCurrentAvatar(imageData))
            dispatch(setProfilePicture(imageData))
        })
    }

    return (
        <div className="w-[400px] h-auto">
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

            <button 
                onClick={handelImageCropped}
                className="border rounded-md">
                CropImage
            </button>

            {/* default avater list */}
            <div>
                <div className="my-6">
                    <div className="flex gap-4 flex-wrap justify-center h-[176px] overflow-y-scroll">
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

                {/* image upload button */}
                <div className="text-center">
                    
                    <label 
                        htmlFor="uploadImage"
                        className="inline-block leading-3 space-x-2 px-6 cursor-pointer py-3 border border-app-primary bg-indigo-50 text-app-primary active:bg-indigo-300 hover:border-transparent hover:bg-app-primary hover:text-white transition-all font-semibold rounded-md"   
                    >   
                        <BiSolidImage className='inline-block text-2xl align-middle'/>
                        <span className='align-middle'>Scelect Image</span>
                    </label>
                    <input 
                        id="uploadImage" 
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        hidden
                        onChange={UploadProfileImage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileImageSection;