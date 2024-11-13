import {useStore, useStoreWithEqualityFn} from "zustand/ traditional";
import {useLogin, UserStore} from "./user";

export const equalityFn = <T>(a: T, b: T): boolean => JSON.stringify(a) === JSON.stringify(b);


export function useUserStore<T>(selector: (state: UserStore) => T) {
    return useStore(useLogin, selector, equalityFn);
}