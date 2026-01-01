import type { Knex } from "knex";
import type { ToDoItem } from "../shared/Types.ts";

export class ToDoModel {
    private knex: Knex;
    constructor(knex: Knex) {
        this.knex = knex;
    }

    async create(item: ToDoItem): Promise<ToDoItem> {
        item.created_at = new Date();
        item.updated_at = new Date();
        const [id] = await this.knex("to_do_items").insert(item);
        const created = await this.knex("to_do_items").where("id", id).first();
        return created!;
    }

    async getById(id: number): Promise<ToDoItem | undefined> {
        return this.knex("to_do_items").where("id", id).first();
    }

    async update(id: number, item: ToDoItem): Promise<ToDoItem | undefined> {
        const affectedRows = await this.knex("to_do_items").where("id", id).update(item);
        if (affectedRows === 0) {
            return undefined;
        }
        return this.knex("to_do_items").where("id", id).first();
    }

    async delete(id: number): Promise<void> {
        await this.knex("to_do_items").where("id", id).delete();
    }

    async getAll(): Promise<ToDoItem[]> {
        return this.knex("to_do_items").select("*");
    }

    async getCompleted(completed: boolean): Promise<ToDoItem[]> {
        return this.knex("to_do_items").where("completed", completed).select("*");
    }
}
