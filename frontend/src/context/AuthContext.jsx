import { createContext, useContext, useState, useEffect } from "react";
import { registerAuthHandlers } from "../api/axiosInstance";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("user");

        if (token && userData) {
            setUser(JSON.parse(userData));
            setAccessToken(token);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const syncToken = () => {
            const newToken = localStorage.getItem("accessToken");
            if (newToken !== accessToken) {
                setAccessToken(newToken);
            }
        };

        window.addEventListener("storage", syncToken);
        return () => window.removeEventListener("storage", syncToken);
    }, [accessToken]); // add dependency


    useEffect(() => {
    registerAuthHandlers({
        setRefreshing,
        updateToken,
    });
}, []);


    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const updateToken = (token) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
};


    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, updateToken,loading,     refreshing,   // 👈 add this
    setRefreshing  }}>
            {children}
        </AuthContext.Provider>
    );
};
