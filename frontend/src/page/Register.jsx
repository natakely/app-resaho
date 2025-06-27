import { useState } from "react";
import { registerUser } from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Inscription réussie !");
    } catch (err) {
      alert("Erreur lors de l’inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Nom complet" />
      <input
        name="username"
        onChange={handleChange}
        placeholder="Nom d’utilisateur"
      />
      <input
        name="email"
        onChange={handleChange}
        type="email"
        placeholder="Email"
      />
      <input
        name="password"
        onChange={handleChange}
        type="password"
        placeholder="Mot de passe"
      />
      <button type="submit">S’inscrire</button>
    </form>
  );
}
