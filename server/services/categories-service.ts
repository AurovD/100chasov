import dotenv from "dotenv";

import { Categories } from "../../models";

import redis from '../../config/redis';
import {Op} from "sequelize";

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
}


export default new CategoriesService();