import { createContext, useContext, useState, useEffect, use, Children } from "react";


const AuthContext = createContext();

export const useAuth= () => useContext(AuthContext);

export const AuthProvider = ({Children}) =>{
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);
    }

    const logout = () => {
        setUser(null);
        setAccessToken(null);
    }
    return (
        <AuthContext.Provider value={{user, accessToken, login, logout, loading, setLoading}}>
            {Children}
        </AuthContext.Provider>
    )
}

