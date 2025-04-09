const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/useController');
const auth = require('../middlewares/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', auth, getUsers);

module.exports = router;