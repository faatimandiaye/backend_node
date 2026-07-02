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
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-node.vercel.app",
  /^https:\/\/frontend-node.*\.vercel\.app$/, // autorise toutes les URLs preview Vercel
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.some((o) =>
          typeof o === "string" ? o === origin : o.test(origin)
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
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