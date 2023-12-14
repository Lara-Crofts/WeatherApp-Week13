console.log('client side javascrupt file is loaded')

//fetch the weather forecast info to clientside javascript 
//use FETCH . not accesible through node.js. fetch is a function

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// //     // fetch json data, then run with .then
//     response.json().then((data) => {

//         console.log(data)
//     })

// })


//select our element from html 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message01')
const messageTwo = document.querySelector('#message02')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent browser from refreshing 

    const location = search.value //extract the input and storing in variable 

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    //challenge setup url to fetch 
fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
           }
        })
    })
})
