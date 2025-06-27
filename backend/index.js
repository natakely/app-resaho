const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./users/routes/auth.routes");

const app = express(); 
const PORT = 5000;

// ⚙️ Options CORS : autorise le frontend React à accéder à l’API
const corsOptions = {
  origin: "http://localhost:3000", // frontend React
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

// 📡 Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // nécessaire pour lire les cookies JWT

// 🔌 Connexion DB
connectDb();

app.use("/api/auth", authRoutes); // login, register, etc.

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend test!" });
});

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API backend !");
});


// 🚀 Lancement serveur
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
