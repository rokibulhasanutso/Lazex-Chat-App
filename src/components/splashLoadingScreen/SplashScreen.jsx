import AppLogo from '../logo/AppLogo';

const SplashScreen = () => {
    return (
        <div className='w-screen h-screen bg-white flex flex-col justify-center items-center'>
            <div className='flex-1'>
                <div className='flex flex-col justify-center h-full'>
                    <img src="/src/assets/logo/logo.svg" alt="" className='mx-auto w-40' />
                    <p className='text-slate-400 font-semibold text-lg mt-10'>
                        Please wait. Your profile is being prepared for you....
                    </p>
                </div>
            </div>
            <div className='my-8'>
                <p className='text-slate-500 font-semibold text-lg text-center -mb-1.5'>form</p>
                <AppLogo size={24} className={'flex justify-center'}/>
            </div>
        </div>
    );
};

export default SplashScreen;