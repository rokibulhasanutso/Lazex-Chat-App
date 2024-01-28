import ImageHeader from "./ImageHeader";

const ShortMessegeContent = ({photoUrl, name, shortMessage}) => {


    return (
        <div className="relative px-8 py-4 border-y hover:bg-white hover:after:absolute after:rounded-tr-md after:rounded-br-md after:bg-app-primary after:w-1 after:h-[calc(100%+2px)] after:z-10 after:-top-px after:-left-[2px]">
            <div className="flex items-center space-x-3 select-none cursor-pointer py-0.5 transition-all">
                {/* head image */}
                <ImageHeader size={'sm'} photoUrl={photoUrl} name={name}/>

                {/* message content */}
                <div className="px-2 py-1 flex-1">
                    <p className="font-semibold text-2xl">{name}</p>
                </div>
                <div className="items-stretch my-auto">
                    <span className="text-sm py-1.5 text-slate-500">12:42 PM</span>
                </div>
            </div>

            <p className="text-lg mt-2 leading-5 tracking-tight py-1 text-slate-600">{shortMessage}</p>
        </div>
    );
};

export default ShortMessegeContent;