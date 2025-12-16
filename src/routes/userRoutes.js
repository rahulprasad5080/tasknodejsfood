const express = require('express');
const router = express.Router();
const { getUsers, getUserProfile, createUser, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getUsers);
router.post('/', protect, admin, createUser);
router.delete('/:id', protect, admin, deleteUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
