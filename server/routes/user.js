const express = require('express');
const router = express.Router();
const { signup, signin, getUser, updateUser, deleteUser} = require('../controllers/user');
const validateUser = require('../lib/validateUser');

router.post('/signup', signup);
router.post('/signin', signin);

router.get('/me', validateUser, getUser);
router.patch('/', validateUser, updateUser);
router.put('/', validateUser, updateUser);
router.delete('/', validateUser, deleteUser);

module.exports = router;