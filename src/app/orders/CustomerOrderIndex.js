import React, { Component } from "react";
import {
  ProgressBar,
  Row,
  Col,
  Breadcrumb,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { Input } from "reactstrap";
import { getOrders } from "../services/productService";
import SpinDiv from "../components/SpinDiv";

import { throttle, debounce } from "./debounce";

import { Pagination } from "antd";
import EditOrder from "./EditOrder";
import DeleteOrder from "./DeleteOrder";
// import DeleteOrder from "./DeleteOrder";

export class CustomerOrderIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      orders: [],
      page: 1,
      rows: 10,
      loading: false,
      total: 0,
    };
    this.searchDebounced = debounce(this.searchOrders, 500);
    this.searchThrottled = throttle(this.searchOrders, 500);
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    const { page, rows, search } = this.state;
    this.setState({ loading: true });
    getOrders({ page, rows, search }).then(
      (res) => {
        this.setState({
          orders: res.orders.data,
          page: res.orders.current_page,
          total: res.orders.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  searchOrders = () => {
    const { page, rows, search, orders } = this.state;
    this.setState({ loading: false });
    getOrders({ page, rows, search, orders }).then(
      (res) => {
        this.setState({
          orders: res.orders.data,
          page: res.orders.current_page,
          total: res.orders.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  onChange = (e, state) => {
    this.setState({ [state]: e });
  };

  onPage = async (page, rows) => {
    await this.setState({ page, rows });
    await this.getOrders();
  };

  handleSearch = (event) => {
    this.setState({ search: event.target.value }, () => {
      if (this.state.search < 5) {
        this.searchThrottled(this.state.search);
      } else {
        this.searchDebounced(this.state.search);
      }
    });
  };

  toggleEditOrder = (editOrder) => {
    this.setState({ editOrder });
    this.getOrders();
  };

  toggleEdit = () => {
    this.setState({ editOrder: !this.state.editOrder });
    this.getOrders();
  };

  toggle = () => {
    this.setState((prevState) => ({
      deleteOrder: !prevState.deleteOrder,
    }));
  };

  toggleDeleteOrder = (deleteOrder) => {
    this.setState({ deleteOrder });
  };

  render() {
    const {
      orders,
      total,
      page,
      rows,
      search,
      loading,
      editOrder,
      deleteOrder,
    } = this.state;
    return (
      <div>
        {editOrder && (
          <EditOrder
            saved={this.getOrders}
            order={editOrder}
            toggle={this.toggleEdit}
          />
        )}
        {deleteOrder && (
          <DeleteOrder
            saved={this.getOrders}
            order={deleteOrder}
            toggle={this.toggle}
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
                            href="#orders"
                          >
                            Orders
                          </Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                      <div className="btn-toolbar mb-2 mb-md-0"></div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="8">
                    <h4 className="card-title">
                      {" "}
                      Orders{" "}
                      <span
                        style={{
                          color: "#aaa",
                          fontSize: 14,
                          fontWeight: "normal",
                        }}
                      >
                        {" "}
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
                        onChange={this.handleSearch}
                      />
                    </div>
                  </Col>
                </Row>

                <div className="table-responsive">
                  <table className="table table-nowrap ">
                    <thead>
                      <tr>
                        <th> Customer Name </th>
                        <th> Phone </th>
                        <th> Order ID </th>

                        <th> status </th>
                        <th> Date </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr>
                          <td style={{ textTransform: "capitalize" }}>
                            {order.user && order.user.name}{" "}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {order.user && order.user.phone}{" "}
                          </td>

                          <td style={{ textTransform: "capitalize" }}>
                            {order.id}{" "}
                          </td>
                          <td>
                            <ProgressBar
                              variant={
                                order.status == 1 ? "success" : "warning"
                              }
                              now={100}
                            />
                          </td>

                          <td style={{ textTransform: "capitalize" }}>
                            {order.created_at}{" "}
                          </td>
                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() => this.toggleEditOrder(order)}
                                size="sm"
                              >
                                View
                              </Button>

                              <Button
                                variant="outline-dark"
                                onClick={() => {
                                  //console.log('111')
                                  this.toggleDeleteOrder(order);
                                }}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerOrderIndex;
