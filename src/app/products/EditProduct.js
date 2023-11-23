import React, { useState, useEffect, useRef } from "react";
import { Modal, Input } from "reactstrap";
import { Col, Row, Form, ButtonGroup } from "react-bootstrap";
import { Button, Radio } from "antd";
import { LoginOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./CustomFileInput.css";
import settings from "../services/settings";
import { authService } from "../services/authService";
import {
  getBrands,
  getCategories,
  getProductDescriptions,
  getProductImages,
} from "../services/categoryService";
import SpinDiv from "../components/SpinDiv";

const EditProduct = ({ product, toggle }) => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [rotationIndex, setRotationIndex] = useState(null);
  const [productInfos, setProductInfos] = useState([]);
  const [status, setStatus] = useState(
    product.availability == 1 ? true : false
  );
  const [price, setPrice] = useState(product.price);
  const [other_sales, setOtherSales] = useState(product.other_sales);

  const [fields, setFields] = useState({
    name: product.name,
    price: product.price,
    category_id: product.category_id,
    brand: product.brand_id,
    storage: product.storage,
    processor: product.processor,
    ram: product.ram,
    product_type: product.product_type,
  });

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
    "i5-7200U 206",
    "Intel Atom Dual –Core 12",
    "Intel Atom Octa –Core 1",
    "Intel Atom Quad –Core 17",
    "Intel Atom Single –Core 29",
    "Intel Celeron 1,311",
    "Intel Celeron D 2",
    "Intel Celeron M 22",
    "Intel Celeron N 1,258",
    "Intel Centrino 69",
    "Intel Core 2 Duo 381",
    "Intel Core 2 Quad 3",
    "Intel Core 2 Solo 1",
    "Intel Core Duo 46",
    "Intel Core i3 10th Gen.127",
    "Intel Core i3 11th Gen. 163",
    "Intel Core i3 12th Gen. 10",
    "Intel Core i3 13th Gen.3",
    "Intel Core i3 1st Gen . 82",
    "Intel Core i3 2nd Gen . 101",
    "Intel Core i3 3rd Gen. 82",
    "Intel  Core i3 4th Gen. 276",
    "Intel Core i3 5th Gen. 43",
    "Intel Core i3 6TH Gen. 104",
    "Intel Core i3 7th Gen. 117",
    "Intel Core i3 8th Gen. 118",
    "Intel Core i5 10th Gen. 311",
    "Intel Core i5 12th Gen. 116",
    "Intel Core i5 13th Gen. 21",
    "Intel Core i5 1st Gen. 147",
    "Intel Core i5 2nd Gen. 351",
    "Intel Core i5 3rd Gen. 503",
    "Intel Core i5 5th Gen. 295",
    "Intel Core i5 -7200U 130",
    "Intel Core i5 7th Gen. 357",
    "Intel Core i5 -8300H 7",
    "Intel Core i5 9th Gen. 37",
    "Intel Core i7 13TH Gen. 52",
    "Intel Core i7 1st Gen. 67",
    "Intel Core i7 2nd Gen. 86",
    "Intel Core i7 3rd Gen. 108",
    "Intel Core i7 4th Gen. 491",
    "Intel Core i7 5th Gen. 197",
    "Intel Core i7 6TH Gen. 841",
    "Intel Core i7 7th Gen. 243",
    "Intel Core i7 9th Gen. 120",
    "Intel Core I7 Extreme 1st Gen. 1",
    "Intel Core i7 Extreme 3rd Gen. 2",
    "Intel Core I7 Extreme 5th Gen 1",
    "Intel Core i7 Extreme 6th Gen. 1",
    "Intel Core i7 Extreme 7th Gen. 4",
    "Intel Core i9 10th Gen. 4",
    "Intel Core i9 13th Gen. 4",
    "Intel Core i9 8th Gen. 5",
    "Intel Core i9 9th Gen. 20",
    "Intel Core M 57",
    "Intel Core M3 9",
    "Intel Core M3 6th Gen. 3",
    "Intel Core M3 7th Gen. 8",
    "Intel Core M5 6th Gen. 13",
    "Intel Core Solo 1",
    "Intel Pentium 487",
    "Intel Pentium 4 31",
    "Intel Pentium 4 HT 3",
    "Intel Pentium 4 M 3",
    "Intel Pentium Dual – Core 52",
    "Intel Pentium Gold 34",
    "Intel Pentium II 3",
    "Intel Pentium III 7",
    "Intel Pentium III M 2",
    "Intel Pentium III Mobile  1",
    "Intel Pentium M 63",
    "Intel Pentium MMX  1",
    "Intel Pentium Mobile  3",
    "Intel Pentium  N4200 13",
    "Intel Pentium N- Series  38",
    "Intel Pentium Silver  108",
    "Intel Processor N 5",
    "Intel Xeon 63",
    "MediaTek MT8183 87",
    "Microsoft SQ1 3",
    "Microsoft SQ2 1",
    "Mobile AMD Sempron 1",
    "NVIDIA Tegra 3 1",
    "NVIDIA Tegra 4 2",
    "NVIDIA Tegra  K1 25",
    "Samsung Exynos 5 Dual 5",
    "VIA C7 1",
    "Not Specified  4,079",
    "Intel Core i5 11th Gen. 412",
    "Intel Core i5 4th Gen. 1,249",
    "Intel Core i5 6th Gen. 1,048",
    "Intel Core i5 8th Gen. 837",
    "Intel Core i7 10th Gen. 265",
    "Intel Core i7 11th Gen. 242",
    "Intel Core i7 12th Gen. 139",
    "Intel Core i7 8th Gen. 440",
    "AMD A10 209",
    "AMD A10 Quad-Core 44",
    "AMD A12 29",
    "AMD A4 Dual-Core 90",
    "AMD A6 Dual-Core 90",
    "AMD A6 Quad-Core 55",
    "AMD A6 Tri-Core 1",
    "AMD A8 244",
    "AMD A8 Quad-Core 36",
    "AMD A9 78",
    "AMD Athlon 137",
    "AMD Athlon 64 14",
    "AMD Athlon 64,64 M 2",
    "AMD Athlon 64 X2 27",
    "AMD Athlon Gold 3150U 22",
    "AMD Athlon ll 47",
    "AMD Athlon ll Neo 1",
    "AMD Athlon ll x2 10",
    "AMD Athlon Neo 4",
    "AMD Athlon Neo x2 3",
    "AMD Athlon Silver 3050U 24",
    "AMD Athlon x2  16",
    "AMD Athlon XP  XP- M 12",
    "AMD C-Series 4",
    "AMD Duron 5",
    "AMD E- Series 163",
    "AMD FX 17",
    "AMD K7 1",
    "AMD Opteron 1",
    "AMD Phenom 3",
    "AMD Phenom ll 26",
    "AMD Phenom ll X2 2",
    "AMD Phenom ll X4 1",
    "AMD Phenom  X4 2",
    "AMD Ryzen 5 580",
    "AMD Ryzen 5 2nd Gen. 7",
    "AMD Ryzen  7 214",
    "AMD Ryzen 9 5",
    "AMD Sempron 25",
    "AMD Turion 64 45",
    "AMD Turion 64 X2 130",
    "AMD Turion ll 60",
    "AMD Turion X2 43",
    "AMD V-Series  4",
  ];

  const [errors, setErrors] = useState({
    name: "",
    category_id: "",
    price: "",
    description: "",
    processor: "",
    brand: "",
    ram: "",
  });
  const [description, setDescription] = useState(product.description);
  const hiddenFileInput = useRef(null);
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProductInfos();
    fetchImageFiles();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const rows = 1000;
      const res = await getCategories({ rows });
      setCategories(res.categories.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const rows = 1000;
      const res = await getBrands({ rows });
      setBrands(res.brands.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductInfos = async () => {
    try {
      setLoading(true);
      const res = await getProductDescriptions(product.id);
      setProductInfos(
        res.product_descriptions.map((item) => ({
          label: item.label,
          value: item.values,
        }))
      );
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOtherSaleChange = (e) => {
    const other_sales = e.target.value;
    console.log(other_sales);
    setOtherSales(other_sales);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
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
  const fetchImageFiles = async () => {
    setLoading(true);
    const res = await getProductImages(product.id);
    if (res) {
      console.log(res);
      const files = await Promise.all(
        res.product_images.map(async (imageUrl) => {
          const response = await fetch(imageUrl);

          console.log(response);
          const blob = await response.blob();
          return {
            blob,
            name: imageUrl.substring(imageUrl.lastIndexOf("/") + 1),
          };
        })
      );
      setImages(files);
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    // Use Promise.all to ensure all images are processed before updating the state
    Promise.all(
      selectedImages.map((image) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);

          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
              const canvas = document.createElement("canvas");
              const maxImageSize = 800; // Set your desired max image size here

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
                  resolve({ blob, name: image.name });
                },
                "image/jpeg",
                0.6
              ); // Adjust the quality (0.7 means 70% quality)

              // Alternatively, you can use 'image/png' if you prefer PNG format
            };
          };
        });
      })
    ).then((resizedImages) => {
      // Now that all images are resized, update the state
      setImages([...images, ...resizedImages]);
    });
  };

  const handleRemoveImage = (idx) => () => {
    setImages(images.filter((s, sidx) => idx !== sidx));
  };

  const handleStatus = (e) => {
    setStatus(e);
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return !value ? "Product name is required" : "";
      // case "category_id":
      //   return !value ? "Category is required" : "";
      // case "brand":
      //   return !value ? "Brand is required" : "";
      case "price":
        return !value ? "Price is required" : "";
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

  const productTypes = ["Brand New", "UK Used", "Open Box", "US Used"];

  const handleProductInput = (e) => {
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
  const handleDescription = (description) => {
    console.log(description);
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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (images.length === 0) {
      validationErrors.images = "Image is required";
    }

    if (description === "") {
      validationErrors.description = "description is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    console.log(description);
    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      let new_rotation =
        images[i].rotation == undefined ? 0 : images[i].rotation;
      data.set(`rotations[${i}]`, new_rotation);
    }
    images.forEach((image, index) => {
      // Append all images using the same key "images[]"
      data.append("images[]", image.blob, image.name);
    });

    for (var i in productInfos) {
      data.set(`labels[${i}]`, productInfos[i].label);
      data.set(`values[${i}]`, productInfos[i].value);
    }

    data.set("name", fields.name);
    data.set("product_type", fields.product_type);
    data.set("ram", fields.ram);
    data.set("category", fields.category_id);
    data.set("brand", fields.brand);
    data.set("storage", fields.storage);
    data.set("processor", fields.processor);
    data.set("description", description);
    data.set("availability", status ? 1 : 0);
    data.set("price", price);
    other_sales !== null && data.set("other_sales", other_sales);

    return axios
      .post(
        `${settings.API_URL}update/product/${product.id}`,
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
      isOpen={product !== null}
      toggle={toggle}
      style={{ maxWidth: "70%", paddingLeft: 100 }}
    >
      {loading && <SpinDiv text={"loading..."} />}
      {!loading && (
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
              <h4 className="card-title">Edit Product</h4>
              {console.log(images)}
              <p className="card-description"> </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Product Name</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Cloth Name"
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

                <Row>
                  <Col md={5}>
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
                  <Col md={5}>
                    <Form.Group>
                      <label className="label">Price</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="Enter Price"
                        value={price}
                        onChange={handlePriceChange}
                        pattern="[0-9]*"
                        inputMode="numeric"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group>
                      <label className="label">Category</label>
                      <select
                        className="form-control"
                        name="category_id"
                        value={fields.category_id}
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
                          {errors.category_id}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <div className="form-check">
                      <label
                        className="label"
                        style={{ display: "block", paddingRight: 20 }}
                      >
                        {" "}
                        Availability
                      </label>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={status}
                        onChange={(e) => handleStatus(e.target.checked)}
                      />
                      <i className="input-helper"></i>
                    </div>
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
                      <Radio.Button value="flash sales">
                        Flash Sales
                      </Radio.Button>
                      <Radio.Button value="PRE-ORDER (24Hours)">
                        {" "}
                        PRE-ORDER (24Hours)
                      </Radio.Button>
                      <Radio.Button value="PRE-ORDER (7DAYS)">
                        PRE-ORDER (7DAYS)
                      </Radio.Button>
                      <Radio.Button value="PRE-ORDER (21DAYS)">
                        PRE-ORDER (21DAYS)
                      </Radio.Button>
                      <Radio.Button value="mid year sales">
                        Mid Year Sales
                      </Radio.Button>
                      <Radio.Button value="promo sales">
                        Promo Sales
                      </Radio.Button>
                      <Radio.Button value="black friday">
                        Black Friday
                      </Radio.Button>
                    </Radio.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label className="label">Brand</label>
                      <select
                        className="form-control"
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
                      <label className="label">Processor</label>
                      <select
                        className="form-control"
                        name="processor"
                        value={fields.processor}
                        onChange={handleProductInput}
                      >
                        <option value="">Choose processor</option>
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
                        name="ram"
                        value={fields.ram}
                        onChange={handleProductInput}
                      >
                        <option value="">Choose RAM</option>
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
                  <Col md={6}>
                    <Form.Group>
                      <label className="label">Storages</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        name="storage"
                        value={fields.storage}
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
                </Row>
                <Form.Group>
                  <label className="label"> Product Images</label>
                  <div>
                    <Button onClick={handleClick}>
                      {" "}
                      Update Product Images
                    </Button>
                  </div>
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
                </Form.Group>

                <Row>
                  {console.log(images)}
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
                          <DeleteOutlined onClick={handleRemoveImage(index)} />
                        </div>
                      </div>
                    </Col>
                  ))}
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
      )}
    </Modal>
  );
};

export default EditProduct;
