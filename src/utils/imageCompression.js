
const imageCompression = (imageDataUrl, width, compressImageCallBack) => {

    // const image = new Image();
    const image = document.createElement('img');
    const canvas = document.createElement('canvas');

    image.src = imageDataUrl;

    image.onload = (event) => {
        const ratio = width / event.target.width;
        canvas.width = width
        canvas.height = event.target.height * ratio;

        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height)

        // const new_image = document.createElement('img');
        // new_image.src = context.canvas.toDataURL('image/jpeg', 90)
        context.canvas.toBlob((blob) => {
            compressImageCallBack({
                size: (blob.size / 1024).toFixed(2),
                blobUrl: URL.createObjectURL(blob),
                blob: blob,
                data: context.canvas.toDataURL('image/jpeg', 90)
                
            })
        }, 'image/jpeg', 100)

        // compressImageCallBack(imgdata)
    }
}

export default imageCompression