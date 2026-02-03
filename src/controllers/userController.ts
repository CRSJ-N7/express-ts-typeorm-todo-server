import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

type DeletUserParams = {
  id: string;
};
type CreateUserRes = { message: string } | User;

type UserReq = {
  name: string;
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.json(users);
};

export const createUser = async (
  req: Request<{}, {}, UserReq>,
  res: Response<CreateUserRes>,
) => {
  if (!req.body) {
    return res.status(400).json({ message: "реквест отсутствует" });
  }
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ message: "Имя обязательно и должно быть строкой" });
  }

  const isUserExist = await userRepository.exists({ where: { name } });
  if (isUserExist) {
    return res.json({ message: `${name} уже существует. Придумай другое` });
  }
  const newUser = userRepository.create({ name });
  await userRepository.save(newUser);
  res.status(201).json(newUser);
};

export const deleteUser = async (
  req: Request<DeletUserParams>,
  res: Response<{ message: string }>, // почему плохо будет { message: string } | void
) => {
  const { id } = req.params;

  const user = await userRepository.findOneBy({ id: parseInt(id) });
  if (!user) return res.status(404).json({ message: "Пользователь не найден" });

  await userRepository.remove(user);
  res.status(204).send();
};
