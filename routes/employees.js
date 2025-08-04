import express from "express";

import employees from "#db/employees";

const router = express.Router();

router.route("/").get((req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /:id.
router.route("/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.route("/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

router.route("/").post((req, res) => {
  const { name } = req.body ?? {};

  if (!name) {
    res.status(400).send({
      status: "error",
      message: "Request requires name.",
    });
  }
  const employeeId = employees.length + 1;
  employees.push({
    id: employeeId,
    name: name,
  });

  res.status(201).json(employees);
});

export default router;
