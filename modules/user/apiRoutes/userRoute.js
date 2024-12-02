const express = require('express');
const { addUser, getUser,  } = require('../controllers/userController');
const router = express.Router();
const authMiddlewere = require('../../../middlewares/authMiddleware');
router.post('/insert', addUser);       // Route to create a new user
router.get('/getall', getUser);        // Route to get a user by ID

module.exports = router;