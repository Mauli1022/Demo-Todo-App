import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

import todoRoute from "./routes/todos.route.js";

app.use("/api/v1",todoRoute);

export default app ;