const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        const regex = /^https?:\/\/(www\.)?\d?[a-zA-Z-]+\.\w+([a-zA-Z/]+)?#?/;
        return regex.test(url); // если url не удовлетворяет условиям, вернётся false
      },
      message: 'Введите URL.', // когда validator вернёт false, будет использовано это сообщение
    },
  },
});

module.exports = mongoose.model('user', userSchema);
