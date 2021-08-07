const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

// Запрос списка карточек
module.exports.getCards = (req, res, next) => {
  Card.find({}).populate('owner')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

// Запрос на создание карточки
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

// Запрос на удаление карточки по идентификатору
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .catch(() => {
      throw new NotFoundError('Нет карточки с таким id');
    })
    .then((data) => {
      if (req.user._id === data.owner.toString()) {
        Card.findByIdAndRemove({ _id: data._id })
          .then(() => {
            res.status(200).send({ message: 'Карточка успешно удалена' });
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Вы не можете удалять карточки других пользователей');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Нет карточки с таким id');
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .catch(() => {
      throw new NotFoundError('Нет карточки с таким id');
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Нет карточки с таким id');
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .catch(() => {
      throw new NotFoundError('Нет карточки с таким id');
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Нет карточки с таким id');
      } else {
        next(err);
      }
    });
};
