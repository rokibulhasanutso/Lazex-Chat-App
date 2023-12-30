import AdditonalPost from "../../components/PostContent/AdditonalPost";


const Home = () => {

    return (
        <div className="max-w-[700px] mx-auto">
            <div className="border border-slate-400 rounded-xl bg-white">
                <p className="text-xl border-slate-300 rounded-md px-8 py-3 font-semibold text-slate-600">Importants for you</p>
                
                <div className="">
                    <AdditonalPost/>
                    <AdditonalPost/>
                    <AdditonalPost/>
                    <AdditonalPost/>
                    <AdditonalPost/>
                    <AdditonalPost/>
                    <AdditonalPost/>
                </div>

            </div>
        </div>
    )
};

export default Home;