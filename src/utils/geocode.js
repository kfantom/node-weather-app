const request = require('request')

const geoCode = (address, callback) => {
    const geoCodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoia2dveWFsIiwiYSI6ImNrOXBzbTc0ZTBkZ3IzZXFoMTJvYmFqMWEifQ.uMT28iWNNfA2cHwPx_0P-w&limit=1"

    request({url: geoCodeURL, json: true}, (error, {body}) => {
        if (error) {
            callback('Failed to connect, Please check your network', undefined)
        } else if (body.features.length <=0 ) {
            callback('No address found for the search location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode