import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  //validation
  const [errors, seterrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setfirstName(response.data.firstName);
          setlastName(response.data.lastName);
          setemail(response.data.email);
        })
        .catch((errors) => {
          console.error(errors);
        });
    }
  }, [id]);

  function saveorUpdateEmployee(e) {
    e.preventDefault();
    if (validateform()) {
      const employee = { firstName, lastName, email };
      
      if (id) {
        console.log(employee)
        updateEmployee(id,employee)
          .then((response) => {
            console.log(response.data);
            navigator("/");
          })
          .catch((errors) => {
            console.error(errors);
          });
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator("/");
        }).catch((errors) => {
          console.error(errors);
        });
        console.log(employee);
      }
      
    }
  }

  function validateform() {
    let valid = true;

    const errorscopy = { ...errors };

    if (firstName.trim()) {
      errorscopy.firstName = "";
    } else {
      errorscopy.firstName = "FirstName is Empty";
      valid = false;
    }
    if (lastName.trim()) {
      errorscopy.lastName = "";
    } else {
      errorscopy.lastName = "LastName is Empty";
      valid = false;
    }
    if (email.trim()) {
      errorscopy.email = "";
    } else {
      errorscopy.email = "Email is Empty";
      valid = false;
    }
    seterrors(errorscopy);
    return valid;
  }

  function pageTitle() {
    console.log(id);
    if (id) {
      return <h2 className="text-center mt-2">Update Employee</h2>;
    } else {
      return <h2 className="text-center mt-2">Add New Employee</h2>;
    }
  }

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="card col-md-6 offset-md-3 bg-skylue">
          {pageTitle()}
          <div className="card-body">
            <form action="#">
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setfirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setlastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
                <label className="form-label">Last Name</label>
                <input
                  type="email"
                  placeholder="Employee EmailId"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setemail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-primary mt-2"
                onClick={saveorUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
