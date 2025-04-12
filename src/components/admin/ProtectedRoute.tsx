import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Define the shape of the User object
interface User {
  role: string; // Adjust this based on your actual user object
  // Add other properties as needed, e.g., id, name, email
}

// Define the shape of the auth slice in Redux
interface AuthState {
  user: User | null;
}

// Define the RootState for the entire Redux store
interface RootState {
  auth: AuthState;
  // Add other slices if they exist, e.g., job: JobState, company: CompanyState
}

// Define props for the ProtectedRoute component
interface ProtectedRouteProps {
  children: React.ReactNode; // Type for React children
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Type the useSelector hook with RootState
  const { user } = useSelector((store: RootState) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "recruiter") {
      navigate("/");
    }
  }, [user, navigate]); // Added dependencies for safety

  return <>{children}</>;
};

export default ProtectedRoute;