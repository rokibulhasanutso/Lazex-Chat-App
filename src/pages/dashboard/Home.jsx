import AdditonalPost from "../../components/PostContent/AdditonalPost";
import ImportantPost from "../../components/PostContent/ImportantPost";


const Home = () => {

    return (
        <div className="max-w-[700px] mx-auto">
            <div className="border border-slate-400 rounded-xl bg-white space-y-10">
                <div className="">
                    <p className="text-xl border-slate-300 rounded-md font-semibold text-slate-600 px-8 py-4">Importants for you</p>
                    <div className="grid grid-cols-2">
                        <ImportantPost/>
                        <ImportantPost/>
                        <ImportantPost/>
                        <ImportantPost/>
                        <ImportantPost/>
                    </div>
                </div>
                <div>
                    <p className="text-xl border-slate-300 rounded-md font-semibold text-slate-600 px-8 py-4">Feed news</p>
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