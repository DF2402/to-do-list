export type ToDoItem = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: Date;
    updated_at?: Date;
}