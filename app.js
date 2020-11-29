const request = require('request');
const express = require('express');
const path = require('path');
const app = express()
const port = 3000

// view engine setup
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/sendWeatherAPI', (req, res) => {
    var options = {
        'method': 'GET',
        'url': 'http://dataservice.accuweather.com/currentconditions/v1/locationKey?locationKey=327328&apikey=TYPE_API_KEY_HERE',
        'headers': {
        }
      };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        const obj = JSON.parse(response.body);
        var weather = obj[0].WeatherText;
        var temp = obj[0].Temperature.Metric.Value;
        var degrees = obj[0].Temperature.Metric.Unit;
        var timestamp = obj[0].LocalObservationDateTime;
        var year = timestamp.substring(0,4);
        var month = timestamp.substring(5,7);
        var day = timestamp.substring(8,10);
        var time = timestamp.substring(11,16);
        var date = day + "-" + month + "-" + year;
        //console.log(typeof(timestamp));
        // res.send(weather);
        res.render('weather', { title: 'Weather App', weather: weather, temp: temp, degrees: degrees, time: time, date: date })
      });
})

app.get('/', (req, res) => {
    // var weather = "Partially Cloudy";
    //res.send(weather);
    res.render('index', { title: 'Weather App'})

  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

