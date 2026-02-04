import { Router } from "express";
import { createTodos } from "../controllers/TodoControllers/createTodo";
import { deleteAllCompleted } from "../controllers/TodoControllers/deleteAllCompleted";
import { deleteTodo } from "../controllers/TodoControllers/deleteTodo";
import { getTodos } from "../controllers/TodoControllers/getTodos";
import { toggleAllStatuses } from "../controllers/TodoControllers/toggleAllStatuses";
import { updateTodo } from "../controllers/TodoControllers/updateTodo";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodos);
router.patch("/toggle-all", toggleAllStatuses);
router.delete("/delete-completed", deleteAllCompleted);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
