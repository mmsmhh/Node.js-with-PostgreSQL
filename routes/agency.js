const express = require('express');
const agencyController = require('../controllers/agency.controller');
const router = express.Router();
const { validateBody, agencySchemas } = require('../middlewares/validation');


router.post('/create',validateBody(agencySchemas.createAgencySchema), agencyController.createAgency);

router.delete('/delete/:id', agencyController.deleteAgency);

router.patch('/update',validateBody(agencySchemas.updateAgencySchema), agencyController.updateAgency);

router.post('/assign',validateBody(agencySchemas.assignEmployeesToAgenciesSchema), agencyController.assignEmployeesToAgencies);

router.get('/', agencyController.getAgencies);

router.get('/employees/:id', agencyController.getEmployeesAgency);

module.exports = router;