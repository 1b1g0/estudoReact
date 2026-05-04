import { Navigate, Route, Routes } from "react-router-dom";
import CadastroPage from "./pages/CadastroPage";
import LoginPage from "./pages/LoginPage";
import PrincipalPage from "./pages/PrincipalPage";
import { useAuth } from "./state/useAuth";

function PrivateRoute({ children }) {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <main className="page">Carregando...</main>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/principal"
        element={
          <PrivateRoute>
            <PrincipalPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
