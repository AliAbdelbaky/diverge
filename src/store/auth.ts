import {defineStore} from "pinia";
import {saveToken, destroyToken} from "@/services/jwtService";
import {postLogin} from "@/services/authService";

interface IUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    userData: IUser | null;
    isAuth: boolean;
    token: string | null;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        userData: null,
        isAuth: false,
        token: localStorage.getItem("token") || null,
    }),

    actions: {
        async login(userData: { email: string; password: string }): Promise<{
            data?: IUser;
            error?: string
        }> {
            try {
                const response = await postLogin(userData);

                if (!response || !response.token) {
                    return {error: "Invalid response from server"};
                }

                this.setAuth(response.token);

                window.location.reload();

                return {data: response};
            } catch (error) {
                console.error("Login Error:", error);
                return {error: "Login failed. Please try again."};
            }
        },

        setAuth(token?: string) {
            if (token) {
                this.isAuth = true;
                this.token = token;
                saveToken(token);

                return token
            } else {
                this.isAuth = false;
                this.token = null;
                this.logout();
            }
        },

        logout() {
            destroyToken();
            this.isAuth = false;
            this.token = null;

            window.location.reload();
        }
    },
});
