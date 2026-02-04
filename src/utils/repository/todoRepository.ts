import { AppDataSource } from "../../data-source";
import { Todo } from "../../entities/Todo";

const todosRepository = AppDataSource.getRepository(Todo);

export default todosRepository;
