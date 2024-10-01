function fetchEmployees() {
  fetch("http://localhost:3000/api/v1/employee")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("dataTable");
      tableBody.innerHTML = "";
      const list = data.data;
      list.forEach((item) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.dataset.id_cell = true;
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}

const submitButton = document.querySelector("button[type='submit']");

// TODO
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  createEmployee();
});

// TODO
// NOTE: this way is better than cluttering the event loop with so many event listeners
document.addEventListener("click", (e) => {
  if (e.target && e.target.className.includes("btn-danger")) {
    const id =
      e.target.parentElement.parentElement.querySelector("[data-id_cell]");
    deleteEmployee(id?.textContent);
  }
});

// TODO
async function createEmployee() {
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;

  const response = await fetch("http://localhost:3000/api/v1/employee", {
    method: "POST",
    // NOTE: Content-Type is important
    // it tells the server what type of data is being sent
    // that way the server can parse the data correctly
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name }),
  });

  const data = await response.json();
  if (data.message) {
    alert(data.message);
    return;
  }
  alert(data.data.newEmployee.name + " has been added successfully");

  fetchEmployees();
}

// TODO
async function deleteEmployee(id) {
  if (!id) {
    alert("Invalid id");
  }

  const response = await fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  alert(data.data.deletedEmployee.name + " has been deleted successfully");

  fetchEmployees();
}

fetchEmployees();
