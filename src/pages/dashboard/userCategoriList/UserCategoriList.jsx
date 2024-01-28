import { useState } from 'react';
import UserList from './container/UserList';
import FriendList from './container/FriendList';
import BlockList from './container/BlockList';

const UserCategoriList = () => {
    const [currentCategory, setCurrentCategory] = useState('users')


    return (
        <div className="w-full relative flex-1 overflow-auto border-2 border-slate-400 rounded-md bg-white">
            <div className="sticky top-0 bg-white z-[1]">
                <div className='flex justify-between my-2 text-slate-600'>
                    <button 
                        onClick={() => setCurrentCategory('users')}
                        className={`flex-1 px-4 py-2 border-b-2 ${currentCategory === 'users' ? 'border-slate-400' : ''} text-lg font-semibold`}
                    >
                        Users
                    </button>
                    <button 
                        onClick={() => setCurrentCategory('friends')}
                        className={`flex-1 px-4 py-2 border-b-2 ${currentCategory === 'friends' ? 'border-slate-400' : ''} text-lg font-semibold`}
                    >
                        friends
                    </button>
                    <button 
                        onClick={() => setCurrentCategory('block')}
                        className={`flex-1 px-4 py-2 border-b-2 ${currentCategory === 'block' ? 'border-slate-400' : ''} text-lg font-semibold`}
                    >
                        block
                    </button>
                </div>
            </div>
            
            { currentCategory === 'users' && <UserList/> }
            { currentCategory === 'friends' && <FriendList/> }
            { currentCategory === 'block' && <BlockList/> }
            

        </div>
    );
};

export default UserCategoriList;