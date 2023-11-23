import React, { useState, useEffect } from "react";
import {
  ProgressBar,
  Row,
  Col,
  Breadcrumb,
  ButtonGroup,
} from "react-bootstrap";
// import { Input } from "reactstrap";
import { getPrices } from "../services/orderService";
import SpinDiv from "../components/SpinDiv";
import { Pagination, Select, Button, Input } from "antd";
import EditPrice from "./EditPrice";
import AddPrice from "./AddPrice";
import DeletePrice from "./DeletePrice";
import moment from "moment";
const { Option } = Select;

const PriceIndex = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [prices, setPrices] = useState([]);
  const [addPrice, setAddPrice] = useState(false);
  const [editPrice, setEditPrice] = useState(null);
  const [deletePrice, setDeletePrice] = useState(null);

  const fetchPrices = () => {
    setLoading(true);
    getPrices().then(
      (res) => {
        setPrices(res.prices.data);
        setPage(res.prices.current_page);
        setTotal(res.prices.total);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchPrices();
  }, [page, rows, search]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const onPageChange = (page, pageSize) => {
    setPage(page);
    setRows(pageSize);
  };

  const toggleAddPrice = () => {
    setAddPrice(!addPrice);
    fetchPrices();
  };

  const toggleEditPrice = (price) => {
    setEditPrice(price);
    fetchPrices();
  };

  const toggleEdit = () => {
    setEditPrice(null);
    fetchPrices();
  };

  const toggleDeletePrice = (price) => {
    setDeletePrice(price);
  };

  const toggleDelete = () => {
    setDeletePrice(null);
    fetchPrices();
  };

  return (
    <div>
      {addPrice && (
        <AddPrice
          saved={fetchPrices}
          addPrice={addPrice}
          toggle={toggleAddPrice}
        />
      )}
      {editPrice && (
        <EditPrice saved={fetchPrices} price={editPrice} toggle={toggleEdit} />
      )}
      {deletePrice && <DeletePrice price={deletePrice} toggle={toggleDelete} />}
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
                          href="#prices"
                        >
                          Price Edits
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
                          onClick={toggleAddPrice}
                        >
                          Add Price Edit
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg="8">
                  <h4 className="card-title">
                    prices Edits{" "}
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
                      <th> Percentage </th>
                      <th> Comment </th>
                      <th> Start date </th>
                      <th>End Date</th>

                      <th> Create On </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((price) => (
                      <tr key={price.id}>
                        <td style={{ textTransform: "capitalize" }}>
                          {price.percentage}{" "}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          {price.comment}{" "}
                        </td>
                        <td>
                          {" "}
                          {moment(price.start_date).format("MMM Do YYYY")}
                        </td>
                        <td> {moment(price.end_date).format("MMM Do YYYY")}</td>

                        <td>
                          {" "}
                          {moment(price.updated_at).format("MMM Do YYYY")}
                        </td>
                        <td>
                          <ButtonGroup>
                            <Button
                              variant="outline-dark"
                              onClick={() => toggleDeletePrice(price)}
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
                    {prices.length > 0 && (
                      <Pagination
                        total={total}
                        showTotal={(total) => `Total ${total} prices`}
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

export default PriceIndex;
