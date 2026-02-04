import { Request, Response } from "express";
import todosRepository from "../../utils/repository/todoRepository";

type DeleteReq = { id: string };
type DeleteRes = { message: string } | void;

export const deleteTodo = async (
  req: Request<DeleteReq>,
  res: Response<DeleteRes>,
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "нет id в параметрах" });
  }

  const todo = await todosRepository.find({ where: { id: parseInt(id) } });
  if (todo) {
    await todosRepository.delete(todo);
    return res.status(204).send();
  }
};
