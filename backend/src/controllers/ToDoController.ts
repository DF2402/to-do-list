import type { Request, Response, NextFunction } from "express";
import ToDoService from "../service/ToDoService.js";
import type { ToDoItem } from "../shared/Types.ts";

export class ToDoController {

    async createToDo(req: Request, res: Response, next: NextFunction) {
        console.log("Creating to-do:", req.body);
        try {
        const { title, description, completed, created_at, updated_at } = req.body;
            const toDo = await ToDoService.createToDo( { title, description, completed: false, created_at: new Date(), updated_at: new Date() } as ToDoItem );
            return res.status(201).json(toDo);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getToDoById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const toDo = await ToDoService.getToDoById(parseInt(id!));
            return res.status(200).json(toDo);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateToDo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { title, description, completed, created_at } = req.body;
            const toDo = await ToDoService.updateToDo(parseInt(id!), { title, description, completed: completed, created_at: created_at, updated_at: new Date() } as ToDoItem);
            return res.status(200).json(toDo);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteToDo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await ToDoService.deleteToDo(parseInt(id!));
            return res.status(200).json({ message: "ToDo deleted successfully" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getAllToDos(req: Request, res: Response, next: NextFunction) {
        try {
            const toDos = await ToDoService.getAllToDos();
            return res.status(200).json(toDos);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getCompletedToDos(req: Request, res: Response, next: NextFunction) {
        try {
            const { completed } = req.params;
            const toDos = await ToDoService.getCompletedToDos(completed === "true" ? true : false);
            return res.status(200).json(toDos);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}


export default new ToDoController();