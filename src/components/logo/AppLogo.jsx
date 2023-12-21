
const AppLogo = ({size, className}) => {
    return (
        <div className={className}>
            <p 
                style={{fontSize: size || 24 }} 
                className={ `space-x-2 font-agbalumo` }
            >
                <span className="text-indigo-500 font-bold">Lazex</span>
                <span className="text-slate-400">CHAT</span>
                <span 
                    style={{width: (size / 4) || 6, height: (size / 4) || 6}} 
                    className="inline-block rounded-full bg-emerald-500"
                ></span>
            </p>
        </div>
        
    );
};

export default AppLogo;