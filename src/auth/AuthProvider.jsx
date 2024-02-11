import {useContext, createContext, useState} from "react";
import {useNavigate} from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
    const [user,setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    const login =  (data) => {
        try {
            setUser({
                "id" : 1,
                "username" : "Atef",
                "email" : data.email
            });
            setToken("token123")
            localStorage.setItem("site", "res.token");
            navigate("/challenges");
        }
        catch (err) {
            console.log(err);
        }

    }

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/signin");
    };

    return <AuthContext.Provider value={ { token,user,login,logout} }>{children}</AuthContext.Provider>
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext)
}