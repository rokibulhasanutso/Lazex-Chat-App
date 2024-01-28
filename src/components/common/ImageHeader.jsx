
const ImageHeader = ({photoUrl, name, size, activity}) => {

    const nameFirstLetter = (name) => {
        if (typeof name === 'string' && name.length > 0) {
            return name.charAt(0).toUpperCase(); 
        } else {
            return null; 
        }
    }

    let convertedSize;

    if(size === 'xs') convertedSize = 'w-10 h-10'
    else if(size === 'sm') convertedSize = 'w-12 h-12'
    else if(size === 'md') convertedSize = 'w-14 h-14'
    else if(size === 'lg') convertedSize = 'w-16 h-16'
    else convertedSize = 'w-20 h-20'

    return (
        <div className="flex items-center">
            <div className="relative">
                <div className={`${convertedSize} ring-1 ring-offset-2 overflow-hidden rounded-full`}>
                    {
                        photoUrl 
                        ? <img src={photoUrl} alt="Post Image" />
                        : <div 
                            className="grid place-content-center h-full bg-slate-300 text-slate-700 font-semibold text-lg"
                        >
                            {nameFirstLetter(name)}
                        </div>
                    }
                </div>
                {/* Activity Indicator */}
                {activity && <span className="inline-block rounded-full absolute right-0 bottom-1 w-3 h-3 border border-white bg-green-500"></span>}
                
            </div>
        </div>
    );
};

ImageHeader.defaultProps = {
    activity: false
}

export default ImageHeader;