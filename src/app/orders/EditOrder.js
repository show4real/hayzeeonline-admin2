import React, { Component } from "react";
import { Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";

import { Button } from "antd";

export class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      order: props.order,

      id: props.order.id,
      toggle: props.toggle,
    };
  }

  validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value) {
          return "name is Required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

  handleProductInput = (e) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: this.validate(e.target.name, e.target.value),
      },
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    });
  };

  totalOrderCost = () => {
    const { order } = this.state;

    return this.formatNumber(order.total_price);
  };

  formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // handleSubmit = (e) => {
  //   const { id } = this.state;

  //   e.preventDefault();

  //   this.setState({ saving: true });
  //   editOrder({
  //     id,
  //   })
  //     .then((v) => {
  //       this.setState({
  //         saving: false,
  //       });
  //       this.props.toggle();
  //       this.props.saved();
  //     })
  //     .catch((err) => {
  //       this.setState({ err });
  //     });
  // };
  render() {
    const { order, toggle, loading, saving, status } = this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={order != null}
        toggle={() => !loading && !saving && toggle}
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
              <h4 className="card-title">Order Details</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Customer Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Cloth Name"
                        // name="cloth_name"
                        disabled
                        value={order.user.name}
                        onChange={(event) => this.handleProductInput(event)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Customer Phone</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        // placeholder="Enter Price"
                        // name="price"
                        disabled
                        value={order.user.phone}
                        // onChange={(event) => this.handleProductInput(event)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">
                        Customer Address
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Customer Address"
                        disabled
                        value={order.user.address}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Order Status</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Status"
                        disabled
                        value={order.status == 1 ? "Confirmed" : "Pending"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Message</label>
                      <Form.Control
                        type="textarea"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Message"
                        disabled
                        value={order.description}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </form>
              <div className="table-responsive">
                <h3 className="card-title">Order List</h3>
                <table className="table table-nowrap ">
                  <thead>
                    <tr>
                      <th> Product Name </th>
                      <th> Quantity </th>
                      <th> Price </th>
                      <th> Total </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr>
                        <td style={{ textTransform: "capitalize" }}>
                          {product.product_name}{" "}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          {product.quantity}{" "}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          &#8358;{this.formatNumber(product.price)}{" "}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          &#8358;{this.formatNumber(product.total)}{" "}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        Total: &#8358;{this.totalOrderCost()}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* {(order.status == "Pending" || order.status == "Intransit") && (
                  <div style={{ float: "right" }}>
                    <Button
                      className="btn btn-outline-dark btn-sm"
                      type="submit"
                      loading={saving}
                      // onClick={this.handleSubmit}
                    >
                      Complete Order
                    </Button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default EditOrder;
