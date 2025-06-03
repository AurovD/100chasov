
import { fetchRequest } from '../helpers/fetch-request';
import {createStore} from './createStore';
import {User} from "../types/user";

export interface UserStore {
    user: User | {};
    phone: (phone: string, reload?: boolean ) => Promise<unknown>;
    code: (code: string) => Promise<unknown>;
}

export const usePhone = createStore<UserStore>((set, get) => ({
    user: {},
    phone: async (phone: string, reload?: boolean) => {
        if (reload) {
            set({
                user: {},
            });
        }

            const data = await fetchRequest(
                "http://localhost:3001/api/user/code",
                "POST",
                { phone }
            );
        return data;
    },
    code: async (code) => {

        const data = await fetchRequest(
            "http://localhost:3001/api/user/activate",
            "POST",
            { code }
        );
        return data;
    }
}), "User");