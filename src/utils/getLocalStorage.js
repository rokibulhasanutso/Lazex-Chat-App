const getlocalStorage = () => {
    return JSON.parse(localStorage.getItem('lazex_user_info'))
}

export default getlocalStorage