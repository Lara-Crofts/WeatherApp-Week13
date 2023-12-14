// 1. initiate on terminal: npm init .....--initalize project and creates the package.json file... 
// 2. download on terminal: npm i postman-request .....from npm package .. after download do ctrl+c 
// 3. terminal: npm init -y ...to answer yes to all q's 
// 4. package.json file is generated 
// 5. terminal write: sudo npm i express@4.16.4 ... creates package-lock.json file and node_modules folder 

//***** EXPRESS DOCUMENTATION: https://expressjs.com/en/4x/api.html   */

// MAKE NOTESSSSS, ***** lesson #37
// DOWNLOADED NPM I HPS TO ACTUAL SRC FOLDER BC IF IN ROOT LIKE WEB SERVER.. IT IMPORRTS TO THERE OR THE WEATHER APP
// THUS CD INTO SRC FOLDER.. NPM I HPS THERE SO IT POPULATES NEW NODE/MODULES/PACKAGE=LOCK/PACKAGE.JSON WHICH HAS HBS DEPEDENCY
// to check make sure to NOT be in src folder, make sure to cd .. so you are in weatherapp root folder
// and then on terminal: nodemon src/app.js to sucessfully check if index.hbs work on main localhost:3000 page after removing index.html file 

// express helps to send back HTML

const path = require('path') 
const express = require('express') //library export.Express is actually a function, & we call it to create a new Express application.
const hbs = require('hbs')

const geocode = require('./utils/geocode') 
const forecast = require('./utils/forecast')


const app = express()


// define PATHS for EXPRESS config 
const publicDirectoryPath = path.join(__dirname, '../public')
//method to customize your server.. helps to show elements from HTML page .. localhost:3000/index.html
const viewPath = path.join(__dirname, "../templates/views") //customize View Directory 
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup HANDLEBARS ENGINE and views location
// set handlebar (hbs)
app.set('view engine', 'hbs')
app.set('views', viewPath) // custom view directory of hbs files
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// main index.hbs html page 
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app 2.0',
        name: 'angelina jolie'
    }) 
})

// about.hbs html page 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me..',
        name: 'billie eilish'
    }) 
})

// help.hbs html page 

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text..',
        title: 'Help Title',
        name: "Sansa Stark"
    }) 
})

// console.log(__dirname) // --> /Users/jessicacontrerasayala/Desktop/WeatherApp-Week14/web-server/src
// console.log(path.join(__dirname, '../public')) // --> /Users/jessicacontrerasayala/Desktop/WeatherApp-Week14/web-server/public

// HBS -------------------
// set helps to set a value, in this case to use hbs engine 
// app.set('view engine', 'hbs')

// app.get('', (req, res)  => {
//     res.render('index')
//     // render view for hbs index file 
// })

//           request, response 
//send html 
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })
// app.com
// app.com/help
// app.com/about 

// send JSON ...// no longer needed since html help and about html pages creted in public folder
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'jenna',
//         age: 27
//     }, {
//         name:'robin'
//     }])
// })



// app.get('/about', (req, res) => {
//     res.send('<h2>About</h2>')
// })

// example url: http://localhost:3000/weather?address=utah
// endpoint created. 
//an API endpoint is a specific location within an API that accepts requests and sends back responses

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }


    // challenge: wire up /weather
// 1. require goecode/forecast into app.js (top of page link to file directory)
// 2. use the address to geocode 
// 3. use the coordinates to get forecast
// 4. send back the real forecast & location 
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

            if (error) {
                return res.send({ error })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) { 
                    return res.send({ error })
                }

                // if successful 
                res.send( {
                    forecast: forecastData,
                    location,
                    // address is the key, and the actual location ex arizona would be the value 
                    address: req.query.address
                })
                  
            })
        
        })


    // res.send({
    //     forecast: 'It is snowing ',
    //     location: 'Colorado',
    //     address: req.query.address
    // })
})

//fixxxx with thisss 2morrow COMPARE
// geocode(req.query.address, (error, result) => {
//     if (error) {
//         return res.send({ error });
//     }

//     if (!result || !result.latitude || !result.longitude || !result.location) {
//         return res.send({
//             error: 'Unable to find location. Try another search'
//         });
//     }

//     const { latitude, longitude, location } = result;

//     forecast(latitude, longitude, (error, forecastData) => {
//         if (error) {
//             return res.send({ error });
//         }

//         res.send({
//             forecast: forecastData,
//             location,
//             address: req.query.address
//         });
//     });
// });
// })



// e-comm example: http://localhost:3000/products?search=games&ratings=5
// output on terminal with nodemon is: { search: 'games', ratings: '5' }
app.get('/products', (req, res) => {
// unsucessful response 
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    // sucessful response 
    console.log(req.query)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jessah',
        errorMessage: 'Help article not found'
    })
})

// more handlers
//match * with everything that has not been matched/handled so far 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jessa',
        errorMessage: 'Page not found'
    })
})

//------ 

app.listen(3000, () => {
    console.log('server is up on port 3000')
})

// check on server: node src/app.js
// check on browser: localhost:3000
// shut down with ctrl+c


//download handelbars npm:
//download hbs npm (helps read handlebars easier): https://www.npmjs.com/package/hbs --> sudo npm i hbs@4.0.1 --> creates