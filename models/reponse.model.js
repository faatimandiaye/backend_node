const mongoose = require('mongoose')

const reponseSchema = new mongoose.Schema({
  contenu: {
    type: String,
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
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
  meilleure: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })

module.exports = mongoose.model('Reponse', reponseSchema)