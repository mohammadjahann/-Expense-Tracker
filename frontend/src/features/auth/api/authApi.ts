import api from "../../../lib/axios";
import type { UserDetail } from "../../../Types";
import type { FetchUserResponse, LoginCredentials, SuccessLoginData } from "../types";

export const loginApi = async (credentials: LoginCredentials): Promise<SuccessLoginData> => {
    const res = await api.post<SuccessLoginData>("/user/login", credentials);
    return res.data;
};

export const fetchProfileApi = async (token: string): Promise<UserDetail | null> => {
    if (!token) return null;
    try {
        const res = await api.get<FetchUserResponse>("/user/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.user;
    } catch {
        return null;
    }
};