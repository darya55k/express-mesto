const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getCurrentUser, getUserById, updateProfileInfo, updateAvatar,
} = require('../controllers/users');

// Запрос списка пользователей
router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

// Запрос информации о пользователе по id
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfileInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i),
  }),
}), updateAvatar);

module.exports = router;
