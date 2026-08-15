export type UserDetail = {
    _id: string,
    name: string,
    email: string
}

export type FetchUser = {
    success: string,
    user: UserDetail
}

export type SuccessLoginData = {
    success: boolean,
    user: UserDetail,
    token: string
}

