import React, { createContext, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import type { UserDetail } from "../Types";

type ContextTypes = {

    handleLogout: () => void,
    userDetails: UserDetail | null,
    setUserDetails: Dispatch<SetStateAction<UserDetail | null>>
    token: string | null,
    setToken: Dispatch<SetStateAction<string | null>>

}



const AppContext = createContext<null | ContextTypes>(null)

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [userDetails, setUserDetails] = useState<UserDetail | null>(null)
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("token")
    )




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
        <AppContext value={{ handleLogout, userDetails, setUserDetails, token, setToken }}>

            {children}

        </AppContext>
    )

}

export { AppContext }

export default AppContextProvider