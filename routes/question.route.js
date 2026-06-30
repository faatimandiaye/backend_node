const express = require('express');
const { creerQuestion, AfficherQuestions, AfficherQuestion, modifierQuestion, supprimerQuestion } = require('../controllers/question.controller');
const authMiddleware = require('../middleware/user.middleware');

const router = express.Router();

router.post('/', authMiddleware, creerQuestion);
router.get("/", AfficherQuestions);
router.get("/:id", AfficherQuestion);
router.put("/:id", authMiddleware, modifierQuestion);
router.delete("/:id", authMiddleware, supprimerQuestion);

module.exports = router;