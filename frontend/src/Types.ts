export type UserDetail = {
    _id: string,
    name: string,
    email: string
}

export type FetchUser = {
    success: string,
    user: UserDetail
}

