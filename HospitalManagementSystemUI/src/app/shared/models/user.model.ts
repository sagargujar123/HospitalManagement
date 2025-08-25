export interface User {
    userId: number;
    username: string;
    password?: string;
    role: string;
}

export interface UserResponse {
    statusCode: number;
    message: string;
    data: User;
}
