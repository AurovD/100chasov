import express from 'express';
import CategoriesService from "../services/categories-service";


class CategoriesController {
    async addCategory(req: express.Request, res: express.Response): Promise<any> {
        try {
            const { title, parent_id } = req.body;

            if (!title || typeof title !== "string") {
                return res.status(400).json({ success: false, message: "Поле title обязательно и должно быть строкой" });
            }

            const result = await CategoriesService.createCategory(title.trim(), parent_id);

            return res.status(201).json({ success: true, data: result });
        } catch (error: any) {
            console.error("Ошибка при добавлении категории:", error);
            return res.status(500).json({ success: false, message: "Ошибка сервера", error: error.message });
        }
    }

    async getCategory(req: express.Request, res: express.Response): Promise<any> {
        try {
            const result = await CategoriesService.getCategories();

            return res.status(200).json(result);
        } catch (error: any) {
            console.error("Ошибка при получении категорий:", error);
            return res.status(500).json({ success: false, message: "Ошибка сервера", error: error.message });
        }
    }
    // // ✅ Получить категорию по ID
    // async getCategoryById(req: express.Request, res: express.Response): Promise<any> {
    //     try {
    //         const { id } = req.params;
    //
    //         if (!id) {
    //             return res.status(400).json({ success: false, message: "ID категории не указан" });
    //         }
    //
    //         const category = await CategoriesService.getCategoryById(id);
    //
    //         if (!category) {
    //             return res.status(404).json({ success: false, message: "Категория не найдена" });
    //         }
    //
    //         return res.status(200).json({ success: true, data: category });
    //     } catch (error: any) {
    //         console.error("Ошибка при получении категории по ID:", error);
    //         return res.status(500).json({ success: false, message: "Ошибка сервера", error: error.message });
    //     }
    // }
    //
    // // ✅ Удалить категорию
    // async deleteCategory(req: express.Request, res: express.Response): Promise<any> {
    //     try {
    //         const { id } = req.params;
    //
    //         if (!id) {
    //             return res.status(400).json({ success: false, message: "ID категории не указан" });
    //         }
    //
    //         const deleted = await CategoriesService.deleteCategory(id);
    //
    //         if (!deleted) {
    //             return res.status(404).json({ success: false, message: "Категория не найдена" });
    //         }
    //
    //         return res.status(200).json({ success: true, message: "Категория удалена" });
    //     } catch (error: any) {
    //         console.error("Ошибка при удалении категории:", error);
    //         return res.status(500).json({ success: false, message: "Ошибка сервера", error: error.message });
    //     }
    // }
    //
    // // ✅ Обновить категорию
    // async updateCategory(req: express.Request, res: express.Response): Promise<any> {
    //     try {
    //         const { id } = req.params;
    //         const { title, parent_id } = req.body;
    //
    //         if (!id) {
    //             return res.status(400).json({ success: false, message: "ID категории не указан" });
    //         }
    //
    //         const updated = await CategoriesService.updateCategory(id, { title, parent_id });
    //
    //         if (!updated) {
    //             return res.status(404).json({ success: false, message: "Категория не найдена" });
    //         }
    //
    //         return res.status(200).json({ success: true, data: updated });
    //     } catch (error: any) {
    //         console.error("Ошибка при обновлении категории:", error);
    //         return res.status(500).json({ success: false, message: "Ошибка сервера", error: error.message });
    //     }}
}
export default new CategoriesController();

//npx sequelize-cli model:generate --name UserRefreshTokens --attributes id:string,refreshToken:string,userId:string