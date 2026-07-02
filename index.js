const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectBD = require("./config/db");

const userRoute = require("./routes/user.route");
const questionRoute = require("./routes/question.route");
const statsRoute = require("./routes/stats.route");

dotenv.config();

const app = express();

connectBD();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-node.vercel.app",
  /^https:\/\/frontend-node.*\.vercel\.app$/,
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

app.use("/api/questions", questionRoute);
app.use("/api/auth", userRoute);
app.use("/api/stats", statsRoute);

app.get("/", (req, res) => {
  res.send("Bienvenue sur mon serveur");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});