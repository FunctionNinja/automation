// components/ProtectedRoute.tsx
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Loading from "../../components/Loading";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Проверяем текущего пользователя
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Слушаем изменения авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};