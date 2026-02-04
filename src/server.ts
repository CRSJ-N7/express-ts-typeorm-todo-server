import { AppDataSource } from "./data-source";
import app from "./app";

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`сервер запущен на http://localhost:${PORT}`),
    );
  })
  .catch((error) => console.log("ошибка подключения к базе:", error));
