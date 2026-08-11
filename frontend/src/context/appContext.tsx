import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

type ContextTypes = {

    handleLogout: () => void

}



const AppContext = createContext<null | ContextTypes>(null)

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {



    const navigate = useNavigate()
    const clearAuth = () => {
        try {

            localStorage.removeItem("user")
            localStorage.removeItem("token")
            sessionStorage.removeItem("user")
            sessionStorage.removeItem("token")


        } catch (error) {

            console.error(error);

        }
    }

    const handleLogout = () => {
        clearAuth()
        navigate('/login')
    }

    return (
        <AppContext value={{ handleLogout }}>

            {children}

        </AppContext>
    )

}

export { AppContext }

export default AppContextProvider