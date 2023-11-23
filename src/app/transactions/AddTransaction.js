import React, { useState, useRef, useEffect } from "react";
import { Modal, Input } from "reactstrap";
import { Col, Row, Form, ButtonGroup } from "react-bootstrap";

import { Button } from "antd";
import axios from "axios";
import settings from "../services/settings";
import { authService } from "../services/authService";
import { getAllReferrers } from "../services/orderService";
import SpinDiv from "../components/SpinDiv";
import { Select } from "antd";

const { Option } = Select;

const AddTransaction = ({ transaction, toggle, saved, referrers }) => {
  // const [referrers, setReferrers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState("");
  const [cost, setCost] = useState("");

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(true);
  const [referrer_code, setReferrerCode] = useState("");

  const [fields, setFields] = useState({
    referrer_code: "",
  });
  const [errors, setErrors] = useState({
    referrer_code: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "referrer_code":
        return !value ? "Referer is required" : "";
      default:
        return "";
    }
  };

  useEffect(() => {
    // fetchReferrers();
  }, []);

  // const fetchReferrers = () => {
  //   setLoading(true);
  //   getAllReferrers()
  //     .then((res) => {
  //       setReferrers(res.referrers);

  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const handleStatus = (e) => {
    setStatus(e.target.checked);
  };

  // const handleTransactionInput = (e) => {
  //   const { name, value } = e.target;

  //   setFields((prevFields) => ({
  //     ...prevFields,
  //     [name]: value,
  //   }));
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: validate(name, value),
  //   }));
  // };

  const handlePercentageChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setPercentage(value);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setCost(value);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handleSelectChange = (value) => {
    console.log("Selected Referrer Code:", value);
    const name = "referrer_code";

    setReferrerCode(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    // Object.keys(fields).forEach((name) => {
    //   const error = validate(name, fields[name]);
    //   if (error && error.length > 0) {
    //     validationErrors[name] = error;
    //   }
    // });

    if (percentage === "") {
      validationErrors.percentage = "Percentage is required";
    }

    if (cost === "") {
      validationErrors.cost = "Product cost is required";
    }

    if (referrer_code === "") {
      validationErrors.referrer_code = "Referrer is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    const data = new FormData();

    data.set("status", status ? 1 : 0);
    data.set("percentage", percentage);
    data.set("product_cost", cost);
    data.set("referrer_code", referrer_code);

    return axios
      .post(
        `${settings.API_URL}add/transactions`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        },
        authService.handleResponse
      )
      .then((res) => {
        setSaving(false);
        toggle();
        saved();
      })
      .catch((err) => {
        console.error(err);
        setSaving(false);
      });
  };

  return (
    <Modal
      className="modal-dialog modal-dialog-top"
      isOpen={transaction !== null}
      toggle={toggle}
      style={{ maxWidth: "70%", paddingLeft: 100 }}
    >
      {loading && <SpinDiv text={"loading..."} />}
      <div className="col-12">
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
            <h4 className="card-title">Add Transaction</h4>
            <p className="card-description"> </p>
            <form className="forms-sample">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">Percentage</label>
                    <Form.Control
                      type="text"
                      value={percentage}
                      onChange={handlePercentageChange}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      className="form-control"
                      placeholder="Enter Percentage"
                      name="percentage"
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
                        {errors.percentage}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">Product Cost</label>
                    <Form.Control
                      type="text"
                      value={cost}
                      onChange={handleCostChange}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      className="form-control"
                      placeholder="Enter Product cost"
                      name="cost"
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
                        {errors.cost}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={8}>
                  <Form.Group>
                    <label className="label">Referrer</label>
                    <div>
                      <Select
                        showSearch
                        placeholder="Select a referrer"
                        style={{ width: "400px" }}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={handleSelectChange}
                      >
                        {referrers.map((referrer) => {
                          if (referrer.status == 1) {
                            return (
                              <Option
                                key={referrer.referral_code}
                                value={referrer.referral_code}
                              >
                                {referrer.referral_code + `(${referrer.name})`}
                              </Option>
                            );
                          }
                        })}
                      </Select>
                    </div>

                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                        className="text-danger"
                      >
                        {errors.referrer_code}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {referrer_code &&
                  referrers
                    .filter(
                      (referrer) => referrer.referral_code === referrer_code
                    )
                    .map((filteredReferrer, index) => (
                      <Row key={index}>
                        <Col md={6}>
                          <Form.Group>
                            <label className="label">Account Name</label>
                            <Form.Control
                              type="text"
                              value={filteredReferrer.account_name}
                              // onChange={handleCostChange}
                              // pattern="[0-9]*"
                              // inputMode="numeric"
                              className="form-control"
                              // placeholder="Enter Product cost"
                              // name="cost"
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <label className="label">Account Number</label>
                            <Form.Control
                              type="text"
                              value={filteredReferrer.account_number}
                              // onChange={handleCostChange}
                              // pattern="[0-9]*"
                              // inputMode="numeric"
                              className="form-control"
                              // placeholder="Enter Product cost"
                              // name="cost"
                              disabled
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <label className="label">Account Type</label>
                            <Form.Control
                              type="text"
                              value={filteredReferrer.account_type}
                              // onChange={handleCostChange}
                              // pattern="[0-9]*"
                              // inputMode="numeric"
                              className="form-control"
                              // placeholder="Enter Product cost"
                              // name="cost"
                              disabled
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <label className="label">Bank Name</label>
                            <Form.Control
                              type="text"
                              value={filteredReferrer.bank_name}
                              // onChange={handleCostChange}
                              // pattern="[0-9]*"
                              // inputMode="numeric"
                              className="form-control"
                              // placeholder="Enter Product cost"
                              // name="cost"
                              disabled
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    ))}
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <label
                      className="label"
                      style={{ display: "block", paddingRight: 20 }}
                    >
                      {" "}
                      Status
                    </label>
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      checked={status}
                      onChange={handleStatus}
                    />
                    <i className="input-helper"></i>
                  </Form.Group>
                </Col>
              </Row>

              <div style={{ float: "right" }}>
                <Button
                  className="btn btn-outline-dark btn-sm"
                  type="submit"
                  loading={saving}
                  onClick={handleSubmit}
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
};

export default AddTransaction;
