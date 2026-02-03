import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";
import todosRoutes from "./routes/todosRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/todos", todosRoutes);

app.get("/", (req, res) => res.send("сервер работает"));

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Сервер запущен на http://localhost:${PORT}`),
    );
  })
  .catch((error) => console.log("Ошибка подключения к базе:", error));
