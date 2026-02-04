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

  let whereCondition = {};
  if (filter === "completed") {
    whereCondition = { isCompleted: true };
  } else if (filter === "active") {
    whereCondition = { isCompleted: false };
  }

  const todos = await todosRepository.find({ where: whereCondition });
  return res.status(200).json(todos);
};
