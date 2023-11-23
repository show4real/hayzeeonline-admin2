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
import { getBlogs } from "../services/blogService";
import SpinDiv from "../components/SpinDiv";
import { throttle, debounce } from "../debounce";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import EditBlog from "./EditBlog";
import AddBlog from "./AddBlog";
import DeleteBlog from "./DeleteBlog";

class BlogIndex extends Component {
  state = {
    search: "",
    page: 1,
    rows: 10,
    loading: false,
    blogs: [],
    total: 0,
    addBlog: false,
    editBlog: null,
    deleteBlog: null,
  };

  searchDebounced = debounce(this.searchBlogs, 500);
  searchThrottled = throttle(this.searchBlogs, 500);

  componentDidMount() {
    this.getBlogs();
  }

  getBlogs = () => {
    const { page, rows, search, blogs } = this.state;
    this.setState({ loading: true });

    getBlogs({ page, rows, search, blogs })
      .then((res) => {
        this.setState({
          blogs: res.blogs.data,
          page: res.blogs.current_page,
          total: res.blogs.total,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  searchBlogs = () => {
    const { page, rows, search, blogs } = this.state;
    this.setState({ loading: false });

    getBlogs({ page, rows, search, blogs })
      .then((res) => {
        this.setState({
          blogs: res.blogs.data,
          page: res.blogs.current_page,
          total: res.blogs.total,
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
    await this.getBlogs();
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

  toggleAddBlog = () => {
    this.setState(
      (prevState) => ({ addBlog: !prevState.addBlog }),
      () => {
        this.getBlogs();
      }
    );
  };

  toggleEditBlog = (editBlog) => {
    this.setState({ editBlog }, () => {
      this.getBlogs();
    });
  };

  toggleEdit = () => {
    this.setState(
      (prevState) => ({ editBlog: !prevState.editBlog }),
      () => {
        this.getBlogs();
      }
    );
  };

  toggle = () => {
    this.setState((prevState) => ({
      deleteBlog: !prevState.deleteBlog,
    }));
  };

  toggleDeleteBlog = (deleteBlog) => {
    this.setState({ deleteBlog });
  };

  render() {
    const {
      blogs,
      total,
      page,
      rows,
      search,
      loading,
      addBlog,
      editBlog,
      deleteBlog,
    } = this.state;

    return (
      <div>
        {addBlog && (
          <AddBlog
            saved={this.searchBlogs}
            addBlog={addBlog}
            toggle={this.toggleAddBlog}
          />
        )}
        {editBlog && (
          <EditBlog
            saved={this.getBlogs}
            blog={editBlog}
            toggle={this.toggleEdit}
          />
        )}
        {deleteBlog && (
          <DeleteBlog
            saved={this.getBlogs}
            blog={deleteBlog}
            toggle={this.toggle}
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
                            href="#blogs"
                          >
                            Blogs
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
                            onClick={this.toggleAddBlog}
                          >
                            Add Blog
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
                      Blogs{" "}
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
                        onChange={this.handleSearch}
                      />
                    </div>
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
                      {blogs.map((blog) => (
                        <tr key={blog.id}>
                          <td>{blog.name}</td>
                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() => this.toggleEditBlog(blog)}
                                size="sm"
                              >
                                View
                              </Button>
                              <Button
                                variant="outline-danger"
                                onClick={() => this.toggleDeleteBlog(blog)}
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
                      {blogs.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} blogs`}
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

export default BlogIndex;
