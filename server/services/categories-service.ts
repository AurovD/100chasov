import dotenv from "dotenv";

import { Categories } from "../../models";
import { log } from "console";


dotenv.config({
    path: 'server/.env'
})



class CategoriesService {
    async createCategory(title: string, link: string, parent_id?: string ) {
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
    async childrenCount(id: string) {
        return await Categories.count({
            where: {
                parent_id: id
            }})
    }
    async checkTitle(title: string) {
        return await Categories.findOne({
            where: {
                title
            }
        })
    }
}


export default new CategoriesService();