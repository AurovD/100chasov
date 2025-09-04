
import { fetchRequest } from '../helpers/fetch-request';
import {createStore} from './createStore';
import {User} from "../types/user";
import { UserResponse } from '../types/user';


// type UserResponse = {success: boolean, message?: string, access_token?: string, user?: User}

export interface UserStore {
  user: User | {};
  phone: (phone: string, reload?: boolean) => Promise<UserResponse>;
  code: (code: string) => Promise<UserResponse>;
}

export const usePhone = createStore<UserStore>(
  (set, get) => ({
    user: {},
    phone: async (
      phone: string,
      reload?: boolean,
    ) => {
      if (reload) {
        set({
          user: {},
        });
      }

      return await fetchRequest(
        "/user/request_code",
        "POST",
        { phone },
      );


    },
    code: async (code) => {
      let data: UserResponse = await fetchRequest(
        "/user/verify_code",
        "POST",
        { code },
      );

      if (!data.success) {
        return data;
      }
        
      set({
        user: {
        ...data.user, access_token: data.access_token}
      });

      return data;
    },
  }),
  "User",
);