import ImageHeader from "../../../components/common/ImageHeader";

const ChatViewContent = () => {
    return (
        <div className="h-full flex flex-col justify-end px-8">
            <div className="flex justify-end items-end gap-x-4 my-2">
                <p className="bg-app-primary text-white px-5 mb-3 py-3 max-w-sm rounded-3xl rounded-br-none relative">
                    hello
                </p>
                <ImageHeader size={'xs'} activity={false} />
            </div>
            <div className="flex items-end gap-x-4 my-2">
                <ImageHeader size={'xs'} activity={false} />
                <p className="bg-gray-200 border px-5 mb-3 py-3 max-w-sm rounded-3xl rounded-bl-none relative">
                    hello
                </p>
            </div>
        </div>
    );
};

export default ChatViewContent;