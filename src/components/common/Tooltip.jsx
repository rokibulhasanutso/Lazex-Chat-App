
const ToolTip = ({target, children}) => {
    return (
        <div className={`${target} hidden absolute -top-full left-1/2 -translate-x-1/2`}>
            <div className='rounded-full py-1 px-3 bg-gray-500 text-white'>
                <div className="flex">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ToolTip;