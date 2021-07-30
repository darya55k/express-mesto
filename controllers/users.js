const User = require('../models/user');

// Запрос списка пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).json({ message: `На сервере произошла ошибка: ${err.message}` }));
};

// Запрос информации о пользователе по id
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).json({ message: `Нет пользователя с таким id: ${err.message}` });
      } else {
        res.status(500).json({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
};

// Запрос на создание пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: `Переданы некорректные данные: ${err.message}` });
      } else {
        res.status(500).json({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
};

// Запрос на обновление информации в профиле
module.exports.updateProfileInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).json({ message: `Нет пользователя с таким id: ${err.message}` });
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ message: `Переданы некорректные данные: ${err.message}` });
      } else {
        res.status(500).json({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
};

// Запрос на обновление аватара пользователя
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).json({ message: `Нет пользователя с таким id: ${err.message}` });
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ message: `Переданы некорректные данные: ${err.message}` });
      } else {
        res.status(500).json({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
};
