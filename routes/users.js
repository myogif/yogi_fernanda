var express = require('express');
var router = express.Router();
const userController = require('../controller/users.controller');


router.post('/', userController.createUser);
router.get('/', userController.getUser);
router.get('/search', userController.searchUser);
router.put('/:id', userController.UpdateUser);
router.delete('/:id', userController.DeleteUser);

module.exports = router;
