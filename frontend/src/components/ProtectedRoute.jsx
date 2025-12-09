import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { accessToken, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // important fix
    const token = accessToken || localStorage.getItem("accessToken");
    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
