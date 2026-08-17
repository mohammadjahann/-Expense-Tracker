import { useState } from "react"
import { useNavigate } from "react-router-dom"


const useSignup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [errors, setErrors] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()


    return {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        rememberMe,
        setRememberMe,
        errors,
        setErrors,
        isLoading,
        setIsLoading,
        navigate
    }
}

export default useSignup