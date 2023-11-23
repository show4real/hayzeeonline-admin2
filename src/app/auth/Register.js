import React, { Component } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/authService";

import { Button } from "antd";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      err: { email: "" },
      fields: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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

  handleSubmit = (e) => {
    const { fields } = this.state;

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
      fields.password
    ) {
      const data = {
        firstname: fields.firstName,
        lastname: fields.lastName,
        email: fields.email,
        password: fields.password,
      };
      const { firstname, lastname, email, password } = data;
      console.log(firstname);

      this.setState({ saving: true });
      register({ firstname, lastname, email, password })
        .then((v) => {
          this.setState({
            fields: {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            },
            err: {
              email: "",
            },
            saving: false,
          });
          //   this.props.alert.success("Registration successful -> Login below");
          this.props.alert.show(
            <div style={{ color: "white", backgroundColor: "success" }}>
              Registration successful - Login below
            </div>
          );
        })
        .catch((err) => {
          console.log(err);
          this.setState({ err, saving: false });
        });
    }
  };
  render() {
    const { fields, errors, err, saving } = this.state;
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img
                    src={require("../../assets/images/logo-dark.svg")}
                    alt="logo"
                  />
                </div>
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up as Vendor</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="First Name"
                      name="firstName"
                      value={fields.firstName}
                      onChange={(event) => this.handleUserInput(event)}
                    />
                    <div>
                      <span className="text-danger">{errors.firstName}</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control form-control-lg"
                      placeholder="Last Name"
                      value={fields.lastName}
                      onChange={(event) => this.handleUserInput(event)}
                    />
                    <div>
                      <span style={{}} className="text-danger">
                        {errors.lastName}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email Address"
                      value={fields.email}
                      name="email"
                      onChange={(event) => this.handleUserInput(event)}
                    />
                    <div>
                      <span className="text-danger">{errors.email}</span>
                      {err.email !== "" && (
                        <span className="text-danger">{err.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      name="password"
                      placeholder="Password"
                      value={fields.password}
                      onChange={(event) => this.handleUserInput(event)}
                    />
                    <div>
                      <span className="text-danger">{errors.password}</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Confirm Password"
                      value={fields.confirmPassword}
                      onChange={(event) => this.handleUserInput(event)}
                    />
                    <div>
                      <span className="text-danger">
                        {errors.confirmPassword}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      className="btn btn-block btn-primary btn-lg"
                      style={{ padding: 20, paddingBottom: 30 }}
                      type="submit"
                      loading={saving}
                      onClick={this.handleSubmit}
                    >
                      SIGN UP
                    </Button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-primary">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
