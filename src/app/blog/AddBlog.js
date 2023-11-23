import React, { useState, useRef } from "react";
import { Modal } from "reactstrap";
import { Col, Row, Form } from "react-bootstrap";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import settings from "../services/settings";
import { authService } from "../services/authService";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog = ({ addBlog, toggle }) => {
  const [saving, setSaving] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [image, setImage] = useState("");
  const [fields, setFields] = useState({ name: "" });
  const [errors, setErrors] = useState({ name: "", image: "" });
  const [description, setDescription] = useState("");

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value) {
          return "blog name is Required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

  const handleBlogInput = (e) => {
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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    console.log(selectedImage);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setRotation(0);
  };

  const handleDescription = (description) => {
    setDescription(description);
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

    if (image === "") {
      validationErrors.image = "Image is required";
    }
    if (description === "") {
      validationErrors.description = "description is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    const data = new FormData();
    console.log(image);

    data.set("name", fields.name);
    data.append(`image`, image);
    data.set("description", description);

    return axios
      .post(
        `${settings.API_URL}store/blog`,
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
      isOpen={addBlog !== null}
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
            <h4 className="card-title">Create Blog</h4>

            <form className="forms-sample">
              <Form.Group>
                <label className="label">Blog title</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Post title"
                  name="name"
                  value={fields.name}
                  onChange={handleBlogInput}
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
              <Row>
                <Col md={12}>
                  <label className="label" style={{ display: "block" }}>
                    Blog Image
                  </label>
                  <>
                    <Button onClick={handleClick}> Upload Blog Image</Button>
                    <input
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      type="file"
                      ref={hiddenFileInput}
                      accept="image/*"
                    />
                    <div color="muted">
                      You can only upload jpg, jpeg, and png type
                    </div>
                  </>
                  <Row>
                    <Col md={3}>
                      <div style={{ position: "relative" }}>
                        {image && (
                          <div style={{ position: "relative" }}>
                            <img
                              style={{
                                transform: `rotate(${rotation}deg)`,
                                width: "100%",
                              }}
                              src={image && URL.createObjectURL(image)}
                              alt=""
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                                fontSize: "28px",
                              }}
                            >
                              <DeleteOutlined onClick={handleRemoveImage} />
                            </div>
                          </div>
                        )}

                        {errors.image && (
                          <div className="text-danger" style={{ fontSize: 12 }}>
                            {errors.image}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <label className="label">Description</label>
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={handleDescription}
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
                      {errors.description}
                    </span>
                  </div>
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

export default AddBlog;
