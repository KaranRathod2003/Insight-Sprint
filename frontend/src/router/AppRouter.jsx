import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Mood from '../pages/Mood.jsx';
import Tasks from '../pages/Tasks.jsx';
import Habits from '../pages/Habits.jsx';
import Summary from '../pages/Summary.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Layout from '../components/Layout.jsx';

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
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Tasks />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/habits"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Habits />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/mood"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Mood />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/summary"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Summary />
                            </Layout>
                        </ProtectedRoute>
                    }
                />


            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
