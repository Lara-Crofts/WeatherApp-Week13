// const { response } = require("express")

const request = require('request')

const forecast = (latitude, longitude, callback) => {

const url = 'http://api.weatherstack.com/current?access_key=f8ca929f8e288969c5ddae9fa95b66d7&query=' + latitude + ',' + longitude + '&units=f'

request({ url: url, json: true }, (error, { body }) => {

    if (error) {
        callback('unable to connect to weather service', undefined)
    } else if (body.error) {
        //cordinates 
        callback('unable to find location', undefined)
    }
    else {
        callback(undefined, body.current.weather_descriptions[0] + '. it is currrently ' + body.current.temperature + ' degrees out. it feels like ' + body.current.feelslike + ' degrees out')
    }
})

}

//export the forecast function 

module.exports = forecast