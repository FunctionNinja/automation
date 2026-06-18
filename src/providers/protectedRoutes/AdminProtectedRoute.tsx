import { Navigate } from "react-router";
import { useProfile } from "../../services/hooks/useProfiles";

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) return <div>Loading...</div>;

  if (profile?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
}