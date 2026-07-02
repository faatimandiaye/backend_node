const express = require("express");
const {
  creerQuestion,
  AfficherQuestions,
  AfficherQuestion,
  modifierQuestion,
  supprimerQuestion,
} = require("../controllers/question.controller");

const {
  creerReponse,
  AfficherReponses,
  supprimerReponse,
} = require("../controllers/reponse.controller");

const authMiddleware = require("../middleware/user.middleware");

const reponseRoute = require("./reponse.route");

const router = express.Router();

// =========================
//  QUESTIONS ROUTES
// =========================
router.post("/", authMiddleware, creerQuestion);
router.get("/", AfficherQuestions);
router.get("/:id", AfficherQuestion);
router.put("/:id", authMiddleware, modifierQuestion);
router.delete("/:id", authMiddleware, supprimerQuestion);

// =========================
// 🔹 RÉPONSES ROUTES (IMPORTANT)
// =========================
router.use("/:id/reponses", reponseRoute);

module.exports = router;