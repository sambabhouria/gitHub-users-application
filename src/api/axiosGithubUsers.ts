import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.github.com/users',
    timeout: 10000,
})

export default instance
