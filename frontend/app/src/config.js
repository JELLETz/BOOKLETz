const config = {
    apiPath : 'http://localhost:3003',
    headers: () => {
        return {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
    }
}

export default config;