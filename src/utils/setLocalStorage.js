const setlocalStorage = (data) => {
    localStorage.setItem(
        'lazex_user', 
        JSON.stringify(data)
    );
}

export default setlocalStorage