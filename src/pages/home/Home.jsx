import AdditonalPost from "./container/AdditonalPost";
import ImportantPost from "./container/ImportantPost";
import HeadText from "../../components/common/HeadText";

const Home = () => {

    return (
        <div className="max-w-[700px] mx-auto">
            <div className="border border-slate-400 rounded-xl bg-white space-y-10">
                <div className="">
                    <HeadText name={'Importants for you'}/>
                    <div className="grid grid-cols-2">
                        <ImportantPost/>
                        <ImportantPost/>
                        <ImportantPost/>
                        <ImportantPost/>
                        <ImportantPost/>
                    </div>
                </div>
                <div>
                    <HeadText name={'Feed news'}/>
                    <div>
                        <AdditonalPost/>
                        <AdditonalPost/>
                        <AdditonalPost/>
                        <AdditonalPost/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;