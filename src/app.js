const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode'),
      forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

// path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handle bar and view location
app.set('views', viewDirectoryPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kanak Goyal'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kanak Goyal'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kanak Goyal'
    });
});

app.get('/weather', (req, res) => {
    if (req.query.address) {
        geocode(req.query.address, (geocodeErr, geocodeData)=> {
            if (geocodeErr) {
                return res.send({
                    error: geocodeErr
                });
            } else {
                forecast(geocodeData.latitude, geocodeData.longitude, (forecastErr, forecastData) => {
                    if (forecastErr) {
                        return res.error({
                            error: forecastErr
                        });
                    } else {
                        return res.send({
                            forecast: forecastData,
                            location: geocodeData.location,
                            address: req.query.address,
                            latitude: geocodeData.latitude,
                            longitude: geocodeData.longitude
                        });
                    }
                })
            }
        })
        // return res.send({
        //     forecast: 'It is normal',
        //     location: 'Hard Coded dummy data',
        //     address: req.query.address
        // });
    } else {
        return res.send({
            error: 'Address is mandatory'
        });
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kanak Goyal',
        errorMsg: 'Article does not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kanak Goyal',
        errorMsg: 'Page Not Found'
    });
});

app.listen(port,() => {
    console.log('Server is running on port ' + port);
});