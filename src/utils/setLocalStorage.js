const setlocalStorage = (data) => {
    localStorage.setItem(
        'lazex_user_info', 
        JSON.stringify(data)
    );
}

export default setlocalStorage