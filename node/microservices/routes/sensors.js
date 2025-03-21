let express = require('express'); // imports Express framework to create routes and handle requests
let router = express.Router(); // creates a mini router which can be used to define API endpoints(GET,POST)

/* Route to receive sensor data (acceleromter & heart rate)*/
router.post('/sensor-data', async function (req, res, next) { //defines post route at "/sensor-data"// async keyword, allows handling of asynchronous operations e.g database queries
    try {
        const { accelerometer, heartrate } = req.body; // Extracts values (accelerometer & heart rate) from the incoming JSON body of the request.

        if (!accelerometer || !heartrate) { // Condition to check if either accelerometer or heartrate is missing or null. !accelerometer returns true if the accelerometer data is missing, and !heartrate returns true if heart rate data is missing.
            return res.status(400).json({ error: 'No accelerometer data or heart rate data' }); // stops request and sends 400 status code Bad Request error. sends JSON responce with error message
        }

        console.log('Received Sensor Data', { accelerometer, heartrate }); // Logs the received data to the console for debugging purposes.

        //Process data here

        res.json({ message: 'Sensor data received successfully' }); // Sends a successful JSON response back to the client to confirm the data was received correctly.

        /* Part of Try catch statement to handle errors inside async function.
           If an error occurs in the try block, the catch block catches it and
           passes the error to Express’s built-in error handler using next(error).
           Express automatically processes it and sends a standard error response to the client.
        */
    } catch (error) {  
        next(error);  
    }
});

module.exports = router;