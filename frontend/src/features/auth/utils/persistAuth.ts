const persistAuth = (profile: unknown, token: string, rememberMe: boolean) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    try {
        if (token) storage.setItem("token", token);
        if (profile) storage.setItem("user", JSON.stringify(profile));
    } catch (err) {
        console.error("Storage error:", err);
    }
};

export default persistAuth