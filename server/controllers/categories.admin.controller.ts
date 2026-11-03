import express from 'express';
import CategoriesService from "../services/categories-service";
import { log } from 'console';


class CategoriesAdminController {
    async create(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { title, parent_id } = req.body;

            if (!title || typeof title !== "string") {
                return res.status(400).json({ success: true, message: "Поле title обязательно и должно быть строкой" });
            }

            const checkTitle = await CategoriesService.checkTitle(title);

            if (checkTitle) {
                return res.status(400).json({ success: true, message: "Существующая категория" });
            }

            const result = await CategoriesService.createCategory(title.trim(), parent_id);

            return res.status(201).json({ success: true, data: result });
        } catch (error: any) {
            console.error("Ошибка при добавлении категории:", error);
            return res.status(500).json({ success: false, message: "Ошибка сервера", error: error.message });
        }
    }

    async get(req: express.Request, res: express.Response): Promise<any> {
        try {
            const result = await CategoriesService.getCategories();
            return res.status(200).json(result);
        } catch (error: any) {
            console.error("Ошибка при получении категорий:", error);
            return res.status(500).json({ success: false, message: "Ошибка сервера", error: error.message });
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<any> {
        try {
            const id  = req.query.id;

            if (!id || typeof id !== "string") {
                return res.status(400).json({ success: false, message: "Некорректный ID категории" });
            }
            const childrenCount = await CategoriesService.childrenCount(id);
            log(childrenCount, "count");

            if (childrenCount > 0) {
                return res.status(404).json({ success: false, message: 'Нельзя удалить категорию с дочерними категориями' });
            }

            const deleted = await CategoriesService.removeCategory(id);


            if (!deleted) {
                return res.status(404).json({ success: true, message: "Категория не найдена" });
            }

            return res.status(200).json({ success: true, message: "Категория удалена" });
        } catch (error: any) {
            console.error("Ошибка при удалении категории:", error);
            return res.status(500).json({ success: false, message: "Ошибка сервера", error: error.message });
        }
    }


    async patch(req: express.Request, res: express.Response): Promise<any> {
        try {
            log(req.body, req.query, "khljl");
            const id  = req.query.id;

            if (!id || typeof id !== "string") {
                return res.status(400).json({ success: false, message: "Некорректный ID категории" });
            }
            if (req.body.title.length <= 3) {
                return res.status(400).json({ success: false, message: "Некорректная длина" });
            }

            const result = await CategoriesService.editTitle(req.body.title, id);

            if(result[0]){
                return res.status(200).json({ success: true, message: "Категория изменена" });
            }

        } catch (error: any) {
            console.error("Ошибка при обновлении категории:", error);
            return res.status(500).json({ success: false, message: "Ошибка сервера", error: error.message });
        }
    }
}
export default new CategoriesAdminController();

//npx sequelize-cli model:generate --name UserRefreshTokens --attributes id:string,refreshToken:string,userId:string