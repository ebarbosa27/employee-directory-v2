import express from "express";
const app = express();
export default app;

import router from "#routes/employees";

app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", router);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});
