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
import { getYoutubes } from "../services/orderService";
import SpinDiv from "../components/SpinDiv";
import { throttle, debounce } from "../debounce";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import AddYoutube from "./AddYoutube";
import AddXml from "./AddXml";
// import DeleteYoutube from "./DeleteYoutube";

class YoutubeIndex extends Component {
  state = {
    search: "",
    page: 1,
    rows: 10,
    loading: false,
    youtubes: [],
    total: 0,
    addYoutube: false,
    addXml: false,
    editYoutube: null,
    deleteYoutube: null,
  };

  searchDebounced = debounce(this.searchYoutubes, 500);
  searchThrottled = throttle(this.searchYoutubes, 500);

  componentDidMount() {
    this.getYoutubes();
  }

  getYoutubes = () => {
    const { page, rows, search, youtubes } = this.state;
    this.setState({ loading: true });

    getYoutubes({ page, rows, search, youtubes })
      .then((res) => {
        this.setState({
          youtubes: res.youtubes.data,
          page: res.youtubes.current_page,
          total: res.youtubes.total,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  searchYoutubes = () => {
    const { page, rows, search, youtubes } = this.state;
    this.setState({ loading: false });

    getYoutubes({ page, rows, search, youtubes })
      .then((res) => {
        this.setState({
          youtubes: res.youtubes.data,
          page: res.youtubes.current_page,
          total: res.youtubes.total,
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
    await this.getYoutubes();
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

  toggleAddYoutube = () => {
    this.setState(
      (prevState) => ({ addYoutube: !prevState.addYoutube }),
      () => {
        this.getYoutubes();
      }
    );
  };
  toggleAddXml = () => {
    this.setState(
      (prevState) => ({ addXml: !prevState.addXml }),
      () => {
        this.getYoutubes();
      }
    );
  };

  toggleEditYoutube = (editYoutube) => {
    this.setState({ editYoutube }, () => {
      this.getYoutubes();
    });
  };

  toggleEdit = () => {
    this.setState(
      (prevState) => ({ editYoutube: !prevState.editYoutube }),
      () => {
        this.getYoutubes();
      }
    );
  };

  toggle = () => {
    this.setState((prevState) => ({
      deleteYoutube: !prevState.deleteYoutube,
    }));
  };

  toggleDeleteYoutube = (deleteYoutube) => {
    this.setState({ deleteYoutube });
  };

  render() {
    const {
      youtubes,
      total,
      page,
      rows,
      search,
      loading,
      addYoutube,
      editYoutube,
      deleteYoutube,
      addXml,
    } = this.state;

    return (
      <div>
        {addYoutube && (
          <AddYoutube
            saved={this.searchYoutubes}
            addYoutube={addYoutube}
            toggle={this.toggleAddYoutube}
          />
        )}
        {addXml && <AddXml addXml={addXml} toggle={this.toggleAddXml} />}
        {/* {editYoutube && (
          <EditYoutube
            saved={this.getYoutubes}
            youtube={editYoutube}
            toggle={this.toggleEdit}
          />
        )} */}
        {/* {deleteYoutube && (
          <DeleteYoutube
            saved={this.getYoutubes}
            youtube={deleteYoutube}
            toggle={this.toggle}
          />
        )} */}
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
                            href="#youtubes"
                          >
                            youtubes
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
                            onClick={this.toggleAddYoutube}
                          >
                            Add Youtube
                          </Button>
                          <Button
                            style={{
                              textDecoration: "none",
                              color: "white",
                              backgroundColor: "black",
                              borderColor: "black",
                              fontWeight: "bold",
                            }}
                            size="sm"
                            onClick={this.toggleAddXml}
                          >
                            Add XML
                          </Button>
                          {/* <Button variant="outline-dark" size="sm">
                    Export
                  </Button> */}
                        </ButtonGroup>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="8">
                    <h4 className="card-title">
                      youtubes{" "}
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
                  {/* <Col lg="4" className="">
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
                  </Col> */}
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
                      {youtubes.map((youtube) => (
                        <tr key={youtube.id}>
                          <td>{youtube.youtubeid}</td>
                          <td>
                            <ButtonGroup>
                              {/* <Button
                                variant="outline-dark"
                                onClick={() => this.toggleEditYoutube(youtube)}
                                size="sm"
                              >
                                View
                              </Button> */}
                              {/* <Button
                                variant="outline-danger"
                                onClick={() =>
                                  this.toggleDeleteYoutube(youtube)
                                }
                                size="sm"
                              >
                                Delete
                              </Button> */}
                            </ButtonGroup>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Row>
                    <Col md={12} style={{ fontWeight: "bold", paddingTop: 3 }}>
                      {youtubes.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} youtubes`}
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

export default YoutubeIndex;
