const cron = require('node-cron')
const request = require('request')


 cron.schedule('* * * * *', function () {
    console.log('inside cronjob otp')
    try {
    //   request('http://localhost:' + process.env.SERVER_PORT + '/api/mobile/user/cronOtp', function (error, response, body) {
        request('http://localhost:9200'  + '/api/mobile/user/cronOtp', function (error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(body) // Print the google web page.
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, true)