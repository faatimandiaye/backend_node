const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  votants: [{
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valeur: { type: Number, enum: [1, -1] },
  }],
  resolu: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })

module.exports = mongoose.model('Question', questionSchema)