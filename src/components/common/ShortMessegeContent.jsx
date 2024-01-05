const ShortMessegeContent = ({photoUrl, name, shortMessage}) => {

    const nameFirstLetter = (name) => {
        if (typeof name === 'string' && name.length > 0) {
            return name.charAt(0).toUpperCase(); 
        } else {
            return null; 
        }
    }

    return (
        <div className="flex space-x-3 hover:bg-slate-100 select-none cursor-pointer px-6 hover:py-2 py-0.5 transition-all">
            <div className="flex items-center">
                <div className="relative">
                    <div className="w-12 h-12 ring-1 ring-offset-2 overflow-hidden rounded-full">
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
                    <span className="inline-block rounded-full absolute right-0 bottom-1 w-3 h-3 border border-white bg-green-500"></span>
                </div>
            </div>
            <div className="px-2 py-1">
                <div className="flex space-x-2">
                    <p className="font-semibold">{name}</p>
                </div>
                <p className="text-base leading-5 tracking-tight py-1 text-slate-600">{shortMessage}</p>
            </div>
            <div>
                <p className="text-sm py-1.5 text-slate-500">12:42 PM</p>
            </div>
        </div>
    );
};

export default ShortMessegeContent;