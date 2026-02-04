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

  let whereObject;
  if (filter === "completed") {
    whereObject = { isCompleted: true };
  } else if (filter === "active") {
    whereObject = { isCompleted: false };
  } else {
    whereObject = {};
  }

  const todos = await todosRepository.find({ where: whereObject });
  return res.status(200).json(todos);
};
