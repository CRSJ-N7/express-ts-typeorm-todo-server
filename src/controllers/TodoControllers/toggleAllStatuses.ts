import { Request, Response } from "express";
import { Todo } from "../../entities/Todo";
import todosRepository from "../../db/repository/todoRepository";

type ToggleAllRes = { message: string };

export const toggleAllStatuses = async (
  req: Request,
  res: Response<ToggleAllRes>,
) => {
  const todos = await todosRepository.find();
  if (todos.length === 0) {
    return res.json({ message: "в бд нет тудух" });
  }

  const atLeastOneNoNCompleted = todos.some((todo) => !todo.isCompleted);

  let setCondition;
  if (atLeastOneNoNCompleted) {
    setCondition = { isCompleted: true };
  } else {
    setCondition = { isCompleted: false };
  }

  await todosRepository
    .createQueryBuilder()
    .update(Todo)
    .set(setCondition)
    .execute();

  return res.status(200).json({ message: "статусы toggled успешно" });
};
