var express = require('express');
var router = express.Router();
const userController = require('../controller/users.controller');
const jwt = require('../helper/jwt');

router.post('/', userController.createUser);
router.get('/', userController.getUser);
router.get('/search', jwt.verify, userController.searchUser);
router.put('/:id', jwt.verify, userController.UpdateUser);
router.delete('/:id', jwt.verify, userController.DeleteUser);

module.exports = router;
