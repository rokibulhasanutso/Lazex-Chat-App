const ConfirmationModal = ({action, modalClose, msg}) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/75 z-[9999]">
            <div className="md:w-[500px] h-[300px] w-full">
                <div className="bg-white p-8 rounded-md h-full flex justify-center flex-col">
                    <p className="text-center text-2xl text-slate-500 ">{msg}</p>
                    <div className="flex justify-center gap-5 mt-10">
                        <button
                            onClick={() => modalClose(false)}
                            className="bg-app-primary font-semibold px-6 py-2 text-white rounded-md"
                        >
                            No
                        </button>
                        <button
                            onClick={() => { action(false); modalClose(false) }}
                            className="bg-white border border-gray-500 hover:border-transparent font-semibold hover:bg-slate-200 px-6 py-2 rounded-md"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;