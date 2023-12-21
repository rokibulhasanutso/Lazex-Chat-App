import ListComponent from './../../components/common/ListComponent';
import AddFriendButton from './../../components/button/AddFriendButton';

const Home = () => {

    return (
        <div className='ps-10 py-9 grid grid-cols-3 grid-rows-2 gap-6 mx-auto'>
        
            <ListComponent 
                name={'Rokibul Hasan'}
                title={'What\'s you today?'}
            >
                <AddFriendButton/>
            </ListComponent>
            <ListComponent 
                name={'Rokibul Hasan'}
                title={'What\'s you today?'}
            >
                <AddFriendButton/>
            </ListComponent>
            <ListComponent 
                name={'Rokibul Hasan'} 
                title={'What\'s you today?'}
            >
                <AddFriendButton/>
            </ListComponent>
            <ListComponent 
                name={'Rokibul Hasan'} 
                title={'What\'s you today?'}
            >
                <AddFriendButton/>
            </ListComponent>

        </div>
    )
};

export default Home;