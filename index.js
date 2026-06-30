const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectBD = require("./config/db");
const userRoute = require('./routes/user.route');
const questionRoute = require('./routes/question.route');
const reponseRoute = require('./routes/reponse.route');

dotenv.config();
const app = express();
connectBD();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'https://frontend-node.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/auth', userRoute);
app.use('/api/questions', questionRoute);
app.use('/api/questions/:questionId/reponses', reponseRoute);

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`serveur démarré sur http://localhost:${PORT}`);
});