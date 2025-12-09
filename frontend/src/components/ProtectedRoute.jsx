import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { accessToken, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // important fix

    return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
