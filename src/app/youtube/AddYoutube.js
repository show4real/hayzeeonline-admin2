import React, { useState, useRef } from "react";
import { Modal } from "reactstrap";
import { Col, Row, Form } from "react-bootstrap";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import settings from "../services/settings";
import { authService } from "../services/authService";

const AddYoutube = ({ addYoutube, toggle }) => {
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState({ name: "" });
  const [errors, setErrors] = useState({ name: "" });

  const hiddenFileInput = useRef(null);

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value) {
          return "Youtube ID is Required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

  const handleYoutubeInput = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(fields).forEach((name) => {
      const error = validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    const data = new FormData();

    data.set("youtubeid", fields.name);

    return axios
      .post(
        `${settings.API_URL}store/youtube`,
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
      isOpen={addYoutube !== null}
      toggle={toggle}
      style={{ maxWidth: "70%", paddingLeft: 100 }}
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
            <h4 className="card-title">Create Youtube</h4>

            <form className="forms-sample">
              <Form.Group>
                <label className="label">Youtube ID</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Youtube ID"
                  name="name"
                  value={fields.name}
                  onChange={handleYoutubeInput}
                />
                <div>
                  <span
                    style={{
                      paddingTop: 10,
                      fontSize: 12,
                    }}
                    className="text-danger"
                  >
                    {errors.name}
                  </span>
                </div>
              </Form.Group>

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

export default AddYoutube;
