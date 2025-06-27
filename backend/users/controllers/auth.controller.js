const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérifie si l'utilisateur existe déjà
    // const existingUser = await User.findOne({
    //   $or: [{ username }, { email }],
    // });
    // if (existingUser) {
    //   return res
    //     .status(400)
    //     .json({ message: "Username ou email déjà utilisé" });
    // }

    // Crée un nouvel utilisateur
    const newUser = new User({ name, username, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // ❗️FindOne au lieu de find
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Username ou mot de passe incorrect" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Username ou mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erreur serveur interne" });
  }
};
