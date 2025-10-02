
import { fetchRequest } from '../helpers/fetch-request';
import {createStore} from './createStore';
import {User} from "../types/user";
import { UserResponse } from '../types/user';
import {log} from "console";


// type UserResponse = {success: boolean, message?: string, access_token?: string, user?: User}

export interface UserStore {
  user: User | null;
  token: string;
  phone: (phone: string, reload?: boolean) => Promise<UserResponse>;
  code: (code: string) => Promise<UserResponse>;
  me: () => Promise<UserResponse>;
}

export const usePhone = createStore<UserStore>(
  (set, get) => ({
      user: null,
      token: "",
      phone: async (phone: string, reload?: boolean,) => {
          if (reload) {
            set({
              user: null,
            });
          }

          return await fetchRequest(
            "/user/request_code",
            "POST",
            { phone },
          );
      },
      me: async () => {

          let data: UserResponse = await fetchRequest(
              "/user/me",
              "GET",
          );
          if (!data.success) {
              return data;
          }

          set({
              user: {
                  ...data.user}
          });

          set({
              token: data.access_token
          })

          return data;
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
        ...data.user}
      });

      set({
          token: data.access_token
      })

      return data;
    },
  }),
  "User",
);