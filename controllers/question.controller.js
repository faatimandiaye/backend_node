const Question = require('../models/question.model');

exports.creerQuestion = async (req, res) => {
    try {
        const { titre, description, tags } = req.body;
      
        const question = await Question.create({
            titre,
            description,
            auteur: req.user.id,
            tags
        });
        res.status(201).json({message:'Quéstion créer avec succés' , question});
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
};

exports.AfficherQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate("auteur", "nom email") 
            .sort({ createdAt: -1 }); 

        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.AfficherQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
            .populate("auteur", "nom email");

        if (!question) {
            return res.status(404).json({ message: "Question introuvable" });
        }

        res.status(200).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.modifierQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: "Question introuvable" });
        }

        if (question.auteur.toString() !== req.user.id) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier cette question" });
        }

        const { titre, description, tags } = req.body;

        question.titre = titre ?? question.titre;
        question.description = description ?? question.description;
        question.tags = tags ?? question.tags;

        await question.save();

        res.status(200).json({ message: "Question modifiée avec succès", question });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.supprimerQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: "Question introuvable" });
        }

        if (question.auteur.toString() !== req.user.id) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cette question" });
        }

        await question.deleteOne();

        res.status(200).json({ message: "Question supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.voterQuestion = async (req, res) => {
    try {
        const { valeur } = req.body;

        if (![1, -1].includes(valeur)) {
            return res.status(400).json({ message: "Valeur de vote invalide (doit être 1 ou -1)" });
        }

        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: "Question introuvable" });
        }

        const userId = req.user.id;

        const voteExistant = question.votants.find(
            (v) => v.utilisateur.toString() === userId
        );

        if (voteExistant) {
            if (voteExistant.valeur === valeur) {
                question.votes -= valeur;
                question.votants = question.votants.filter(
                    (v) => v.utilisateur.toString() !== userId
                );
            } else {
                question.votes += valeur * 2;
                voteExistant.valeur = valeur;
            }
        } else {
            question.votes += valeur;
            question.votants.push({ utilisateur: userId, valeur });
        }

        await question.save();

        res.status(200).json({
            message: "Vote enregistré",
            votes: question.votes,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};