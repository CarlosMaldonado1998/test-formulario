// components/AuthGuard.js
import { useRouter } from "next/router";
import { useAuth } from "./AuthContext";

function AuthGuard({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth(); // Usamos el contexto de autenticación

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (!user) {
    router.push("/login"); // Redirige al login si no hay usuario
    return null;
  }

  return children; // Si hay usuario, muestra los hijos
}

export default AuthGuard;
