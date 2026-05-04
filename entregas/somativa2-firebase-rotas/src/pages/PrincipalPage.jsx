import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../state/useAuth";

export default function PrincipalPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <main className="page">
      <section className="card auth-card">
        <h1>Pagina Principal</h1>
        <p className="welcome">Usuario autenticado: {user?.email}</p>

        <div className="profile-grid">
          <span className="label">Nome</span>
          <span>{profile?.nome || "-"}</span>

          <span className="label">Sobrenome</span>
          <span>{profile?.sobrenome || "-"}</span>

          <span className="label">Data de nascimento</span>
          <span>{profile?.dataNascimento || "-"}</span>
        </div>

        <div className="actions">
          <button type="button" onClick={handleLogout}>
            Sair
          </button>
          <Link to="/cadastro">Novo cadastro</Link>
        </div>
      </section>
    </main>
  );
}
