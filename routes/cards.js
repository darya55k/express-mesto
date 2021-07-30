const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// Запрос списка карточек
router.get('/cards', getCards);

// Запрос на создание карточки
router.post('/cards', createCard);

// Запрос на удаление карточки
router.delete('/cards/:cardId', deleteCard);

// Запрос на добавление лайка карточке
router.put('/cards/:cardId/likes', likeCard);

// Запрос на удаление лайка с карточки
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
