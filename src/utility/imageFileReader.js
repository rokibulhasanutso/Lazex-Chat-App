
const imageFileReader = (readedImage, callback) => {
    const imageBlob = readedImage.files[0];
    const reader = new FileReader();
    
    const imageProccess = {
        imageData: null,
        error: null
    }

    reader.onload = (event) => {
        imageProccess.imageData = event.target.result;
    }

    reader.onerror = () => {
        imageProccess.error = reader.error;
    }

    reader.readAsDataURL(imageBlob);

    reader.onloadend = () => {
        callback(imageProccess)
    }
}

export default imageFileReader;