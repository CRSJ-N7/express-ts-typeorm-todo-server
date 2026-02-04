import { Request, Response } from "express";
import { Todo } from "../../entities/Todo";
import todosRepository from "../../utils/repository/todoRepository";

type ToggleAllRes = { message: string };

export const toggleAllStatuses = async (
  req: Request,
  res: Response<ToggleAllRes>,
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
