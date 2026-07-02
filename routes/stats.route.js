const express = require('express');
const { AfficherStats } = require('../controllers/stats.controller');

const router = express.Router();

router.get('/', AfficherStats);

module.exports = router;