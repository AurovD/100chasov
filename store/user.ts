import { create } from 'zustand';
import { fetchRequest } from '../helpers/fetch-request';
import {createStore} from './createStore';
import {User} from "../types/user";

export interface UserStore {
    user: User | {};
    login: (phone: string, reload?: boolean ) => Promise<unknown>
}

export const useLogin = createStore<UserStore>((set, get) => ({
    user: {},
    login: async (phone: string, reload?: boolean) => {
        if (reload) {
            set({
                user: {},
            });
        }

        try {
            const data = await fetchRequest(
                "http://localhost:3001/api/user/code",
                "POST",
                { phone }
            );
            return data;
        } catch (error) {
            console.log(error, "ljlj;");
            // throw error;
        }
    },
}), "User");