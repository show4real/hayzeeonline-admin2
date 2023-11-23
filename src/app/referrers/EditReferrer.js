import React, { useState } from "react";
import { Modal } from "reactstrap";
import { Col, Row, Form } from "react-bootstrap";
import { editReferrer } from "../services/orderService";
import { Button, Checkbox } from "antd";

const EditReferrer = ({ referrer, toggle, saved }) => {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(referrer.status == 1 ? true : false);
  console.log(status);

  const handleReferrerInput = (e) => {
    // Handle referrer input if needed
  };

  const handleStatus = (e) => {
    setStatus(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaving(true);

    editReferrer({
      referrer_id: referrer.id,
      status: status,
    })
      .then(() => {
        setSaving(false);
        toggle();
        saved();
      })
      .catch((err) => {
        setSaving(false);
        console.error(err);
      });
  };

  return (
    <Modal
      className="modal-dialog modal-dialog-centered"
      isOpen={referrer !== null}
      toggle={() => !saving && toggle}
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
            <h4 className="card-title">Referrer Details</h4>

            <p className="card-description"> </p>
            <form className="forms-sample" onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Name</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Cloth Name"
                      disabled
                      value={referrer.user.name}
                      onChange={(event) => handleReferrerInput(event)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Phone</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      disabled
                      value={referrer.user.phone}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Code</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Customer Address"
                      disabled
                      value={referrer.referral_code}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label
                      className="label"
                      style={{ display: "block", paddingRight: 20 }}
                    >
                      {" "}
                      Verified
                    </label>
                    <Checkbox
                      className="form-check-input"
                      checked={referrer.verified == 1 ? true : false}
                      // onChange={handleStatus}
                      disabled
                    >
                      {" "}
                      {referrer.verified == 1 ? "Active" : "Pending"}
                    </Checkbox>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <div className="form-check">
                      <label
                        className="label"
                        style={{ display: "block", paddingRight: 20 }}
                      >
                        {" "}
                        Status
                      </label>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={status}
                        onChange={(e) => handleStatus(e.target.checked)}
                      />
                      <i className="input-helper"></i>
                    </div>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Code</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Customer Address"
                      disabled
                      value={referrer.referral_code}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Bank</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Status"
                      disabled
                      value={referrer.bank_name}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Account Name</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Status"
                      disabled
                      value={referrer.account_name}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Account Number</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Account Number"
                      disabled
                      value={referrer.account_number}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Account Type</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Account Type"
                      disabled
                      value={referrer.account_type}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div style={{ float: "right" }}>
                    <Button
                      className="btn btn-outline-dark btn-sm"
                      htmlType="submit"
                      loading={saving}
                    >
                      Update
                    </Button>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditReferrer;
