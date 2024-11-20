import {createWithEqualityFn} from "zustand/traditional";
import {useLogin, UserStore} from "./user";
import { shallow } from "zustand/shallow";

// export const equalityFn = <T>(a: T, b: T): boolean => JSON.stringify(a) === JSON.stringify(b);


export function useUserStore<T>(selector: (state: UserStore) => T, equalityFn = shallow) {
    const state = useLogin();
    return selector(state);
}