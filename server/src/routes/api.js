const express = require('express');
const router = express.Router();

const testAction = require('../actions/api/test');

router.get('/', testAction.home);

module.exports = router;