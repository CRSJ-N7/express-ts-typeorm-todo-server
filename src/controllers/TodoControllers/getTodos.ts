import { Request, Response } from "express";
import todosRepository from "../../utils/repository/todoRepository";
import { Todo } from "../../entities/Todo";

type GetTodosReq = { filter: string };
type GetTodosRes = { message: string } | Todo[];

export const getTodos = async (
  req: Request<{}, {}, {}, GetTodosReq>,
  res: Response<GetTodosRes>,
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
