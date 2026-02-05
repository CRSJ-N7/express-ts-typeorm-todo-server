import { Request, Response } from "express";
import { Todo } from "../../entities/Todo";
import todosRepository from "../../db/repository/todoRepository";

type CreateReq = { title: string };
type CreateRes = { message: string } | { newTodo: Todo; message: string };

export const createTodo = async (
  req: Request<CreateReq>,
  res: Response<CreateRes>,
) => {
  const { title } = req.body;
  if (
    !title ||
    (typeof title === "string" ? title.trim().length === 0 : null) ||
    typeof title !== "string"
  ) {
    return res.status(400).json({ message: `not valid title: ${title}` });
  }

  const newTodo = todosRepository.create({
    title: title.trim(),
  });

  await todosRepository.save(newTodo);
  res.status(201).json({ newTodo, message: `todo created!` });
};
