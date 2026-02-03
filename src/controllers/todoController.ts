import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Todo } from "../entities/Todo";

type UpdateReq = {
  text?: string;
  isCompleted?: boolean;
};

type TodoParams = {
  id: string;
};

type TodoQuery = {
  filter?: string;
};

type DefaultResponse = { message?: string } | void;

type TodosResponse =
  | { message: string }
  | { newTodo: Todo; message: string }
  | Todo[]
  | Todo;

const todosRepository = AppDataSource.getRepository(Todo);

export const getTodos = async (
  req: Request<{}, {}, {}, TodoQuery>,
  res: Response<TodosResponse>,
) => {
  const { filter } = req.query;

  if (!filter) {
    const todos = await todosRepository.find();
    if (!todos.length) {
      return res.status(404).json({ message: "нет тудушек в бд" });
    }
    return res.status(200).json(todos);
  }
  const status = filter === "completed";

  const todos = await todosRepository.find({ where: { isCompleted: status } });
  return res.status(200).json(todos);
};

export const createTodos = async (
  req: Request<{}, {}, Todo>,
  res: Response<TodosResponse>,
) => {
  const { text } = req.body;
  if (!text || !text.length || typeof text !== "string") {
    return res.status(400).json({ message: `not valid ${text}` });
  }
  const newTodo = todosRepository.create({
    text: text.trim(),
  });

  await todosRepository.save(newTodo);
  res.status(201).json({ newTodo, message: `todo created!` });
};

export const updateTodo = async (
  req: Request<TodoParams, {}, UpdateReq>,
  res: Response<TodosResponse>,
) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "выйди блять и зайди обратно с id" });
  }

  const todo = await todosRepository.findOne({ where: { id: parseInt(id) } });
  if (!todo) {
    return res
      .status(404)
      .json({ message: "ты долбаёб? у меня нет такого id, пшёл нахуй отсюда" });
  }

  todo.text = req.body.text ?? todo.text;
  todo.isCompleted = req.body.isCompleted ?? todo.isCompleted;

  await todosRepository.save(todo);
  return res.status(200).json(todo);
};

export const deleteAllCompleted = async (
  req: Request,
  res: Response<DefaultResponse>,
) => {
  await todosRepository.delete({ isCompleted: true });
  return res.status(200).json({ message: "все комплитнутые таски удалены" });
};
export const deleteTodo = async (
  req: Request<TodoParams>,
  res: Response<TodosResponse>,
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "нет id в параметрах" });
  }

  const todo = await todosRepository.find({ where: { id: parseInt(id) } });
  if (todo) {
    await todosRepository.delete(todo);
    return res.status(200).json(todo);
  }
};
export const toggleAllStatuses = async (
  req: Request,
  res: Response<DefaultResponse>,
) => {
  const todos = await todosRepository.find();
  if (todos.length === 0)
    return res.status(404).json({ message: "в бд нет тудух" });

  const isAllCompleted = todos.every((todo) => todo.isCompleted);
  const status = isAllCompleted ? false : true;

  await todosRepository
    .createQueryBuilder()
    .update(Todo)
    .set({ isCompleted: status })
    .execute();

  return res.status(200).json({ message: "статусы toggled успешно" });
};
