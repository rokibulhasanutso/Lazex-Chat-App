
const cropImage = async (image, cropX, cropY, cropWidth, cropHeight) => {
    
    // create New Image object
    const newImage = new Image();
    newImage.src = image;
    
    // create new canvas for new cropped area
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');

    canvas.width = cropWidth
    canvas.height = cropHeight

    canvasContext.drawImage(
        newImage,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
    )

    return await new Promise((resolve) => {
        canvasContext.canvas.toBlob((blob) => {
            resolve ({
                imageSize: ((blob.size / 1024) / 1024).toFixed(2) + ' MB',
                imageUrl: URL.createObjectURL(blob),
                blob,
                data: canvasContext.canvas.toDataURL('image/jpeg', 90)
            })
        }, 'image/jpeg', 100)
    })
    
}

export default cropImage