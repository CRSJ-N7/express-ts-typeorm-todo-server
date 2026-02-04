import { Request, Response } from "express";
import todosRepository from "../../utils/repository/todoRepository";
import { Todo } from "../../entities/Todo";

type UpdateReqParams = { id: string };
type UpdateReqBody = { text?: string; isCompleted?: boolean };
type UpdateRes = { message: string } | Todo;

export const updateTodo = async (
  req: Request<UpdateReqParams, {}, UpdateReqBody>,
  res: Response<UpdateRes>,
) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "выйди блять и зайди обратно с id" });
  }

  const todo = await todosRepository.findOne({ where: { id: parseInt(id) } });
  if (!todo) {
    return res
      .status(404)
      .json({ message: "ты долбаёб? у меня нет такого id, пшёл нахуй отсюда" });
  }

  todo.text = req.body.text ?? todo.text;
  todo.isCompleted = req.body.isCompleted ?? todo.isCompleted;

  await todosRepository.save(todo);
  return res.status(200).json(todo);
};
