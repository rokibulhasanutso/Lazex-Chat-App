import HeadText from "../../components/common/HeadText";
import ShortMessegeContent from "../../components/common/ShortMessegeContent";

const SortInfoNav = () => {
    return (
        <div className="h-screen sticky top-0">
            <div className="py-9 h-full">
                <div className="w-[360px] h-full border-2 border-slate-400 rounded-md bg-white">
                    <div className="">
                        <HeadText name={'Messages'} padding={'px-6 py-3'}/>
                        <div className="">
                            <ShortMessegeContent 
                                name={'Rokibul Hasan'}
                                photoUrl={'/app_Images/profile_picture.jpg'}
                                shortMessage={'I send you a messages'}
                            />
                            <ShortMessegeContent 
                                name={'Rokibul Hasan'}
                                photoUrl={'/app_Images/profile_picture.jpg'}
                                shortMessage={'I send you a messages'}
                            />
                            <ShortMessegeContent 
                                name={'Rokibul Hasan'}
                                photoUrl={'/app_Images/profile_picture.jpg'}
                                shortMessage={'I send you a messages'}
                            />
                            <ShortMessegeContent 
                                name={'Rokibul Hasan'}
                                photoUrl={'/app_Images/profile_picture.jpg'}
                                shortMessage={'I send you a messages'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortInfoNav;