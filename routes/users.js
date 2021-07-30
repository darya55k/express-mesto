const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfileInfo, updateAvatar,
} = require('../controllers/users');

// Запрос списка пользователей
router.get('/users', getUsers);

// Запрос информации о пользователе по id
router.get('/users/:userId', getUserById);

// Запрос на создание пользователя
router.post('/users', createUser);

// Запрос на обновление информации в профиле
router.patch('/users/me', updateProfileInfo);

// Запрос на обновление аватара пользователя
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
