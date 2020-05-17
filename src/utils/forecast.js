const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6075f4b067b7dc97f70c3497064aef1c&query=' + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Failed to connect, Please check your network', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' ,but it feels like 45 degree celcius.')
        }
    })
}


module.exports = forecast