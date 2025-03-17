import { getCurrentInstance } from "vue";

// Define IUser Interface
export interface IUser {
    id: string;
    name: string;
    role: "Admin" | "Editor" | "Viewer"; // Limited to specific roles
    username: string;
    email: string;
    avatar: string;
    password: string;
    birthdate: Date;
    registeredAt: Date;
}

// Define response type for getAllUsers
export interface IUserResponse {
    total: number;
    users: IUser[];
}

// Define type for new user creation
export interface INewUser {
    name: string;
    email: string;
    role: "Admin" | "Editor" | "Viewer";
}

// 📌 Get all users (with pagination & optional role filtering)
export const getAllUsers = async (
    page: number = 1,
    limit: number = 10,
    role?: string
): Promise<IUserResponse> => {
    const instance = getCurrentInstance();
    let query = `/users?page=${page}&limit=${limit}`;
    if (role) query += `&role=${role}`;
    return instance?.proxy?.api_provider(query);
};

// 📌 Get a specific user by ID
export const getUserById = async (id: string): Promise<IUser> => {
    const instance = getCurrentInstance();
    return instance?.proxy?.api_provider(`/users/${id}`);
};

// 📌 Create a new user
export const createUser = async (data: INewUser): Promise<IUser> => {
    const instance = getCurrentInstance();
    return instance?.proxy?.api_provider(`/users`, data);
};

// 📌 Update a user by ID
export const editUser = async (id: string, data: Partial<IUser>): Promise<IUser> => {
    const instance = getCurrentInstance();
    return instance?.proxy?.api_provider(`/users/${id}`, data);
};

// 📌 Delete a user by ID
export const deleteUser = async (id: string): Promise<void> => {
    const instance = getCurrentInstance();
    return instance?.proxy?.api_provider(`/users/${id}`);
};

// 📌 Get available roles
export const getRoles = async (): Promise<string[]> => {
    const instance = getCurrentInstance();
    return instance?.proxy?.api_provider(`/roles`);
};
