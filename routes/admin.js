const express = require('express');
const router  = express.Router();
const subAdminRegister = require('../controller/admin/subAdminDriver');
const subCarDocuments = require('../controller/admin/carDocuments')
const subOwnerDocuments = require('../controller/admin/ownerDocuments')
const subDriverDocuments = require('../controller/admin/driverDocuments')
const addDriverController = require('../controller/admin/addDriver')
const driverApprovalController = require('../controller/admin/driverApproval')





router.post('/subadminRegister', subAdminRegister.subAdminDriver)
router.get('/carDocuments', subCarDocuments.subAdminCar)
router.get('/ownerDocuments', subOwnerDocuments.subAdminOwner)
router.get('/driverDocuments', subDriverDocuments.subAdminDriver)
router.get('/addDriver', addDriverController.addDriver)
router.post('/driverApproval',driverApprovalController.driverApproval)







module.exports = router