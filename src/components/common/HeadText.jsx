
const HeadText = ({name, padding, size}) => {
    return (
        <p className={`${size ? size : 'text-xl'} ${padding ? padding : 'px-8 py-4'} font-semibold text-slate-600`}>
            {name}
        </p>
    );
};

export default HeadText;