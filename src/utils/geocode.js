// --------------------------------------------------- callbacks

const request = require('request');

const geocode = (address, callback) => {

    // ? becomes %3F
    // this is error handling.. need `` for api 
    const url = `http://api.positionstack.com/v1/forward?access_key=8bf39b715a780cb3c5a868f19d6a97e3&query=${encodeURIComponent(address)}&bbox_module=1`;

    // const url = 'http://api.positionstack.com/v1/forward' + encodeURIComponent(address) + '?access_key=8bf39b715a780cb3c5a868f19d6a97e3&query=Phoenix,Arizona&bbox_module=1';
request({ url: url, json: true }, (error, { body }) => {
    // console.log('API Response:', response.body); // Log the entire API response for inspection

    if (error) {
        callback('unable to connect to location services', undefined);
    } else if (!body || !body.data || body.data.length === 0) {
        callback('Unable to find location. Try another search', undefined);
    } else {
        // Only log the desired information in the callback
        callback(undefined, {
            latitude: body.data[0].latitude,
            longitude: body.data[0].longitude,
            location: body.data[0].label
        });
        
    }
});
};
//access to results ... common convention to use (error, data) 
// geocode('Phoenix, Arizona', (error, data) => {
//     // Only log the 'Data' output if there is no error
//     if (!error) {
//         console.log('Data', data);
//     } else {
//         console.log('Error', error);
//     }
// });

module.exports = geocode
