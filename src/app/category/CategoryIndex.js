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
import { getCategories } from "../services/categoryService";
import SpinDiv from "../components/SpinDiv";
import { throttle, debounce } from "../debounce";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";

class CategoryIndex extends Component {
  state = {
    search: "",
    page: 1,
    rows: 10,
    loading: false,
    categories: [],
    total: 0,
    addCategory: false,
    editCategory: null,
    deleteCategory: null,
  };

  searchDebounced = debounce(this.searchCategories, 500);
  searchThrottled = throttle(this.searchCategories, 500);

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    const { page, rows, search, categories } = this.state;
    this.setState({ loading: true });

    getCategories({ page, rows, search, categories })
      .then((res) => {
        this.setState({
          categories: res.categories.data,
          page: res.categories.current_page,
          total: res.categories.total,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  searchCategories = () => {
    const { page, rows, search, categories } = this.state;
    this.setState({ loading: false });

    getCategories({ page, rows, search, categories })
      .then((res) => {
        this.setState({
          categories: res.categories.data,
          page: res.categories.current_page,
          total: res.categories.total,
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
    await this.getCategories();
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

  toggleAddCategory = () => {
    this.setState(
      (prevState) => ({ addCategory: !prevState.addCategory }),
      () => {
        this.getCategories();
      }
    );
  };

  toggleEditCategory = (editCategory) => {
    this.setState({ editCategory }, () => {
      this.getCategories();
    });
  };

  toggleEdit = () => {
    this.setState(
      (prevState) => ({ editCategory: !prevState.editCategory }),
      () => {
        this.getCategories();
      }
    );
  };

  toggle = () => {
    this.setState((prevState) => ({
      deleteCategory: !prevState.deleteCategory,
    }));
  };

  toggleDeleteCategory = (deleteCategory) => {
    this.setState({ deleteCategory });
  };

  render() {
    const {
      categories,
      total,
      page,
      rows,
      search,
      loading,
      addCategory,
      editCategory,
      deleteCategory,
    } = this.state;

    return (
      <div>
        {addCategory && (
          <AddCategory
            saved={this.searchCategories}
            addCategory={addCategory}
            toggle={this.toggleAddCategory}
          />
        )}
        {editCategory && (
          <EditCategory
            saved={this.getCategories}
            category={editCategory}
            toggle={this.toggleEdit}
          />
        )}
        {deleteCategory && (
          <DeleteCategory
            saved={this.getCategories}
            category={deleteCategory}
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
                            href="#categories"
                          >
                            Categories
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
                            onClick={this.toggleAddCategory}
                          >
                            Add Category
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
                      Categories{" "}
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
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.name}</td>
                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() =>
                                  this.toggleEditCategory(category)
                                }
                                size="sm"
                              >
                                View
                              </Button>
                              <Button
                                variant="outline-danger"
                                onClick={() =>
                                  this.toggleDeleteCategory(category)
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
                      {categories.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} categories`}
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

export default CategoryIndex;
