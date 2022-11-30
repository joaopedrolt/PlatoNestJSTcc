export type UserModel = {
    _id?: string;
    role: string;
    name: string;
    user?: string;
    password?: string;
}

export type UserLogin = {
    user: string;
    password: string;
}