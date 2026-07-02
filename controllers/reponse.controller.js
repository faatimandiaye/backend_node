const Reponse = require("../models/reponse.model");

const creerReponse = async (req, res) => {
  try {
    const questionId = req.params.id;

    const reponse = await Reponse.create({
      contenu: req.body.contenu,
      question: questionId,
      auteur: req.user.id,
    });

    res.status(201).json(reponse);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const AfficherReponses = async (req, res) => {
  try {
    const questionId = req.params.id;

    const reponses = await Reponse.find({
      question: questionId,
    }).populate("auteur", "nom email");

    res.status(200).json(reponses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const supprimerReponse = async (req, res) => {
  try {
    const reponse = await Reponse.findByIdAndDelete(req.params.id);

    if (!reponse) {
      return res.status(404).json({
        message: "Réponse introuvable",
      });
    }

    res.status(200).json({
      message: "Réponse supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  creerReponse,
  AfficherReponses,
  supprimerReponse,
};