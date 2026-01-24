import type { Knex } from "knex";
import knex from "../db/knex.js";
import { ToDoModel } from "../model/ToDoModel.js";
import type { ToDoItem } from "../shared/Types.ts";

export class ToDoService {
    private toDoModel: ToDoModel;
    constructor(knex: Knex) {
        this.toDoModel = new ToDoModel(knex);
    }

    async createToDo(item: ToDoItem): Promise<ToDoItem> {
        return this.toDoModel.create(item);
    }

    async getToDoById(id: number): Promise<ToDoItem | undefined> {
        return this.toDoModel.getById(id);
    }

    async updateToDo(id: number, item: ToDoItem): Promise<ToDoItem | undefined> {
        return this.toDoModel.update(id, item);
    }

    async deleteToDo(id: number): Promise<void> {
        return this.toDoModel.delete(id);
    }

    async getAllToDos(): Promise<ToDoItem[]> {
        return this.toDoModel.getAll();
    }

    async getCompletedToDos(completed: boolean): Promise<ToDoItem[]> {
        return this.toDoModel.getCompleted(completed);
    }
}

export default new ToDoService(knex);