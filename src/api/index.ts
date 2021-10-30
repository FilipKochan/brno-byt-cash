import axios from 'axios'
export const API_KEY = '6179190f8597142da1745b0f'
export default axios.create({
    baseURL: 'https://mancavecashflow-93a1.restdb.io/rest/',
    headers: {
        'cache-control': 'no-cache',
        'x-apikey': API_KEY
    }
})

export const memeapi = axios.create({
    baseURL: 'https://meme-api.herokuapp.com/'
})