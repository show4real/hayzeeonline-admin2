import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";
import { addUser } from "../services/userService";
import { Button } from "antd";

export class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      status: false,
      addUser: props.addUser,
      toggle: props.toggle,
      err: { email: "", phone: "" },
      fields: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
        role: "",
      },
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
      },
    };
  }

  validate = (name, value) => {
    const { fields } = this.state;
    switch (name) {
      case "firstName":
        if (!value || value.trim() === "") {
          return "First name is Required";
        } else {
          return "";
        }
      case "lastName":
        if (!value || value.trim() === "") {
          return "Last name is Required";
        } else {
          return "";
        }
      case "email":
        if (!value) {
          return "Email is Required";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Enter a valid email address";
        } else {
          return "";
        }
      case "phone":
        if (!value || value.trim() === "") {
          return "Phone number is Required";
        } else {
          return "";
        }

      case "address":
        if (!value) {
          return "Address is Required";
        } else {
          return "";
        }
      case "role":
        if (!value) {
          return "Role is Required";
        } else {
          return "";
        }
      case "password":
        if (!value) {
          return "Password is Required";
        } else if (value.length < 8 || value.length > 15) {
          return "Please fill at least 8 character";
        } else {
          return "";
        }
      case "confirmPassword":
        if (!value) {
          return "Confirm Password Required";
        } else if (value !== fields.password) {
          return "New Password and Confirm Password Must be Same";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  handleUserInput = (e) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: this.validate(e.target.name, e.target.value),
      },
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleStatus = (e, state) => {
    this.setState({ [state]: e });
  };

  handleSubmit = (e) => {
    const { fields, status } = this.state;
    console.log(fields.role);

    e.preventDefault();
    let validationErrors = {};
    Object.keys(fields).forEach((name) => {
      const error = this.validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      this.setState({ errors: validationErrors });
      return;
    }
    if (
      fields.firstName &&
      fields.lastName &&
      fields.email &&
      fields.password &&
      fields.phone &&
      fields.address &&
      fields.role
    ) {
      const data = {
        firstname: fields.firstName,
        lastname: fields.lastName,
        email: fields.email,
        password: fields.password,
        address: fields.address,
        phone: fields.phone,
        role: fields.role,
      };
      const role = fields.role;

      const is_active = status === true ? 1 : 0;
      const admin = role == "admin" ? 1 : 0;
      const vendor = role == "vendor" ? 1 : 0;
      const customer = role == "customer" ? 1 : 0;
      const { firstname, lastname, email, password, address, phone } = data;

      this.setState({ saving: true });
      addUser({
        firstname,
        lastname,
        email,
        password,
        address,
        phone,
        is_active,
        admin,
        vendor,
        customer,
      })
        .then((v) => {
          this.setState({
            fields: {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone: "",
              address: "",
              status: false,
            },
            err: {
              email: "",
            },
            saving: false,
          });
          //   this.props.alert.success("Registration successful -> Login below");
          this.props.toggle();
          this.props.saved();
        })
        .catch((err) => {
          console.log(err);
          this.setState({ err, saving: false });
        });
    }
  };
  render() {
    const { addUser, toggle, loading, saving, fields, errors, err, status } =
      this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={addUser != null}
        toggle={() => !loading && !saving && toggle}
        style={{ maxWidth: 700, paddingLeft: 100 }}
      >
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggle}
              >
                <span aria-hidden={true}>×</span>
              </button>
              <h4 className="card-title">Create User</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Last Name</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Last Name"
                    name="lastName"
                    value={fields.lastName}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.lastName}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputName1">First Name</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="First Name"
                    name="firstName"
                    value={fields.firstName}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.firstName}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputEmail3">Email address</label>
                  <Form.Control
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email Address"
                    value={fields.email}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.email}
                      {err && err.email}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputEmail3">Email Phone Number</label>
                  <Form.Control
                    type="number"
                    className="form-control"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={fields.phone}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.phone}
                      {err.phone}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputPassword4">Password</label>
                  <Form.Control
                    type="password"
                    name="password"
                    className="form-control"
                    id="exampleInputPassword4"
                    placeholder="Password"
                    value={fields.password}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.password}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputPassword4">
                    Confirm Password
                  </label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={fields.confirmPassword}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.confirmPassword}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="form-check">
                    <label
                      style={{ paddingLeft: 5 }}
                      className="form-check-label"
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={status}
                        onChange={async (e) => {
                          await this.handleStatus(e.target.checked, "status");
                        }}
                      />
                      <i className="input-helper"></i>
                      Status
                    </label>
                  </div>
                  <div
                    style={{ display: "inline-table" }}
                    className="form-check form-check-primary"
                  >
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        value="admin"
                        onChange={(event) => this.handleUserInput(event)}
                      />{" "}
                      Admin
                      <i
                        style={{ paddingLeft: 5 }}
                        className="input-helper"
                      ></i>
                    </label>
                  </div>
                  <div
                    style={{ display: "inline-table" }}
                    className="form-check form-check-primary"
                  >
                    <label
                      style={{ paddingLeft: 7 }}
                      className="form-check-label"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        value="vendor"
                        onChange={(event) => this.handleUserInput(event)}
                      />{" "}
                      Vendor
                      <i
                        style={{ paddingLeft: 5 }}
                        className="input-helper"
                      ></i>
                    </label>
                  </div>
                  <span
                    style={{ display: "inline-table" }}
                    className="form-check form-check-primay"
                  >
                    <label
                      style={{ paddingLeft: 5 }}
                      className="form-check-label"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        value="customer"
                        onChange={(event) => this.handleUserInput(event)}
                      />{" "}
                      Customer
                      <i
                        style={{ paddingLeft: 5 }}
                        className="input-helper"
                      ></i>
                    </label>
                  </span>
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.role}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleTextarea1">Address</label>
                  <textarea
                    className="form-control"
                    id="exampleTextarea1"
                    rows="4"
                    name="address"
                    value={fields.address}
                    onChange={(event) => this.handleUserInput(event)}
                  ></textarea>
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.address}
                    </span>
                  </div>
                </Form.Group>
                <div style={{ float: "right" }}>
                  <Button
                    className="btn btn-outline-dark btn-sm"
                    type="submit"
                    loading={saving}
                    onClick={this.handleSubmit}
                  >
                    Save
                  </Button>

                  <button
                    onClick={toggle}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddUser;
