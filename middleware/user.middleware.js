const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Accès refusé : token manquant' });
  }

  try {
    const token = authHeader.replace('Bearer ', '').trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérification importante
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Token invalide : id utilisateur manquant' });
    }

    req.user = {
      id: decoded.id
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};