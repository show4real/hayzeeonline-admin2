import React, { useState, useRef, useEffect } from "react";
import { Modal, Input } from "reactstrap";
import { Col, Row, Form, ButtonGroup } from "react-bootstrap";

import { Button } from "antd";
import axios from "axios";
import settings from "../services/settings";
import { authService } from "../services/authService";
import SpinDiv from "../components/SpinDiv";
import { Select } from "antd";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const { Option } = Select;

const AddPrice = ({ priceedit, toggle, saved, referrers }) => {
  // const [referrers, setReferrers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState("");
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);

  const [saving, setSaving] = useState(false);

  const [comment, setComment] = useState(null);
  const [errors, setErrors] = useState({
    comment: "",
  });

  const handleStartDateFilter = (selectedDate) => {
    setStartDate(selectedDate);
  };

  const handleEndDateFilter = (selectedDate) => {
    setEndDate(selectedDate);
  };

  const validate = (name, value) => {
    switch (name) {
      case "comment":
        return !value ? "Comment is required" : "";
      default:
        return "";
    }
  };

  useEffect(() => {
    // fetchReferrers();
  }, []);

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
  const handleCommentInput = (e) => {
    const { name, value } = e.target;
    setComment(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (percentage === "") {
      validationErrors.percentage = "Percentage is required";
    }

    if (start_date === null) {
      validationErrors.start_date = "Start date is required";
    }

    if (end_date === null) {
      validationErrors.end_date = "End date is required";
    }

    if (comment === null) {
      validationErrors.comment = "Comment is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    const data = new FormData();
    data.set("percentage", percentage);
    data.set("start_date", moment(start_date).format("YYYY-MM-DD HH:mm:ss"));
    data.set("end_date", moment(end_date).format("YYYY-MM-DD HH:mm:ss"));
    data.set("comment", comment);

    return axios
      .post(
        `${settings.API_URL}update/price`,
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
      })
      .catch((err) => {
        console.error(err);
        setSaving(false);
      });
  };

  return (
    <Modal
      className="modal-dialog modal-dialog-top"
      isOpen={priceedit !== null}
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
            <h4 className="card-title">Add Price Edit</h4>
            <p className="card-description"> </p>
            <form className="forms-sample">
              <Row>
                <Col md={12}>
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
                  <label className="label">Start Date</label>
                  <Datetime
                    value={start_date}
                    dateFormat={"MMM D, YYYY"}
                    closeOnSelect
                    onChange={handleStartDateFilter}
                    inputProps={{
                      required: true,
                      className: "form-control date-width",
                    }}
                    style={{ width: "100%" }}
                    timeFormat={false}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                      }}
                      className="text-danger"
                    >
                      {errors.start_date}
                    </span>
                  </div>
                </Col>
                <Col md={6}>
                  <label className="label">End Date</label>
                  <Datetime
                    value={end_date}
                    dateFormat={"MMM D, YYYY"}
                    closeOnSelect
                    onChange={handleEndDateFilter}
                    inputProps={{
                      required: true,
                      className: "form-control date-width",
                    }}
                    style={{ width: "100%" }}
                    timeFormat={false}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                      }}
                      className="text-danger"
                    >
                      {errors.end_date}
                    </span>
                  </div>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <label className="label">Comment</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter a short comment"
                      name="comment"
                      value={comment}
                      onChange={handleCommentInput}
                    />
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                        }}
                        className="text-danger"
                      >
                        {errors.comment}
                      </span>
                    </div>
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

export default AddPrice;
