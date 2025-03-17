import {api_provider} from '@/plugins/apiProvider.ts'

export const postLogin = async (userData: { email: string; password: string }) => {
    return api_provider("/auth/login", {method: "POST", body: userData});
}