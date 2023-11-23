import React, { useState, useRef, useEffect } from "react";
import { Modal } from "reactstrap";
import { Col, Row, Form } from "react-bootstrap";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import settings from "../services/settings";
import { authService } from "../services/authService";

const EditBrand = ({ brand, toggle }) => {
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState(null);
  const [fields, setFields] = useState({
    name: brand.name,
  });
  const [errors, setErrors] = useState({
    name: "",
  });
  const [rotation, setRotation] = useState(0);

  const hiddenFileInput = useRef(null);

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return !value ? "Brand name is required" : "";

      default:
        return "";
    }
  };

  useEffect(() => {
    fetchImageFileAndSetState();
  }, []);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
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

  const handleBrandInput = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validate(name, value),
    });
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const fetchImageFile = async (imageUrl) => {
    const response = await fetch(imageUrl);

    if (response.status === 200) {
      const blob = await response.blob();
      return new File([blob], `${imageUrl}`, { type: blob.type });
    }
    return null;
  };

  const fetchImageFileAndSetState = async () => {
    const file = await fetchImageFile(brand.image_url);
    setImage(file);
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

    if (image === "") {
      validationErrors.image = "Image is required";
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

    return axios
      .post(
        `${settings.API_URL}update/brand/${brand.id}`,
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
      className="modal-dialog modal-dialog-centered"
      isOpen={brand != null}
      toggle={toggle}
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
            <h4 className="card-title">Edit Brand</h4>

            <p className="card-description"> </p>
            <form className="forms-sample">
              <Form.Group>
                <label htmlFor="exampleInputName1">Brand Name</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="Last Name"
                  name="name"
                  value={fields.name}
                  onChange={handleBrandInput}
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
                    Brand Image
                  </label>
                  <>
                    <Button onClick={handleClick}> Upload Brand Image</Button>
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

export default EditBrand;
