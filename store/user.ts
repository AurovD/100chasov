import { create } from 'zustand';
import { fetchRequest } from '../helpers/fetch-request';
import {createStore} from './createStore';
import {User} from "../types/user";
import login from "../components/UI/Popups/Phone";

export interface UserStore {
    user: User | {};
    phone: (phone: string, reload?: boolean ) => Promise<unknown>
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
        console.log(data, "data");
        return data;
    },
}), "User");