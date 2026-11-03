import {createStore} from "./createStore";
import {useUserStore} from "./user";
import {CategoryType} from "../types/categories";
import {fetchRequest} from "../helpers/fetch-request";
import {ProductsType} from "../types/products";


interface ProductsState {
    products: ProductsType[],
    addProducts: () => void,
}

const useProductsStore = createStore<ProductsState>(
    (set) => ({
        products: [],
        addProducts: async () => {

        }
    }),
    "Products",
);

export default useProductsStore;