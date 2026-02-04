import express from "express";
import userRoutes from "./routes/userRoutes";
import todosRoutes from "./routes/todosRoutes";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/todos", todosRoutes);
app.get("/", (req, res) => res.send("сервер работает"));

export default app;
