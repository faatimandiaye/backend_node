const Question = require('../models/question.model');
const Reponse = require('../models/reponse.model');
const User = require('../models/user.model');

exports.AfficherStats = async (req, res) => {
    try {
        const [nbQuestions, nbReponses, nbMembres] = await Promise.all([
            Question.countDocuments(),
            Reponse.countDocuments(),
            User.countDocuments(),
        ]);

        res.status(200).json({
            questions: nbQuestions,
            reponses: nbReponses,
            membres: nbMembres,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};