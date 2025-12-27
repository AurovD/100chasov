import {createStore} from "./createStore";
import {fetchRequest} from "../helpers/fetch-request";
import {useUserStore} from "./user";
import {CategoryType} from "../types/categories";
import {log} from "console";

interface CategoriesState {
    categories: CategoryType[],
   addCategory: (data: { title: string; link: string, parent_id?: string }) => Promise<CategoryType>,
    getCategories: () => Promise<CategoryType[]>,
}

const useCategoriesStore = createStore<CategoriesState>(
  (set) => ({
    categories: [],
     addCategory: async ({ title, link,  parent_id }) => {
    try {
        const token = useUserStore.getState().token;

        const data: CategoryType = await fetchRequest(
            "/admin/category/add_category",
            "POST",
            { title, link, parent_id },
            token
        );

        set((state) => ({
            categories: [...state.categories, data],
        }));

        return data;
    } catch (e) {
        return Promise.reject(e);
    }
},

      getCategories: async () => {
          try {
              const token = useUserStore.getState().token;

              set({
                  categories: [],
              });

              const data: CategoryType[] = await fetchRequest(
                  "/admin/category",
                  "GET",
                  undefined,
                  token
              );

              set({
                  categories: Array.isArray(data) ? data : [],
              });

              return data;
          } catch (e) {
              console.error("Ошибка при загрузке категорий", e);
              return Promise.reject(e);
          }
      },
  }),
  "Categories",
);

export default useCategoriesStore;