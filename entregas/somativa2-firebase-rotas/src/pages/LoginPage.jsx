import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("neutro");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    if (!email.trim() || !senha.trim()) {
      setMensagem("Preencha e-mail e senha.");
      setStatus("erro");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, senha);
      setMensagem("Acesso autorizado.");
      setStatus("sucesso");
      navigate("/principal");
    } catch (error) {
      let errorMessage = "Usuario nao cadastrado ou senha invalida.";

      if (error.code === "auth/invalid-credential") {
        errorMessage = "Usuario nao cadastrado ou senha invalida.";
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
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMensagem("");
              setStatus("neutro");
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(event) => {
              setSenha(event.target.value);
              setMensagem("");
              setStatus("neutro");
            }}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Acessando..." : "Acessar pagina Principal"}
          </button>
        </form>
        <label className={`mensagem ${status}`}>{mensagem}</label>
        <p className="hint">
          Nao tem conta? <Link to="/cadastro">Criar cadastro</Link>
        </p>
      </section>
    </main>
  );
}
