import React, { useState, useRef, useEffect } from "react";
import { Modal, Input } from "reactstrap";
import { Col, Row, Form, ButtonGroup } from "react-bootstrap";

import { Button } from "antd";
import { LoginOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./CustomFileInput.css";
import settings from "../services/settings";
import { authService } from "../services/authService";
import { getBrands, getCategories } from "../services/categoryService";
import SpinDiv from "../components/SpinDiv";
import { Select, Radio } from "antd";

const AddProduct = ({ product, toggle, saved }) => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [productInfos, setProductInfos] = useState([{ label: "", value: "" }]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [other_sales, setOtherSales] = useState(null);

  const properties = ["Type", "Storage capacity"];

  const storages = [
    "32GB SSD",
    "64GB SSD",
    "128GB SSD",
    "256GB SSD",
    "512GB SSD",
    "1TB SSD",
    "60GB HDD",
    "120GB HDD",
    "250GB HDD",
    "320GB HDD",
    "500GB HDD",
    "1TB HDD",
    "128GB SSHD",
    "256GB SSHD",
    "512GB SSHD",
    "1TB SSHD",
    "128GB SSD + HDD",
    "256GB SSD + HDD",
    "512GB SSD + HDD",
    "1TB SSD + HDD",
  ];
  const rams = [
    "2GB",
    "4GB",
    "6GB",
    "8GB",
    "12GB",
    "16GB",
    "24GB",
    "32GB",
    "64GB",
    "128GB",
    "256GB",
    "512GB",
    "1TB",
  ];
  const processors = [
    "Intel Atom",
    "Intel Celeron",
    "Intel Pentium",
    "Intel Core i3",
    "Intel Core i5",
    "Intel Core i7",
    "Intel Core i9",
    "Intel Core m3",
    "Intel Core m5",
    "Intel Core m7",
    "Intel Xeon",
    "Apple Chip M1",
    "Apple Chip M2",
    "AMD A4",
    "AMD A6",
    "AMD A8",
    "AMD A10",
    "AMD A12",
    "AMD Ryzen 3",
    "AMD Ryzen 5",
    "AMD Ryzen 7",
    "Samsung’s Exynos",
    "Qualcomm’s snapdragon",
  ];

  const productTypes = ["Brand New", "UK Used", "Open Box", "US Used"];

  const laptopProperties = [
    {
      name: "Processor",
      values: [
        "Intel Core i5",
        "Intel Core i7",
        "AMD Ryzen 5",
        "AMD Ryzen 7",
        "Intel Core i9",
        "AMD Ryzen 9",
      ],
    },
    { name: "RAM", values: ["8GB", "16GB", "32GB", "64GB", "128GB"] },
    { name: "Storage Type", values: ["HDD", "SSD", "HDD + SSD", "NVMe SSD"] },
    {
      name: "Storage Capacity",
      values: ["256GB", "512GB", "1TB", "2TB", "4TB"],
    },
    {
      name: "Graphics Card",
      values: [
        "NVIDIA GeForce GTX",
        "NVIDIA GeForce RTX",
        "AMD Radeon",
        "Intel UHD Graphics",
      ],
    },
    {
      name: "Display Size",
      values: ["13.3 inches", "15.6 inches", "17.3 inches"],
    },
    {
      name: "Resolution",
      values: ["Full HD (1920x1080)", "4K UHD (3840x2160)", "QHD (2560x1440)"],
    },
    {
      name: "Operating System",
      values: ["Windows 10", "macOS", "Linux", "Chrome OS"],
    },
    {
      name: "Battery Life",
      values: ["Up to 5 hours", "5-8 hours", "8-12 hours", "12+ hours"],
    },
    { name: "Weight", values: ["1-2 kg", "2-3 kg", "3-4 kg", "4+ kg"] },
    { name: "Touchscreen", values: ["Yes", "No"] },
    { name: "Backlit Keyboard", values: ["Yes", "No"] },
    {
      name: "USB Ports",
      values: ["2x USB 3.0", "2x USB 3.1", "4x USB 3.0", "4x USB 3.1", "USB-C"],
    },
    { name: "HDMI Port", values: ["Yes", "No"] },
    { name: "Webcam", values: ["720p HD", "1080p Full HD"] },
    {
      name: "Bluetooth",
      values: [
        "Bluetooth 4.0",
        "Bluetooth 5.0",
        "Bluetooth 5.1",
        "Bluetooth 5.2",
      ],
    },
    { name: "Wi-Fi", values: ["802.11ac", "Wi-Fi 6 (802.11ax)"] },
    { name: "Ethernet", values: ["Yes", "No"] },
    { name: "Audio Jack", values: ["Yes", "No"] },
    { name: "SD Card Slot", values: ["Yes", "No"] },
    { name: "Fingerprint Reader", values: ["Yes", "No"] },
    {
      name: "Color",
      values: ["Black", "Silver", "Gray", "Blue", "White", "Rose Gold"],
    },
    { name: "Dimensions", values: ["Width x Depth x Height"] },
    { name: "Warranty", values: ["1 year", "2 years", "3 years", "5 years"] },
    {
      name: "Processor Speed",
      values: [
        "2.0 GHz",
        "2.5 GHz",
        "3.0 GHz",
        "3.5 GHz",
        "4.0 GHz",
        "4.5 GHz",
      ],
    },
    {
      name: "Processor Cores",
      values: ["Dual-core", "Quad-core", "Hexa-core", "Octa-core"],
    },
    { name: "Cache Memory", values: ["3MB", "6MB", "8MB", "12MB", "16MB"] },
    { name: "SSD Type", values: ["SATA III", "PCIe NVMe"] },
    { name: "SSD Capacity", values: ["128GB", "256GB", "512GB", "1TB", "2TB"] },
    // Add more laptop properties and values here
  ];

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const [rotationIndex, setRotationIndex] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(true);
  const [fields, setFields] = useState({
    name: "",
    category: "",
    storage: "",
    processor: "",
    brand: "",
    ram: "",
    product_type: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    description: "",
    processor: "",
    ram: "",
    product_type: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return !value ? "Product name is required" : "";
      // case "category":
      //   return !value ? "Category is required" : "";
      // case "brand":
      //   return !value ? "Brand is required" : "";
      case "price":
        return !/^\d*$/.test(value) ? "Price is required" : "";
      // case "storage":
      //   return !value ? "Storage is required" : "";
      // case "processor":
      //   return !value ? "Processor is required" : "";
      // case "ram":
      //   return !value ? "RAM is required" : "";

      default:
        return "";
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    getCategories()
      .then((res) => {
        setCategories(res.categories.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchBrands = () => {
    setLoading(true);
    getBrands()
      .then((res) => {
        setBrands(res.brands.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleStatus = (e) => {
    setStatus(e.target.checked);
  };

  const handleDescription = (description) => {
    setDescription(description);
  };

  const rotate = (image, index) => () => {
    const newRotation = rotation + 90 >= 360 ? -360 : rotation + 90;

    image.rotation = newRotation;
    const updatedImages = [...images];
    updatedImages.splice(index, 1, image);

    setRotation(newRotation);
    setRotationIndex(index);
    setImages(updatedImages);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    // Use Promise.all to ensure all images are processed before updating the state
    Promise.all(
      selectedImages.map((image, index) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);

          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
              const canvas = document.createElement("canvas");
              let maxImageSize = 1000; // Default max size

              // Set different max size for first two images
              if (index === 0 || index === 1) {
                maxImageSize = 800;
              }

              let width = img.width;
              let height = img.height;

              // Resize the image if it exceeds the max size
              if (width > maxImageSize || height > maxImageSize) {
                if (width > height) {
                  height *= maxImageSize / width;
                  width = maxImageSize;
                } else {
                  width *= maxImageSize / height;
                  height = maxImageSize;
                }
              }

              canvas.width = width;
              canvas.height = height;

              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, width, height);

              // Convert canvas image to a Blob with reduced size
              canvas.toBlob(
                (blob) => {
                  resolve({ blob, name: image.name, size: image.size });
                },
                "image/webp",
                0.8
              ); // Adjust the quality (0.7 means 70% quality)

              // Alternatively, you can use 'image/png' if you prefer PNG format
            };
          };
        });
      })
    ).then((resizedImages) => {
      // Now that all images are resized, update the state
      setImages([...images, ...resizedImages]);
      console.log(resizedImages);
    });
  };

  const handleProductInput = (e) => {
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

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handleRemoveImage = (idx) => () => {
    setImages(images.filter((s, sidx) => idx !== sidx));
  };

  const handleAddProductInfo = () => {
    setProductInfos(productInfos.concat([{ label: "", value: "" }]));
  };

  const handleRemoveProductInfo = (key) => () => {
    setProductInfos(productInfos.filter((s, skey) => key !== skey));
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...productInfos];
    list[index][name] = value;
    setProductInfos(list);
  };

  const handleOtherSaleChange = (e) => {
    const other_sales = e.target.value;
    console.log(other_sales);
    setOtherSales(other_sales);
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

    if (images.length === 0) {
      validationErrors.images = "Image is required";
    }

    // if (description === "") {
    //   validationErrors.description = "description is required";
    // }
    if (price === "") {
      validationErrors.price = "Price is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      let new_rotation =
        images[i].rotation == undefined ? 0 : images[i].rotation;
      data.set(`rotations[${i}]`, new_rotation);
    }
    // for (var i in images) {
    //   data.append(`images[${i}]`, images[i]);
    // }

    images.forEach((image, index) => {
      // Append all images using the same key "images[]"
      data.append("images[]", image.blob, image.name);
    });

    for (var i in productInfos) {
      data.set(`labels[${i}]`, productInfos[i].label);
      data.set(`values[${i}]`, productInfos[i].value);
    }

    data.set("name", fields.name);
    other_sales !== null && data.set("other_sales", other_sales);
    data.set("product_type", fields.product_type);
    data.set("ram", fields.ram);
    data.set("category", fields.category);
    data.set("brand", fields.brand);
    data.set("storage", fields.storage);
    data.set("processor", fields.processor);
    data.set("description", description);
    data.set("availability", status ? 1 : 0);
    data.set("price", price);
    data.set("product_infos", productInfos);

    return axios
      .post(
        `${settings.API_URL}store/product`,
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
      isOpen={product !== null}
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
            <h4 className="card-title">Add Product</h4>
            <p className="card-description"> </p>
            <form className="forms-sample">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">Product Name</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Product Name"
                      name="name"
                      value={fields.name}
                      onChange={handleProductInput}
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
                        {errors.name}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">Product Type</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect3"
                      name="product_type"
                      value={fields.product_type}
                      onChange={handleProductInput}
                    >
                      <option value="">Choose Product Type</option>
                      {productTypes.map((ptype, key) => (
                        <option key={key} value={ptype}>
                          {ptype}
                        </option>
                      ))}
                    </select>
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                        className="text-danger"
                      >
                        {errors.product_type}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">Price</label>
                    <Form.Control
                      type="text"
                      value={price}
                      onChange={handlePriceChange}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      className="form-control"
                      placeholder="Enter Price"
                      name="price"
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
                        {errors.price}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row></Row>

              <Row>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">Category</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect2"
                      name="category"
                      value={fields.category}
                      onChange={handleProductInput}
                    >
                      <option value="">Choose Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                        className="text-danger"
                      >
                        {errors.category}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">Brand</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect2"
                      name="brand"
                      value={fields.brand}
                      onChange={handleProductInput}
                    >
                      <option value="">Choose Brand</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                        className="text-danger"
                      >
                        {errors.brand}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">Storages</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect2"
                      name="storage"
                      value={fields.storages}
                      onChange={handleProductInput}
                    >
                      <option value="">Choose Storage</option>
                      {storages.map((storage, key) => (
                        <option key={key} value={storage}>
                          {storage}
                        </option>
                      ))}
                    </select>
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                        className="text-danger"
                      >
                        {errors.storage}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">Processor</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect3"
                      name="processor"
                      value={fields.processor}
                      onChange={handleProductInput}
                    >
                      <option value="">Choose Processor</option>
                      {processors.map((processor, key) => (
                        <option key={key} value={processor}>
                          {processor}
                        </option>
                      ))}
                    </select>
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                        className="text-danger"
                      >
                        {errors.processor}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label className="label">RAM</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect3"
                      name="ram"
                      value={fields.ram}
                      onChange={handleProductInput}
                    >
                      <option value="">Choose RAM size</option>
                      {rams.map((ram, key) => (
                        <option key={key} value={ram}>
                          {ram}
                        </option>
                      ))}
                    </select>
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                        className="text-danger"
                      >
                        {errors.ram}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <label
                      className="label"
                      style={{ display: "block", paddingRight: 20 }}
                    >
                      {" "}
                      Availability
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
                <Col md={6}>
                  <label
                    className="label"
                    style={{ display: "block", paddingRight: 20 }}
                  >
                    {" "}
                    Other Sales
                  </label>
                  <Radio.Group
                    onChange={handleOtherSaleChange}
                    defaultValue={other_sales}
                  >
                    <Radio.Button value={null}>None</Radio.Button>
                    <Radio.Button value="flash sales">Flash Sales</Radio.Button>

                    <Radio.Button value="mid year sales">
                      Mid Year Sales
                    </Radio.Button>
                    <Radio.Button value="promo sales">Promo Sales</Radio.Button>
                    <Radio.Button value="black friday">
                      Black Friday
                    </Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>

              <Row>
                <Col lg="12">
                  <label className="label" style={{ display: "block" }}>
                    Product Image
                  </label>
                  <>
                    <Button onClick={handleClick}>
                      {" "}
                      Upload Product Images
                    </Button>
                    <input
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      type="file"
                      ref={hiddenFileInput}
                      multiple
                      accept="image/*"
                    />
                    <div color="muted">
                      You can only upload jpg, jpeg, and png type
                    </div>
                  </>
                  <Row>
                    {images.map((image, index) => (
                      <Col md={3} key={index}>
                        <div style={{ position: "relative" }}>
                          <img
                            style={{
                              transform:
                                index === rotationIndex
                                  ? `rotate(${rotation}deg)`
                                  : "rotate(0deg)",
                              width: "100%",
                            }}
                            src={URL.createObjectURL(image.blob)}
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
                            <LoginOutlined
                              style={{ marginRight: "10px" }}
                              onClick={rotate(image, index)}
                            />
                            <DeleteOutlined
                              onClick={handleRemoveImage(index)}
                            />
                          </div>
                        </div>
                      </Col>
                    ))}
                    {errors.images && (
                      <div className="text-danger" style={{ fontSize: 12 }}>
                        {errors.images}
                      </div>
                    )}
                  </Row>
                  <Row>
                    <Col md="7">
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
                  {/* <Row>
                    <Select
                      showSearch
                      optionFilterProp="children"
                      style={{ width: 200 }}
                      placeholder="Search for a laptop property..."
                    >
                      {laptopProperties.map((property) => (
                        <Select.OptGroup
                          key={property.name}
                          label={property.name}
                        >
                          {property.values.map((value) => (
                            <Select.Option key={value} value={value}>
                              {value}
                            </Select.Option>
                          ))}
                        </Select.OptGroup>
                      ))}
                    </Select>
                  </Row> */}
                  <Row>
                    <label
                      className="label"
                      style={{
                        display: "block",
                        paddingTop: 20,
                        paddingBottom: 20,
                      }}
                    >
                      Additional Information
                    </label>

                    {productInfos.map((productInfo, key) => (
                      <Col
                        md={12}
                        style={{
                          border: "1px #eee solid",
                          padding: "10px 5px 0px 5px",
                          margin: "15px 10px 0px 5px ",
                          borderRadius: 7,
                        }}
                      >
                        <Row style={{ margin: "15px 10px 0px 10px " }}>
                          <Col md={12}>
                            <Row>
                              <Col md={5}>
                                <Form.Group>
                                  <Form.Label>Property</Form.Label>

                                  <Input
                                    type="text"
                                    placeholder={`Product Property`}
                                    value={productInfo.label}
                                    onChange={(e) => handleInputChange(e, key)}
                                    name="label"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={5}>
                                <Form.Group>
                                  <Form.Label>Values</Form.Label>
                                  <Input
                                    type="text"
                                    name="value"
                                    placeholder={`Property Value`}
                                    value={productInfo.value}
                                    onChange={(e) => handleInputChange(e, key)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={2} style={{ marginTop: 30 }}>
                                <ButtonGroup>
                                  {productInfos.length - 1 === key && (
                                    <Button
                                      variant="outline-primary"
                                      size="md"
                                      onClick={handleAddProductInfo}
                                    >
                                      +
                                    </Button>
                                  )}
                                  {productInfos.length !== 1 && (
                                    <Button
                                      variant="outline-danger"
                                      size="md"
                                      onClick={handleRemoveProductInfo(key)}
                                    >
                                      X
                                    </Button>
                                  )}
                                </ButtonGroup>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                    {errors.label && (
                      <div
                        className="text-danger"
                        style={{ fontSize: 12, display: "block" }}
                      >
                        {errors.label}
                      </div>
                    )}
                    {errors.value && (
                      <div
                        className="text-danger"
                        style={{ fontSize: 12, display: "block" }}
                      >
                        {errors.value}
                      </div>
                    )}
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

export default AddProduct;
