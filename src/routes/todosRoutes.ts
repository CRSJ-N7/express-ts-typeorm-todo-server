import { Router } from "express";
import {
  createTodos,
  deleteAllCompleted,
  deleteTodo,
  getTodos,
  toggleAllStatuses,
  updateTodo,
} from "../controllers/todoController";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodos);
router.patch("/toggle-all", toggleAllStatuses);
router.delete("/delete-completed", deleteAllCompleted);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
