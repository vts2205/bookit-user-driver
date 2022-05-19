const express = require('express');

const verifyToken = require('../middlewares/token_verify')
// const verifyToken = require('./middlewares/token_verify')

const router  = express.Router();
// const multer  = require('multer')
// const upload = multer({ dest: './uploads' })
const registerdriverController = require('../controller/drivers/register');
const tripHistoryController = require('../controller/drivers/tripHistory');
const profileUpdateController = require('../controller/drivers/update_profile');
const passwordUpdateController = require('../controller/drivers/updatePassword');
// const uploadDocumentsController = require('../controller/drivers/documentUpload')
const tripHistoryCompletedController = require('../controller/drivers/completedTripHistory');
const tripCancelled = require('../controller/drivers/cancelledTripHistory')
const upComingTripController = require('../controller/drivers/upcomingTripHistory')
const carDocumentsControllers = require('../controller/drivers/carDocuments')
const driverDocumentsControllers = require('../controller/drivers/driverDocuments')
const ownerDocumentsControllers = require('../controller/drivers/ownerDocument')




// router.use('/user', require('../controller/users/register') )
console.log('entered')
router.post('/registerDriver', registerdriverController.registerDriver)
router.get('/tripHistory',verifyToken, tripHistoryController.tripHistory)
router.post('/updateProfile', profileUpdateController.updateProfile)
router.post('/updatePassword', passwordUpdateController.updatePassword)
// router.post('/uploadDocuments', uploadDocumentsController.documentsDriver)
router.get('/completedTrip', tripHistoryCompletedController.tripHistoryCompleted)
router.get('/cancelledTrip', tripCancelled.tripHistoryCancelled)
router.get('/upcomingTrip', upComingTripController.tripHistoryUpcoming)
router.post('/carDocuments',carDocumentsControllers.carDocuments)
router.post('/driverDocuments',driverDocumentsControllers.driverDocuments)
router.post('/ownerDocument',ownerDocumentsControllers.ownerDocuments)






module.exports = router