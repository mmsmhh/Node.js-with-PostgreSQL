const express = require('express');

const router = express.Router();

const userRoutes = require('./user');

const agencyRoutes = require('./agency');

const isAuthenticated = require('../middlewares/isAuthenticated');


router.get('/health-check', isAuthenticated, (req, res) => res.sendStatus(200));

router.use('/user', userRoutes);

router.use('/agencies', isAuthenticated, agencyRoutes);


module.exports = router;
