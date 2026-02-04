import { Request, Response } from "express";
import todosRepository from "../../utils/repository/todoRepository";
import { Todo } from "../../entities/Todo";

type UpdateReqParams = { id: string };
type UpdateReqBody = { title?: string; isCompleted?: boolean };
type UpdateRes = { message: string } | Todo;

export const updateTodo = async (
  req: Request<UpdateReqParams, {}, UpdateReqBody>,
  res: Response<UpdateRes>,
) => {
  const { id } = req.params;
  let { title, isCompleted } = req.body;

  const todo = await todosRepository.findOne({ where: { id: parseInt(id) } });
  if (!todo) {
    return res
      .status(404)
      .json({ message: "ты долбаёб? у меня нет такого id, пшёл нахуй отсюда" });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      return res
        .status(400)
        .json({ message: `тайтл: ${title} не валиден для создания тудухи` });
    }
  }
  if (isCompleted !== undefined) {
    if (typeof isCompleted !== "boolean") {
      return res
        .status(400)
        .json({ message: "хуёвый у тебя статус, должно быть булевое" });
    }
  }

  todo.title = title?.trim() ?? todo.title;
  todo.isCompleted = isCompleted ?? todo.isCompleted;

  await todosRepository.save(todo);
  return res.status(200).json(todo);
};
