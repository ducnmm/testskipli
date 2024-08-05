const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/CreateNewAccessCode', authService.createNewAccessCode);
router.post('/validate', authService.validateAccessCode);

module.exports = router;