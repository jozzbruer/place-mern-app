const axios = require('axios')
const HttpError = require('../models/http-error')

const API_KEY = 'AIzaSyBigSCAY-IVlp3H_FGgrJ6v9ln83VZ41eY'

function getCoordsForAddress(adress){

    return {
        lat: 40.7484474,
        lng: -73.9871516
    }
    // const response = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(adress)}&key=${API_KEY}`)
    // //console.log(response)
    
    // const data = response.data
    // if (!data || data.status === 'ZERO_RESULTS'){
    //     const error = new HttpError('Could not find location for this address', 422)
    //     throw error
    // }
    // const coordinates = data.results[0].geometry.location
    // return coordinates
}

module.exports = getCoordsForAddress