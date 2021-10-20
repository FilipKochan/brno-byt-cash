import axios from 'axios'
export default axios.create({
    baseURL: 'https://json-api-pokus.herokuapp.com/'
})