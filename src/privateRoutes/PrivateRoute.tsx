import { Navigate, useNavigate } from "react-router";
import Loading from "../components/Utils/Loading";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

export const PrivateRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, token, logout, loading } = useAuth() as any;
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "Admin") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "This user is not an admin",
      }).then(() => {
        logout();
        navigate("/login", { replace: true });
      });
    }
  }, [user, logout, navigate]);

  if (loading) return <Loading />;

  if (!token) return <Navigate to="/login" replace />;

  if (!user) return <Loading />;

  if (user.role !== "Admin") return null;
  return children;
};
