import {createStore} from "./createStore";
import {Category} from "../types/items";
import {fetchRequest} from "../helpers/fetch-request";
import {useUserStore} from "./user";

interface CategoriesState {
    categories: [],
    addCategory: (name: string) => Promise<Category>,
}

const useCategoriesStore = createStore<CategoriesState>(set => ({
    categories: [],
    addCategory: async (name: string) => {
        try {

            const token = useUserStore.getState().token;

            const data: Category = await  fetchRequest("/admin/add_category", "POST", {title: name}, token);

            console.log(data)

            return Promise.resolve({
                title: "ljlj",
            } satisfies Category);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}), "Categories");

export default useCategoriesStore;