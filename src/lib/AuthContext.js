// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";

// Crea el contexto de autenticación
const AuthContext = createContext();

// Custom hook para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitorear el estado de la autenticación
  useEffect(() => {
    // Verifica el usuario actual
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setUser(null);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    checkUser();

    // Escuchar los cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null); // Actualiza el estado del usuario
      }
    );

    return () => {
      authListener?.unsubscribe(); // Limpiar cuando el componente se desmonte
    };
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
