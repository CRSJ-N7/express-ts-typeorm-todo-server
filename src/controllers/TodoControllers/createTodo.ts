import { Request, Response } from "express";
import { Todo } from "../../entities/Todo";
import todosRepository from "../../utils/repository/todoRepository";

type CreateReq = { text: string };
type CreateRes = { message: string } | { newTodo: Todo; message: string };

export const createTodos = async (
  req: Request<CreateReq>,
  res: Response<CreateRes>,
) => {
  const { text: text } = req.body;
  if (
    !text ||
    (typeof text === "string" ? text.trim().length === 0 : null) ||
    typeof text !== "string"
  ) {
    return res.status(400).json({ message: `not valid text: ${text}` });
  }

  const newTodo = todosRepository.create({
    text: text.trim(),
  });

  await todosRepository.save(newTodo);
  res.status(201).json({ newTodo, message: `todo created!` });
};
