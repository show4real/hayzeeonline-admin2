import React, { useState, useEffect } from "react";
import {
  ProgressBar,
  Row,
  Col,
  Breadcrumb,
  ButtonGroup,
} from "react-bootstrap";
// import { Input } from "reactstrap";
import { getTransactions, getAllReferrers } from "../services/orderService";
import SpinDiv from "../components/SpinDiv";
import { Pagination, Select, Button, Input } from "antd";
import EditTransaction from "./EditTransaction";
import AddTransaction from "./AddTransaction";
import DeleteTransaction from "./DeleteTransaction";
import moment from "moment";
const { Option } = Select;

const TransactionIndex = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [referrers, setReferrers] = useState([]);
  const [referrer_id, setReferrerId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [addTransaction, setAddTransaction] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [deleteTransaction, setDeleteTransaction] = useState(null);

  const fetchReferrers = () => {
    setLoading(true);
    getAllReferrers().then(
      (res) => {
        setReferrers(res.referrers);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchTransactions();
    fetchReferrers();
  }, [page, rows, search, referrer_id]);

  const fetchTransactions = () => {
    setLoading(true);
    getTransactions({
      page,
      rows,
      search,
      referrer_id,
    })
      .then((res) => {
        setTransactions(res.transactions.data);
        setPage(res.transactions.current_page);
        setTotal(res.transactions.total);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const onPageChange = (page, pageSize) => {
    setPage(page);
    setRows(pageSize);
  };

  const toggleAddTransaction = () => {
    setAddTransaction(!addTransaction);
    fetchTransactions();
  };

  const toggleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
    fetchTransactions();
  };

  const toggleEdit = () => {
    setEditTransaction(null);
    fetchTransactions();
  };

  const toggleDeleteTransaction = (transaction) => {
    setDeleteTransaction(transaction);
  };

  const toggleDelete = () => {
    setDeleteTransaction(null);
    fetchTransactions();
  };

  const handleReferrerChange = (value) => {
    setReferrerId(value);
  };

  const referrerSelect = () => {
    return (
      <Select
        showSearch
        placeholder="Select a referrer"
        style={{ width: "400px" }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={handleReferrerChange}
      >
        <Option value={""}>All Referrers</Option>
        {referrers.map((referrer) => {
          if (referrer.status == 1) {
            return (
              <Option key={referrer.referral_code} value={referrer.id}>
                {referrer.referral_code + ` (${referrer.name})`}
              </Option>
            );
          }
        })}
      </Select>
    );
  };

  return (
    <div>
      {addTransaction && (
        <AddTransaction
          saved={fetchTransactions}
          addTransaction={addTransaction}
          referrers={referrers}
          toggle={toggleAddTransaction}
        />
      )}
      {editTransaction && (
        <EditTransaction
          saved={fetchTransactions}
          transaction={editTransaction}
          toggle={toggleEdit}
        />
      )}
      {deleteTransaction && (
        <DeleteTransaction
          transaction={deleteTransaction}
          toggle={toggleDelete}
        />
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
                          href="#transactions"
                        >
                          transactions
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
                          onClick={toggleAddTransaction}
                        >
                          Add transaction
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
                  {referrerSelect()}
                </div>
              </Row>

              <Row>
                <Col lg="8">
                  <h4 className="card-title">
                    transactions{" "}
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
                      <th> Name </th>
                      <th> Email </th>
                      <th> Referrer code </th>
                      <th>Item Cost</th>
                      <th> Amount paid </th>
                      <th> Paid By </th>
                      <th> Status </th>
                      <th> Date </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td style={{ textTransform: "capitalize" }}>
                          {transaction.name}{" "}
                        </td>
                        <td>
                          {transaction.referrer && transaction.referrer.email}{" "}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          {transaction.code}{" "}
                        </td>
                        <td> &#8358;{transaction.product_cost} </td>
                        <td>&#8358;{transaction.paid}</td>
                        <td>{transaction.approver}</td>
                        <td>
                          {transaction.status == 1 ? (
                            <span style={{ color: "green" }}>Approved</span>
                          ) : (
                            <span style={{ color: "red" }}>Pending</span>
                          )}
                        </td>

                        <td> {moment(transaction.updated_at).fromNow()}</td>
                        <td>
                          <ButtonGroup>
                            <Button
                              variant="outline-dark"
                              onClick={() => toggleEditTransaction(transaction)}
                              size="sm"
                            >
                              View
                            </Button>
                            <Button
                              variant="outline-dark"
                              onClick={() =>
                                toggleDeleteTransaction(transaction)
                              }
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
                    {transactions.length > 0 && (
                      <Pagination
                        total={total}
                        showTotal={(total) => `Total ${total} transactions`}
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

export default TransactionIndex;
