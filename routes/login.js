var express = require('express');
var router = express.Router();
const login = require('../controller/login.controller');


router.post('/', login.login);

module.exports = router;
