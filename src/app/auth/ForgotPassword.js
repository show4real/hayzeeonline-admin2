import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Spinner,
  Button,
  Container,
  InputGroup,
} from "react-bootstrap";

import { Link } from "react-router-dom";

// import { toast } from "react-toastify";
import { sendrecovery } from "../services/authService";
import SpinDiv from "../components/SpinDiv";

export class ForgotPassword extends Component {
  state = {
    email: "",
    loading: false,
    error: null,
    show: false,
    saved: false,
    saving: false,
  };

  onChange = (e, state) => {
    this.setState({ [state]: e });
  };

  isValid = () => {
    const { email } = this.state;
    const emailreg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email != null && emailreg.test(email.trim())) {
      return true;
    }
  };

  // showToast = (msg) => {
  //   toast(<div style={{ padding: 20 }}>{msg}</div>);
  // };

  onSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    this.setState({ saving: true });
    sendrecovery({ email }).then(
      (v) => {
        this.setState({ saving: false, email: "", saved: true });
        this.props.alert.show(
          <div style={{ color: "white", textTransform: "capitalize" }}>
            Password reset link sent
          </div>,
          {
            timeout: 2000, // custom timeout just for this one alert
            type: "success",
          }
        );
      },
      (error) => {
        this.setState({ loading: false, saving: false, email: "" });
        this.props.alert.show(
          <div style={{ color: "white", textTransform: "capitalize" }}>
            Reset Link could not be sent
          </div>,
          {
            timeout: 2000, // custom timeout just for this one alert
            type: "error",
          }
        );
      }
    );
  };
  render() {
    const { show, saved, saving, loading, email } = this.state;
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-6 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img
                    src={require("../../assets/images/logo-dark.svg")}
                    alt="logo"
                  />
                  <main>
                    {saving && <SpinDiv text={"Sending..."} />}
                    <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
                      <Container>
                        <Row className="justify-content-center">
                          <p className="text-center"></p>

                          <Col
                            xs={12}
                            className="d-flex align-items-center justify-content-center"
                          >
                            {!saved ? (
                              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <h3>Forgot your password?</h3>
                                <p className="mb-4">
                                  Don't fret! Just type in your email and we
                                  will send you a code to reset your password!
                                </p>
                                <Form>
                                  <div className="mb-4">
                                    <Form.Label htmlFor="email">
                                      Your Email
                                    </Form.Label>
                                    <InputGroup id="email">
                                      <Form.Control
                                        placeholder="Enter Your Account email"
                                        type="text"
                                        value={email}
                                        onChange={(e) =>
                                          this.onChange(e.target.value, "email")
                                        }
                                      />
                                    </InputGroup>
                                  </div>
                                  <div className="text-center">
                                    <Button
                                      variant="primary"
                                      type="submit"
                                      className="w-100"
                                      disabled={!this.isValid() || loading}
                                      onClick={this.onSubmit}
                                    >
                                      {loading ? (
                                        <Spinner
                                          animation="grow"
                                          variant="light"
                                        />
                                      ) : (
                                        <span> Recover password</span>
                                      )}
                                    </Button>
                                  </div>
                                </Form>
                                <div style={{ float: "right", paddingTop: 20 }}>
                                  <Card.Link
                                    as={Link}
                                    to=""
                                    className="text-gray-700"
                                  >
                                    <FontAwesomeIcon
                                      icon={faAngleLeft}
                                      className="me-2"
                                    />{" "}
                                    Back to sign in
                                  </Card.Link>
                                </div>
                              </div>
                            ) : (
                              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <h3>Mail Sent Sucessfully</h3>
                                <p className="mb-4">
                                  Please check your Email for password reset
                                  Link!
                                </p>
                                <div className="my-2 d-flex justify-content-between align-items-center">
                                  <Link
                                    to="/auth/login"
                                    className="auth-link text-black"
                                  >
                                    <FontAwesomeIcon
                                      icon={faAngleLeft}
                                      className="me-2"
                                    />{" "}
                                    Back to sign in
                                  </Link>
                                </div>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </Container>
                    </section>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
