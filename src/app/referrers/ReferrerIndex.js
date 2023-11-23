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
import { getReferrers } from "../services/productService";
import SpinDiv from "../components/SpinDiv";

import { throttle, debounce } from "./debounce";
import moment from "moment";

import { Pagination } from "antd";
import EditReferrer from "./EditReferrer";
import DeleteReferrer from "./DeleteReferrer";
// import DeleteReferrer from "./DeleteReferrer";

export class ReferrerIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      referrers: [],
      page: 1,
      rows: 50,
      loading: false,
      total: 0,
    };
    this.searchDebounced = debounce(this.searchReferrers, 500);
    this.searchThrottled = throttle(this.searchReferrers, 500);
  }

  componentDidMount() {
    this.getReferrers();
  }

  getReferrers = () => {
    const { page, rows, search } = this.state;
    this.setState({ loading: true });
    getReferrers({ page, rows, search }).then(
      (res) => {
        this.setState({
          referrers: res.referrers.data,
          page: res.referrers.current_page,
          total: res.referrers.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  searchReferrers = () => {
    const { page, rows, search, referrers } = this.state;
    this.setState({ loading: false });
    getReferrers({ page, rows, search, referrers }).then(
      (res) => {
        this.setState({
          referrers: res.referrers.data,
          page: res.referrers.current_page,
          total: res.referrers.total,
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
    await this.getReferrers();
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

  toggleEditReferrer = (editReferrer) => {
    this.setState({ editReferrer });
    this.getReferrers();
  };

  toggleEdit = () => {
    this.setState({ editReferrer: !this.state.editReferrer });
    this.getReferrers();
  };

  toggle = () => {
    this.setState((prevState) => ({
      deleteReferrer: !prevState.deleteReferrer,
    }));
  };

  toggleDeleteReferrer = (deleteReferrer) => {
    this.setState({ deleteReferrer });
  };

  render() {
    const {
      referrers,
      total,
      page,
      rows,
      search,
      loading,
      editReferrer,
      deleteReferrer,
    } = this.state;
    return (
      <div>
        {editReferrer && (
          <EditReferrer
            saved={this.getReferrers}
            referrer={editReferrer}
            toggle={this.toggleEdit}
          />
        )}
        {deleteReferrer && (
          <DeleteReferrer
            saved={this.getReferrers}
            referrer={deleteReferrer}
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
                            href="#referrers"
                          >
                            referrers
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
                      Referrers{" "}
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
                        <th> Email </th>
                        <th> Code </th>
                        <th> Verified </th>
                        <th> Approved </th>
                        <th> Date </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrers.map((referrer) => (
                        <tr>
                          <td style={{ textTransform: "capitalize" }}>
                            {referrer.user && referrer.user.name}{" "}
                          </td>
                          <td>{referrer.user && referrer.user.email} </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {referrer.referral_code}
                          </td>
                          <td>
                            <ProgressBar
                              variant={
                                referrer.verified == 1 ? "success" : "warning"
                              }
                              now={100}
                            />
                          </td>
                          <td>
                            <ProgressBar
                              variant={
                                referrer.status == 1 ? "success" : "warning"
                              }
                              now={100}
                            />
                          </td>

                          <td style={{ textTransform: "capitalize" }}>
                            {moment(referrer.created_at).fromNow()}
                          </td>
                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() =>
                                  this.toggleEditReferrer(referrer)
                                }
                                size="sm"
                              >
                                View
                              </Button>

                              <Button
                                variant="outline-dark"
                                onClick={() => {
                                  //console.log('111')
                                  this.toggleDeleteReferrer(referrer);
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
                <Row>
                  <Col md={12} style={{ fontWeight: "bold", paddingTop: 3 }}>
                    {referrers.length > 0 && (
                      <Pagination
                        total={total}
                        showTotal={(total) => `Total ${total} referrers`}
                        onChange={this.onPage}
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
    );
  }
}

export default ReferrerIndex;
