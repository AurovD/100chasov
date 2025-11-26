import dotenv from "dotenv";

import { Categories } from "../../models";
import { log } from "console";


dotenv.config({
    path: 'server/.env'
})



class CategoriesService {
    async createCategory(title: string, parent_id?: string ) {
        return await Categories.create({
            title,
            parent_id
        });
    }
    async getCategories() {
        return await Categories.findAll();
    }
    async removeCategory(id: string) {
        const deletedCount = await Categories.destroy({
            where: { id }
        });
        return deletedCount > 0;
    }
}


export default new CategoriesService();