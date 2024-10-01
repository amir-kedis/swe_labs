const employee = [{ id: "1", name: "Amir Kedis" }];

const RESPONSE_CDOE = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CREATED: 201,
  OK: 200,
};

exports.getEmployees = async (_req, res, _next) => {
  res.status(RESPONSE_CDOE.OK).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, _next) => {
  const { id } = req.params;
  const employeeToBeDeleted = employee.find((emp) => emp.id === id);

  if (!employeeToBeDeleted) {
    return res
      .status(RESPONSE_CDOE.NOT_FOUND)
      .json({ message: "Employee not found" });
  }

  const index = employee.indexOf(employeeToBeDeleted);
  employee.splice(index, 1);

  res.status(RESPONSE_CDOE.OK).json({
    data: {
      deletedEmployee: employeeToBeDeleted,
    },
  });
};

// TODO
exports.createEmployee = async (req, res, _next) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res
      .status(RESPONSE_CDOE.BAD_REQUEST)
      .json({ message: "Bad request" });
  }

  if (employee.find((emp) => emp.id === id)) {
    return res
      .status(RESPONSE_CDOE.BAD_REQUEST)
      .json({ message: "Employee already exists" });
  }

  const newEmployee = { id, name };
  employee.push(newEmployee);

  res.status(RESPONSE_CDOE.CREATED).json({
    data: {
      newEmployee,
    },
  });
};
