import { Router } from "express";
import ToDoController  from "../controllers/ToDoController.js";

const router = Router();

router.post("/", ToDoController.createToDo);

router.get("/all", ToDoController.getAllToDos);

router.get("/completed/:completed", ToDoController.getCompletedToDos);

router.get("/:id", ToDoController.getToDoById);

router.put("/:id", ToDoController.updateToDo);

router.delete("/:id", ToDoController.deleteToDo);

export default router;