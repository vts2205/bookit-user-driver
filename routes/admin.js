const express = require('express');
const router = express.Router();
const subAdminRegister = require('../controller/admin/subAdminDriver');
const subCarDocuments = require('../controller/admin/carDocuments')
const subOwnerDocuments = require('../controller/admin/ownerDocuments')
const subDriverDocuments = require('../controller/admin/driverDocuments')
const addDriverController = require('../controller/admin/addDriver')
const driverApprovalController = require('../controller/admin/driverApproval')
const approvedListController = require('../controller/admin/approvedList')
const rejectedListController = require('../controller/admin/rejectedDrivers')
    // const rejectedListController = require('../controller/admin/rejectedDrivers')
const rejectedExcelController = require('../controller/admin/exportRejectedExcel')
const pendingExcelController = require('../controller/admin/exportPendingList')
const confirmedExcelController = require('../controller/admin/exportConfirmedList')
const searchController = require('../controller/drivers/seach')



router.post('/subadminRegister', subAdminRegister.subAdminDriver)
router.get('/carDocuments', subCarDocuments.subAdminCar)
router.get('/ownerDocuments', subOwnerDocuments.subAdminOwner)
router.get('/driverDocuments', subDriverDocuments.subAdminDriver)
router.get('/addDriver', addDriverController.addDriver)
router.post('/driverApproval', driverApprovalController.driverApproval)
router.get('/approvedList', approvedListController.approvedList)
router.get('/rejectedList', rejectedListController.rejectedList)

router.get('/rejectedExcel', rejectedExcelController.rejectedList)
router.get('/pendingExcel', pendingExcelController.pendingList)
router.get('/confirmedExcel', confirmedExcelController.confirmedList)
router.get('/search', searchController.search)








module.exports = router