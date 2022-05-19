const express = require('express');
const router  = express.Router();
const registerUserController = require('../controller/users/register');
const getallUserController = require('../controller/users/getalluserdetails');
const updateUserController = require('../controller/users/updateuser');
const createratingsController = require('../controller/users/create_ratings');
const averageratingsController = require('../controller/users/averageratings');
const updatepasswordController = require('../controller/users/updatepassword');
const bookinghistoryController = require('../controller/users/bookinghistroy');
const ippoPayController = require('../controller/users/ippopayOrder');
const tripRequestController = require('../controller/users/tripRequest');
// const tripHistoryController = require('../controller/users/tripHistroy');
const tripHistoryCompletedController = require('../controller/users/completedTripHistory');
const tripCancelled = require('../controller/users/cancelledTripHistory');
const upComingTripController = require('../controller/users/upcomingTripHistory');
const cronController = require('../controller/users/generateOtp');
const cancelBookingController = require('../controller/users/cancel_booking')




// router.use('/user', require('../controller/users/register') )
console.log('entered')
router.post('/register', registerUserController.registerUser)
router.get('/getAllUserDetails', getallUserController.getalluserdata)
router.post('/updateUser', updateUserController.updateuserprofile)
router.post('/create_ratings', createratingsController.createratings)
router.get('/averageratings', averageratingsController.averagratingscal)
router.post('/updatePassword', updatepasswordController.getpasswordupdate)
router.get('/bookingHistory', bookinghistoryController.userbookhistroy)
router.post('/ippopay', ippoPayController.ippopayorder)
router.post('/tripRequest',tripRequestController.tripRequest)
// router.get('/tripHistory',  tripHistoryController.tripHistory)
router.get('/completedHistory',tripHistoryCompletedController.tripHistoryCompleted)
router.get('/cancelHistory',tripCancelled.tripHistoryCancelled)
router.get('/upcomingHistory',upComingTripController.tripHistoryUpcoming)
router.post('/cronOtp', cronController.cronOTP)
router.post('/cancelBooking', cancelBookingController.cancelBooking )





module.exports = router