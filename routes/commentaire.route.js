const express = require('express');
const { creerReponse, AfficherReponses, supprimerReponse } = require('../controllers/reponse.controller');
const authMiddleware = require('../middleware/user.middleware');

const router = express.Router({ mergeParams: true });

router.post('/', authMiddleware, creerReponse);
router.get('/', AfficherReponses);
router.delete('/:id', authMiddleware, supprimerReponse);

module.exports = router;