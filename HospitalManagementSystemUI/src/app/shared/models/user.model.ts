export interface User {
    userId: number;
    username: string;
    password?: string;
    role: string;
    firstName: string;
    lastName: string;
    isDeleted?: boolean;
}

export interface UserResponse {
    statusCode: number;
    message: string;
    data: User;
}
