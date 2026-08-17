import type { UserDetail } from "../../../Types";


export interface FetchUserResponse {
    user: UserDetail;
}

export type SuccessLoginData = {
    success: boolean,
    user: UserDetail,
    token: string
}

export interface LoginCredentials {
    email: string;
    password: string;
}