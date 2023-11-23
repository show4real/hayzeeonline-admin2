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
import { getNotices } from "../services/orderService";
import SpinDiv from "../components/SpinDiv";
import { throttle, debounce } from "../debounce";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import AddNotice from "./AddNotice";
import AddXml from "./AddXml";
// import DeleteNotice from "./DeleteNotice";

class NoticeIndex extends Component {
  state = {
    search: "",
    page: 1,
    rows: 10,
    loading: false,
    notices: [],
    total: 0,
    addNotice: false,
    addXml: false,
    editNotice: null,
    deleteNotice: null,
  };

  searchDebounced = debounce(this.searchNotices, 500);
  searchThrottled = throttle(this.searchNotices, 500);

  componentDidMount() {
    this.getNotices();
  }

  getNotices = () => {
    const { page, rows, search, notices } = this.state;
    this.setState({ loading: true });

    getNotices({ page, rows, search, notices })
      .then((res) => {
        this.setState({
          notices: res.notices.data,
          page: res.notices.current_page,
          total: res.notices.total,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  searchNotices = () => {
    const { page, rows, search, notices } = this.state;
    this.setState({ loading: false });

    getNotices({ page, rows, search, notices })
      .then((res) => {
        this.setState({
          notices: res.notices.data,
          page: res.notices.current_page,
          total: res.notices.total,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  onChange = (e, state) => {
    this.setState({ [state]: e });
  };

  onPage = async (page, rows) => {
    await this.setState({ page, rows });
    await this.getNotices();
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

  toggleAddNotice = () => {
    this.setState(
      (prevState) => ({ addNotice: !prevState.addNotice }),
      () => {
        this.getNotices();
      }
    );
  };
  toggleAddXml = () => {
    this.setState(
      (prevState) => ({ addXml: !prevState.addXml }),
      () => {
        this.getNotices();
      }
    );
  };

  toggleEditNotice = (editNotice) => {
    this.setState({ editNotice }, () => {
      this.getNotices();
    });
  };

  toggleEdit = () => {
    this.setState(
      (prevState) => ({ editNotice: !prevState.editNotice }),
      () => {
        this.getNotices();
      }
    );
  };

  toggle = () => {
    this.setState((prevState) => ({
      deleteNotice: !prevState.deleteNotice,
    }));
  };

  toggleDeleteNotice = (deleteNotice) => {
    this.setState({ deleteNotice });
  };

  render() {
    const {
      notices,
      total,
      page,
      rows,
      search,
      loading,
      addNotice,
      editNotice,
      deleteNotice,
      addXml,
    } = this.state;

    return (
      <div>
        {addNotice && (
          <AddNotice
            saved={this.searchNotices}
            addNotice={addNotice}
            toggle={this.toggleAddNotice}
          />
        )}

        {loading && <SpinDiv text={"Loading..."} />}
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
                            className: " breadcrumb-text-dark text-dark",
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
                            href="#notices"
                          >
                            notices
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
                            onClick={this.toggleAddNotice}
                          >
                            Add notice
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="8">
                    <h4 className="card-title">
                      notices{" "}
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
                </Row>

                <div className="table-responsive">
                  <table className="table table-nowrap ">
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notices.map((notice) => (
                        <tr key={notice.id}>
                          <td>{notice.notice}</td>
                          <td>
                            <ButtonGroup></ButtonGroup>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Row>
                    <Col md={12} style={{ fontWeight: "bold", paddingTop: 3 }}>
                      {notices.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} notices`}
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
      </div>
    );
  }
}

export default NoticeIndex;
