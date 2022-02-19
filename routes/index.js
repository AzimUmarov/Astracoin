const express = require('express');
const router = express.Router();
const auth = require('../controller/auth.js');
router.get('/users', auth.getUsers);
router.get('/oneUser', auth.getOneUser);
router.post('/login', auth.login);
router.post('/register', auth.register);
router.delete('/deleteUser', auth.deleteUser);
router.put('/updateUser', auth.updateUser);

module.exports = router;