const getlocalStorage = () => {
    return JSON.parse(localStorage.getItem('lazex_user'))
}

export default getlocalStorage