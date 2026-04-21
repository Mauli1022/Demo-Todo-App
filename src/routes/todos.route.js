import { Router } from "express";
import { createTodo } from "../controllers/todos.controller.js";

const router = Router();

router.post("/create-todo",createTodo);

export default router;