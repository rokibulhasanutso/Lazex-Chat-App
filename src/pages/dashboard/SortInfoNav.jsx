import FriendRequestList from "./FriendRequestList";
import UserCategoriList from "./userCategoriList/UserCategoriList";

const SortInfoNav = () => {
    

    return (
        <div className="h-screen sticky top-0">
            <div className="py-9 w-[360px] h-full flex flex-col space-y-4">
                <FriendRequestList/>
                <UserCategoriList/>
            </div>
        </div>
    );
};

export default SortInfoNav;