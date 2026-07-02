const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectBD = require("./config/db");

const userRoute = require("./routes/user.route");
const questionRoute = require("./routes/question.route");

dotenv.config();

const app = express();

// 🔌 Connexion base de données
connectBD();

// Middleware JSON
app.use(express.json());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-node.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes API
app.use("/api/questions", questionRoute);
app.use("/api/auth", userRoute);

// Test API
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon serveur");
});

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});