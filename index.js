const axios = require('axios')
const db = axios.create({
    baseURL: 'https://mancavecashflow-93a1.restdb.io/rest/'
})

// db.get('/accounts', {
//     headers: {
//         'cache-control': 'no-cache',
//         'x-apikey': '6599aa8395b22539ee274e6a332187b19c075'
//     }
// }).then(res => console.log(res.data)).catch(err => console.log(err))

// const data = JSON.stringify({
//     'created': '420',
//     'cost': 300,
//     'desc': 'description',
//     'date': 'zitra'
// })

// db.post('/transactionhistory', data, {
//     headers: {
//         'cache-control': 'no-cache',
//         'x-apikey': '6599aa8395b22539ee274e6a332187b19c075'
//     },
// }).then(res => console.log(res.data)).catch(err => console.log(err))

// db.put('/transactionhistory/617909d5e524c82b001604ae', data, {
//     headers: {
//         'content-type': 'application/json',
//         'cache-control': 'no-cache',
//         'x-apikey': '6599aa8395b22539ee274e6a332187b19c075'
//     }
// }).then(res => console.log(res.data)).catch(err => console.log(err))

// db.get('/transactionhistory/6179096ce524c82b001604a1', {
//     headers: {
//         'content-type': 'application/json',
//         'cache-control': 'no-cache',
//         'x-apikey': '6599aa8395b22539ee274e6a332187b19c075'
//     }
// }).then(res => console.log(res.data))

// db.get('/transactionhistory', {
//     headers: {
//         'content-type': 'application/json',
//         'cache-control': 'no-cache',
//         'x-apikey': '6599aa8395b22539ee274e6a332187b19c075'
//     }
// }).then(res => console.log(res.data))