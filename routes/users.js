var express = require('express');
var router = express.Router();
const userController = require('../controller/users.controller');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/', userController.createUser);
router.get('/', userController.getUserByidentityNumber);
module.exports = router;
