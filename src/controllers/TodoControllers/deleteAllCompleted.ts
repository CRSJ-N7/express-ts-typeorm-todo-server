import { Request, Response } from "express";
import todosRepository from "../../db/repository/todoRepository";

type DeleteCompletedRes = { message: string };

export const deleteAllCompleted = async (
  req: Request,
  res: Response<DeleteCompletedRes>,
) => {
  await todosRepository.delete({ isCompleted: true });
  return res.status(200).json({ message: "все комплитнутые таски удалены" });
};
