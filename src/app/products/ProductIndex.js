import React, { useState, useEffect } from "react";
import {
  ProgressBar,
  Row,
  Col,
  Breadcrumb,
  ButtonGroup,
} from "react-bootstrap";
// import { Input } from "reactstrap";
import { getProducts, getBrands, getAllCats } from "../services/productService";
import SpinDiv from "../components/SpinDiv";
import {
  Pagination,
  Select,
  Slider,
  InputNumber,
  Button,
  Checkbox,
  Input,
  Skeleton,
} from "antd";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";

const { Option } = Select;

const ProductIndex = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [sort, setSorting] = useState(null);
  const [price, setPrice] = useState([4000, 1000000]);
  const [storages, setStorages] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [rams, setRams] = useState([]);

  const handleBrandChange = (value) => {
    setBrand(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const renderStorageDropdown = (menu) => {
    return (
      <div>
        <div style={{ padding: "8px", fontWeight: "bold" }}>
          <span>({storages.length}) Storage Selected</span>
        </div>
        {menu}
      </div>
    );
  };

  const renderProcessorDropdown = (menu) => {
    return (
      <div>
        <div style={{ padding: "8px", fontWeight: "bold" }}>
          <span>({processors.length}) Processor Selected</span>
        </div>
        {menu}
      </div>
    );
  };

  const renderRamDropdown = (menu) => {
    return (
      <div>
        <div style={{ padding: "8px", fontWeight: "bold" }}>
          <span>({rams.length}) RAM Selected</span>
        </div>
        {menu}
      </div>
    );
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleStorageChange = (selectedOptions) => {
    setStorages(selectedOptions);
    fetchProducts();
  };

  const handleProcessorChange = (selectedOptions) => {
    setProcessors(selectedOptions);
    fetchProducts();
  };

  const handleRamChange = (selectedOptions) => {
    setRams(selectedOptions);
    fetchProducts();
  };

  const handleSorting = (sort) => {
    setSorting(sort);
    fetchProducts();
  };

  const fetchBrands = () => {
    setLoading(true);
    getBrands().then(
      (res) => {
        setBrands(res.brands);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const fetchCategories = () => {
    setLoading(true);
    getAllCats().then(
      (res) => {
        setCategories(res.categories);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const storageSelect = () => {
    return (
      <Select
        mode="multiple"
        placeholder={
          <span style={{ color: "#0E1B4D", fontWeight: "bold" }}>Storage</span>
        }
        value={storages}
        onChange={handleStorageChange}
        style={{ width: "100%", fontWeight: "bold", color: "#0E1B4D" }}
        dropdownStyle={{ minWidth: 300 }}
        dropdownRender={renderStorageDropdown}
      >
        {storagesList.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    );
  };

  const searchSelect = () => {
    return (
      <Input
        placeholder="Search by other specifications..."
        id="show"
        autoFocus={false}
        value={search}
        style={{
          color: "black",
          marginBottom: 10,
          fontWeight: "bold",
          height: 34, // Set the height to reduce the input height
          borderRadius: 5,
          border: "1px solid #ccc",
        }}
        onChange={handleSearch}
      />
    );
  };

  const processorSelect = () => {
    return (
      <Select
        mode="multiple"
        placeholder={
          <span style={{ color: "#0E1B4D", fontWeight: "bold" }}>
            Processor
          </span>
        }
        value={processors}
        onChange={handleProcessorChange}
        style={{ width: "100%", fontWeight: "bold", color: "#0E1B4D" }}
        dropdownRender={renderProcessorDropdown}
        dropdownStyle={{ minWidth: 300 }}
      >
        {processorsList.map((option) => (
          <Checkbox value={option}>{option}</Checkbox>
        ))}
      </Select>
    );
  };
  const ramSelect = () => {
    return (
      <Select
        mode="multiple"
        placeholder={
          <span style={{ color: "#0E1B4D", fontWeight: "bold" }}>RAM</span>
        }
        value={rams}
        onChange={handleRamChange}
        style={{
          width: "100%",
          fontWeight: "bold",
          color: "#0E1B4D",
          border: "1px solid #d9d9d9",
        }}
        dropdownRender={renderRamDropdown}
        dropdownStyle={{ minWidth: 300 }}
      >
        {ramsList.map((option) => (
          <Checkbox value={option}>{option}</Checkbox>
        ))}
      </Select>
    );
  };

  const brandSelect = () => {
    return (
      <Select
        placeholder={
          <span style={{ fontWeight: "bold", color: "black" }}>BRAND</span>
        }
        style={{ width: "100%", borderRadius: 20 }}
        value={brand}
        onChange={handleBrandChange}
      >
        <Option value="">All Brands</Option>
        {brands.map((brand, index) => (
          <Option key={index} value={brand.id}>
            {brand.name}
          </Option>
        ))}
      </Select>
    );
  };

  const categorySelect = () => {
    return (
      <Select
        placeholder={
          <span style={{ fontWeight: "bold", color: "black" }}>Category</span>
        }
        style={{ width: "100%", borderRadius: 20 }}
        value={category}
        onChange={handleCategoryChange}
      >
        <Option value="">All Categories</Option>
        {categories.map((category, index) => (
          <Option key={index} value={category.id}>
            {category.name}
          </Option>
        ))}
      </Select>
    );
  };

  const sortSelect = () => {
    return (
      <Select
        placeholder={
          <>
            <span style={{ fontWeight: "bold", color: "#0E1B4D" }}>
              Sort By
            </span>
            <span
              style={{
                fontWeight: "bold",
                paddingLeft: "30%",
                color: "#0E1B4D",
              }}
            >
              Availability
            </span>
          </>
        }
        placement="bottomLeft"
        style={{ width: "100%", border: "none", boxShadow: "none" }}
        value={sort}
        onChange={handleSorting}
        dropdownStyle={{ minWidth: 300, textAlign: "center" }}
      >
        <option value="availability">Availability</option>
        <option value="name-asc">Alphabetically, A-Z</option>
        <option value="name-desc">Alphabetically, Z-A</option>
        <option value="low-price">Price, low to high</option>
        <option value="high-price">Price, high to low</option>
        <option value="date-asc">Date, old to new</option>
        <option value="date-desc">Date, new to old</option>
      </Select>
    );
  };

  const storagesList = [
    "128GB SSD",
    "256GB SSD",
    "512GB SSD",
    "1TB SSD",
    "128GB HDD",
    "256GB HDD",
    "512GB HDD",
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

  const processorsList = [
    "Intel Atom",
    "Intel Celeron",
    "Intel Pentium",
    "Intel Core i3",
    "Intel Core i5",
    "Intel Core i7",
    "Intel Core i9",
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
  const ramsList = [
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

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, [page, rows, brand, rams, sort, storages, processors, category, search]);

  const fetchProducts = () => {
    setLoading(true);
    getProducts({
      page,
      rows,
      brand,
      rams,
      sort,
      storages,
      processors,
      category,
      search,
    })
      .then((res) => {
        setProducts(res.products.data);
        setPage(res.products.current_page);
        setTotal(res.products.total);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const searchProducts = (value) => {
    setSearch(value);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const onPageChange = (page, pageSize) => {
    setPage(page);
    setRows(pageSize);
  };

  const toggleAddProduct = () => {
    setAddProduct(!addProduct);
    fetchProducts();
  };

  const toggleEditProduct = (product) => {
    setEditProduct(product);
    fetchProducts();
  };

  const toggleEdit = () => {
    setEditProduct(null);
    fetchProducts();
  };

  const toggleDeleteProduct = (product) => {
    setDeleteProduct(product);
  };

  const toggleDelete = () => {
    setDeleteProduct(null);
    fetchProducts();
  };

  return (
    <div>
      {addProduct && (
        <AddProduct
          saved={fetchProducts}
          addProduct={addProduct}
          toggle={toggleAddProduct}
        />
      )}
      {editProduct && (
        <EditProduct
          saved={fetchProducts}
          product={editProduct}
          toggle={toggleEdit}
        />
      )}
      {deleteProduct && (
        <DeleteProduct product={deleteProduct} toggle={toggleDelete} />
      )}
      {loading && <SpinDiv />}
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <Row style={{}}>
                <Col lg="12">
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                      <Breadcrumb
                        listProps={{
                          className: " breadcrumb-text-dark text-primary",
                        }}
                      >
                        <Breadcrumb.Item
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "bold",
                          }}
                          href="/"
                        >
                          Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "bold",
                          }}
                          href="#products"
                        >
                          Products
                        </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <ButtonGroup>
                        <Button
                          style={{
                            textDecoration: "none",
                            color: "white",
                            backgroundColor: "black",
                            borderColor: "black",
                            fontWeight: "bold",
                          }}
                          size="sm"
                          onClick={toggleAddProduct}
                        >
                          Add product
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginBottom: 50 }}>
                <div
                  className={`col-xl-3 col-md-3 col-lg-3 col- product-filter`}
                >
                  {brandSelect()}
                </div>
                <div
                  className={`col-xl-3 col-md-3 col-lg-3 col- product-filter`}
                >
                  {categorySelect()}
                </div>

                <div
                  className={`col-xl-3 col-md-3 col-lg-3 col-12 product-filter`}
                >
                  {processorSelect()}
                </div>
                <div
                  className={`col-xl-3 col-md-3 col-lg-3 col-12 product-filter`}
                >
                  {ramSelect()}
                </div>
              </Row>
              <Row style={{ justifyContent: "center", marginBottom: 50 }}>
                <div
                  className={`col-xl-3 col-md-3 col-lg-3 col-12 product-filter`}
                >
                  {storageSelect()}
                </div>
                <div
                  className={`col-xl-4 col-md-4 col-lg-4 col-12 product-filter`}
                >
                  {sortSelect()}
                </div>
              </Row>
              <Row>
                <Col lg="8">
                  <h4 className="card-title">
                    Products{" "}
                    <span
                      style={{
                        color: "#aaa",
                        fontSize: 14,
                        fontWeight: "normal",
                      }}
                    >
                      ({total})
                    </span>
                  </h4>
                </Col>
                <Col lg="4" className="">
                  <div style={{ display: "flex" }}>
                    <Input
                      placeholder="Search..."
                      autoFocus
                      id="show"
                      value={search}
                      style={{
                        maxHeight: 45,
                        marginRight: 5,
                        marginBottom: 10,
                      }}
                      onChange={handleSearch}
                    />
                  </div>
                </Col>
              </Row>

              <div className="table-responsive">
                <table className="table table-nowrap ">
                  <thead>
                    <tr>
                      <th> Product Name </th>
                      <th> Category </th>
                      <th> Price </th>
                      <th> new price </th>
                      <th> status </th>
                      <th> date </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td style={{ textTransform: "capitalize" }}>
                          {product.name}{" "}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          {product.category}{" "}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          &#8358;{product.price}{" "}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          &#8358;{product.new_price}{" "}
                        </td>

                        <td>
                          {product.availability == 1 ? "Available" : "Sold"}
                        </td>
                        <td>{product.created_at} </td>
                        <td>
                          <ButtonGroup>
                            <Button
                              variant="outline-dark"
                              onClick={() => toggleEditProduct(product)}
                              size="sm"
                            >
                              View
                            </Button>
                            <Button
                              variant="outline-dark"
                              onClick={() => toggleDeleteProduct(product)}
                              size="sm"
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Row>
                  <Col md={12} style={{ fontWeight: "bold", paddingTop: 3 }}>
                    {products.length > 0 && (
                      <Pagination
                        total={total}
                        showTotal={(total) => `Total ${total} products`}
                        onChange={onPageChange}
                        pageSize={rows}
                        current={page}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductIndex;
