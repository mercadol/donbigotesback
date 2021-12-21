const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/sigup', AuthController.sigup);
router.post('/sigin', AuthController.sigin);

module.exports = router;

