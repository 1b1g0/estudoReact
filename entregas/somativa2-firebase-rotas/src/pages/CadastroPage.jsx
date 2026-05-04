import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "../state/useAuth";

const initialForm = {
  nome: "",
  sobrenome: "",
  dataNascimento: "",
  email: "",
  senha: "",
};

export default function CadastroPage() {
  const [form, setForm] = useState(initialForm);
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("neutro");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setProfile } = useAuth();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMensagem("");
    setStatus("neutro");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (Object.values(form).some((field) => !field.trim())) {
      setMensagem("Preencha todos os campos.");
      setStatus("erro");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha,
      );

      const userData = {
        uid: userCredential.user.uid,
        nome: form.nome,
        sobrenome: form.sobrenome,
        dataNascimento: form.dataNascimento,
        email: form.email,
      };

      await setDoc(doc(db, "usuarios", userCredential.user.uid), userData);
      setProfile(userData);
      setMensagem("Cadastro realizado com sucesso!");
      setStatus("sucesso");
      setForm(initialForm);
      navigate("/principal");
    } catch (error) {
      let errorMessage = "Nao foi possivel cadastrar o usuario.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este e-mail ja esta cadastrado.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "A senha precisa ter pelo menos 6 caracteres.";
      }

      setMensagem(errorMessage);
      setStatus("erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card auth-card">
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="nome"
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
          />
          <input
            name="sobrenome"
            type="text"
            placeholder="Sobrenome"
            value={form.sobrenome}
            onChange={handleChange}
          />
          <input
            name="dataNascimento"
            type="date"
            value={form.dataNascimento}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <label className={`mensagem ${status}`}>{mensagem}</label>
        <p className="hint">
          Ja possui conta? <Link to="/login">Ir para Login</Link>
        </p>
      </section>
    </main>
  );
}
