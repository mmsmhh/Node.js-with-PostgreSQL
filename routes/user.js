const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

const { validateBody, employeeSchemas } = require('../middlewares/validation');



router.post('/authentication',validateBody(employeeSchemas.authenticationSchema), userController.authentication);
router.post('/registration',validateBody(employeeSchemas.registrationSchema), userController.registration);


module.exports = router;
