import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { fetchProfileApi, loginApi } from "../api/authApi";
import useAppContext from "../../../hooks/useAppContext";
import type { UserDetail } from "../../../Types";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { setUserDetails, setToken } = useAppContext();
    const navigate = useNavigate();

    const persistAuth = (profile: unknown, token: string) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        try {
            if (token) storage.setItem("token", token);
            if (profile) storage.setItem("user", JSON.stringify(profile));
        } catch (err) {
            console.error("Storage error:", err);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) return setError("ایمیل را وارد کنید");
        if (!password.trim()) return setError("رمز عبور را وارد کنید");

        setIsLoading(true);

        try {
            const data = await loginApi({ email: email.trim(), password });

            if (!data.token) {
                setError("توکن دریافت نشد");
                return;
            }

            let profile: UserDetail | null = data.user ?? null;
            if (!profile) {
                profile = await fetchProfileApi(data.token);
            }

            if (!profile) {
                setError("اطلاعات کاربر دریافت نشد");
                return;
            }

            persistAuth(profile, data.token);
            setToken(data.token);
            setUserDetails(profile);
            navigate("/dashboard");
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(
                    err.response?.data?.message ||
                    (err.request ? "ارتباط با سرور برقرار نشد" : "خطایی هنگام ورود رخ داد")
                );
            } else {
                setError("خطای غیرمنتظره‌ای رخ داد");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        rememberMe,
        setRememberMe,
        error,
        isLoading,
        handleSubmit,
    };
};