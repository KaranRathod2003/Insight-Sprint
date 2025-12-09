import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Mood from '../pages/Mood.jsx';
import Tasks from '../pages/Tasks.jsx';
import Habits from '../pages/Habits.jsx';
import Summary from '../pages/Summary.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/mood"
                    element={
                        <ProtectedRoute>
                            <Mood />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <Tasks />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/habits"
                    element={
                        <ProtectedRoute>
                            <Habits />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/summary"
                    element={
                        <ProtectedRoute>
                            <Summary />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
