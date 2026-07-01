const Reponse = require('../models/reponse.model');

exports.creerReponse = async (req, res) => {
    try {
        const { contenu } = req.body;
        const { questionId } = req.params;

        const reponse = await Reponse.create({
            contenu,
            auteur: req.user.id,
            question: questionId,
        });

        const reponsePopulee = await reponse.populate("auteur", "nom email");

        res.status(201).json({ message: "Réponse publiée avec succès", reponse: reponsePopulee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.AfficherReponses = async (req, res) => {
    try {
        const { questionId } = req.params;

        const reponses = await Reponse.find({ question: questionId })
            .populate("auteur", "nom email")
            .sort({ createdAt: 1 });

        res.status(200).json(reponses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.supprimerReponse = async (req, res) => {
    try {
        const reponse = await Reponse.findById(req.params.id);

        if (!reponse) {
            return res.status(404).json({ message: "Réponse introuvable" });
        }

        if (reponse.auteur.toString() !== req.user.id) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cette réponse" });
        }

        await reponse.deleteOne();

        res.status(200).json({ message: "Réponse supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};