import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCommentsDollar,
  faEnvelope,
  faSignOutAlt,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { recoverPassword, resetPassword } from "../services/userService";

import SpinDiv from "../components/SpinDiv";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      user: "",
      expiry: false,
      loading: false,
      saving: false,
      submitted: false,
      password: "",
      confirm_password: "",
      saved: false,
    };
  }

  onChange = (e, state) => {
    this.setState({ [state]: e });
  };

  componentDidMount() {
    this.getUser();
  }
  getUser = () => {
    const { id } = this.state;
    this.setState({ loading: true });
    recoverPassword(id).then(
      (res) => {
        this.setState({
          user: res.user,
          // expiry:res.expiry,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  onResetPassword = async (e) => {
    e.preventDefault();

    const { password, confirm_password, validation } = this.state;
    this.setState({ submitted: true });
    let check_password = password.length >= 5 ? true : false;
    let checkconfirm_password = confirm_password === password ? true : false;
    console.log(check_password);
    await this.setState({
      validation: {
        ...validation,
        confirm_password:
          confirm_password !== "" && confirm_password !== undefined,
        password: password !== "" && password !== undefined,
      },
    });
    if (
      Object.values(this.state.validation).every(Boolean) &&
      check_password &&
      checkconfirm_password
    ) {
      this.setState({ submitted: false });
      this.resetPassword();
    } else {
      const errors = Object.keys(this.state.validation).filter((id) => {
        return !this.state.validation[id];
      });

      this.props.alert.show(
        <div style={{ color: "white", textTransform: "capitalize" }}>
          {errors.map((v) => (
            <p key={v} style={{ margin: 0, fontSize: 14, color: "red" }}>
              * {this.validationRules(v)}
            </p>
          ))}
        </div>,
        {
          timeout: 2000, // custom timeout just for this one alert
          type: "success",
        }
      );
    }
  };

  resetPassword = () => {
    this.setState({ saving: true });
    const { password, id } = this.state;
    console.log(password);
    resetPassword({
      password: password,
      recovery_code: id,
    }).then(
      (res) => {
        console.log(res);
        this.setState({
          loading: false,
          saving: false,
          saved: true,
          password: "",
          confirm_password: "",
        });
        this.props.alert.show(
          <div style={{ color: "white", textTransform: "capitalize" }}>
            Password has been reset
          </div>,
          {
            timeout: 2000, // custom timeout just for this one alert
            type: "success",
          }
        );
      },
      (err) => {
        if (err) {
          this.props.alert.show(
            <div style={{ color: "white", textTransform: "capitalize" }}>
              Could not reset password
            </div>,
            {
              timeout: 2000, // custom timeout just for this one alert
              type: "error",
            }
          );
          this.setState({ saving: false });
        }
        this.setState({ loading: false });
      }
    );
  };

  validationRules = (field) => {
    if (field === "password") {
      return "Password is required";
    } else if (field == "confirm_password") {
      return "Confirm Password is required";
    }
  };

  render() {
    const {
      user,
      saved,
      submitted,
      loading,
      saving,
      password,
      confirm_password,
    } = this.state;

    return (
      <>
        {/* {console.log(user)} */}
        {saving && <SpinDiv text={"Saving..."} />}
        {loading && <SpinDiv text={"loading..."} />}
        {user !== "" && !saved ? (
          <div>
            <div className="d-flex align-items-center auth px-0">
              <div className="row w-100 mx-0">
                <Col md={4}></Col>
                <div className="col-lg-8 mx-auto">
                  <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                    <div className="brand-logo">
                      <img
                        src={require("../../assets/images/logo-dark.svg")}
                        alt="logo"
                      />
                    </div>
                    <Container>
                      <Row className="justify-content-center">
                        <p className="text-center">
                          <Card.Link as={Link} to="" className="text-gray-700">
                            <FontAwesomeIcon
                              icon={faAngleLeft}
                              className="me-2"
                            />{" "}
                            Back to sign in
                          </Card.Link>
                        </p>
                        <Col
                          xs={12}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <h3 className="mb-4">Reset password</h3>
                            <Form>
                              <Form.Group id="password" className="mb-4">
                                <Form.Label>Your Password</Form.Label>
                                <InputGroup>
                                  <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUnlockAlt} />
                                  </InputGroup.Text>
                                  <Form.Control
                                    value={password}
                                    onChange={async (e) => {
                                      await this.onChange(
                                        e.target.value,
                                        "password"
                                      );
                                    }}
                                    required
                                    type="password"
                                    placeholder="Password"
                                  />
                                </InputGroup>
                                {submitted && !password && (
                                  <div style={{ color: "red" }}>
                                    Password is required
                                  </div>
                                )}
                                {submitted && password.length < 5 && (
                                  <div style={{ color: "red" }}>
                                    Password must be more than 5 characters
                                  </div>
                                )}
                              </Form.Group>
                              <Form.Group id="confirmPassword" className="mb-4">
                                <Form.Label>Confirm Password</Form.Label>
                                <InputGroup>
                                  <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUnlockAlt} />
                                  </InputGroup.Text>
                                  <Form.Control
                                    value={confirm_password}
                                    onChange={async (e) => {
                                      await this.onChange(
                                        e.target.value,
                                        "confirm_password"
                                      );
                                    }}
                                    type="password"
                                    placeholder="Confirm Password"
                                  />
                                </InputGroup>
                                {submitted && !confirm_password && (
                                  <div style={{ color: "red" }}>
                                    confirm password is required
                                  </div>
                                )}
                                {submitted && password !== confirm_password && (
                                  <div style={{ color: "red" }}>
                                    Confirmed Password do not match
                                  </div>
                                )}
                              </Form.Group>
                              <Button
                                onClick={this.onResetPassword}
                                variant="primary"
                                type="submit"
                                className="w-100"
                              >
                                Reset password
                              </Button>
                            </Form>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex align-items-center auth px-0">
              <div className="row w-100 mx-0">
                <Col md={4}></Col>
                <div className="col-lg-8 mx-auto">
                  <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                    <div className="brand-logo">
                      <img
                        src={require("../../assets/images/logo-dark.svg")}
                        alt="logo"
                      />
                    </div>
                    <Container>
                      <Row className="justify-content-center">
                        <Col
                          xs={12}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <h3 className="text-center">
                              {!loading && user === "" && !saved
                                ? "Invalid Recovery Code"
                                : saved
                                ? ""
                                : "Checking Recovery Code"}
                              {saved && "Password has been Sucessfully Reset"}
                            </h3>
                            <p className="text-center">
                              {console.log(saved)}
                              <Card.Link
                                as={Link}
                                to={
                                  saved
                                    ? "/auth/login"
                                    : "/auth/forgot-password"
                                }
                                className="text-gray-700"
                              >
                                <FontAwesomeIcon
                                  icon={faAngleLeft}
                                  className="me-2"
                                />
                                {saved
                                  ? "Back to Sign In"
                                  : "Back to Forgot Password"}
                              </Card.Link>
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ResetPassword;
