import { getCurrentInstance } from "vue";
import { api_provider } from "@/plugins/apiProvider";

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

export interface IUserResponse {
    total: number;
    users: IUser[];
}

export interface INewUser {
    name: string;
    email: string;
    role: "Admin" | "Editor" | "Viewer";
}

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

export const getUserById = async (id: string): Promise<IUser> => {
    const instance = getCurrentInstance();
    return instance?.proxy?.api_provider(`/users/${id}`);
};

export const createUser = async (user: INewUser): Promise<IUser> => {
    return await api_provider<IUser>("/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
    });
};


export const updateUser = async (id: string, data: Partial<IUser>): Promise<IUser> => {
    return await api_provider<IUser>(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });
};


export const deleteUser = async (id: string): Promise<void> => {
    const instance = getCurrentInstance();
    return instance?.proxy?.api_provider(`/users/${id}`);
};

export const getRoles = async (): Promise<unknown> => {
    const instance = getCurrentInstance();
    return instance?.proxy?.api_provider(`/roles`);
};
