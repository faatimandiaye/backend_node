const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectBD = require("./config/db");
const userRoute = require('./routes/user.route');
const questionRoute = require('./routes/question.route');

dotenv.config();
const app = express();
connectBD();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`serveur démarré sur http://localhost:${PORT}`);
});

app.use('/api/auth', userRoute);
app.use('/api/questions', questionRoute);
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur');
});