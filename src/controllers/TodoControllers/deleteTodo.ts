import { Request, Response } from "express";
import todosRepository from "../../utils/repository/todoRepository";

type DeleteReq = { id: string };
type DeleteRes = { message: string } | void;

export const deleteTodo = async (
  req: Request<DeleteReq>,
  res: Response<DeleteRes>,
) => {
  const { id } = req.params;

  const todo = await todosRepository.find({ where: { id: parseInt(id) } });
  if (!todo.length) {
    return res
      .status(404)
      .json({ message: "а чото я такой тудухи не могу найти, прикол" });
  } else {
    await todosRepository.delete(todo);
    return res.status(204).send();
  }
};
