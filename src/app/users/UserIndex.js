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
import { getUsers } from "../services/userService";
import SpinDiv from "../components/SpinDiv";

import { throttle, debounce } from "./debounce";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

// import AddUser from "./AddUser";

export class UserIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      rows: 10,
      loading: false,
      users: [],
      total: 0,
    };
    this.searchDebounced = debounce(this.searchUsers, 500);
    this.searchThrottled = throttle(this.searchUsers, 500);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    const { page, rows, search, users } = this.state;
    this.setState({ loading: true });

    getUsers({ page, rows, search, users }).then(
      (res) => {
        this.setState({
          users: res.users.data,
          page: res.users.current_page,
          total: res.users.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  searchUsers = () => {
    const { page, rows, search } = this.state;
    this.setState({ loading: false });
    getUsers({ page, rows, search }).then(
      (res) => {
        this.setState({
          users: res.users.data,
          page: res.users.current_page,
          total: res.users.total,
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
    await this.getUsers();
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

  toggleAddUser = () => {
    this.setState({ addUser: !this.state.addUser });
    this.getUsers();
  };

  toggleEditUser = (editUser) => {
    this.setState({ editUser });
    this.getUsers();
  };

  toggleEdit = () => {
    this.setState({ editUser: !this.state.editUser });
    this.getUsers();
  };

  toggle = () => {
    this.setState({ deleteUser: !this.state.deleteUser });
  };

  toggleDeleteUser = (deleteUser) => {
    this.setState({ deleteUser });
  };

  render() {
    const {
      users,
      total,
      page,
      rows,
      search,
      loading,
      addUser,
      editUser,
      deleteUser,
    } = this.state;
    return (
      <div>
        {addUser && (
          <AddUser
            saved={this.searchUsers}
            addUser={addUser}
            toggle={this.toggleAddUser}
          />
        )}
        {editUser && (
          <EditUser
            saved={this.getUsers}
            user={editUser}
            toggle={this.toggleEdit}
          />
        )}
        {deleteUser && (
          <DeleteUser
            saved={this.getUsers}
            user={deleteUser}
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
                            href="#users"
                          >
                            users
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
                            onClick={() => this.toggleAddUser()}
                          >
                            Add User
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
                      {" "}
                      Users{" "}
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
                        <th> Name </th>
                        <th> Email </th>
                        <th> Phone </th>
                        <th> Status </th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr>
                          {/* <td className="py-1">
                            <img
                              src={require("../../assets/images/faces/face1.jpg")}
                              alt="user icon"
                            />
                          </td> */}
                          <td>{user.name} </td>

                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>
                            <ProgressBar
                              variant={
                                user.is_active !== null ? "success" : "danger"
                              }
                              now={100}
                            />
                          </td>
                          <td>{user.admin == 1 ? "Admin" : "Customer"}</td>
                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() => this.toggleEditUser(user)}
                                size="sm"
                              >
                                Edit
                              </Button>

                              <Button
                                variant="outline-danger"
                                onClick={() => {
                                  //console.log('111')
                                  this.toggleDeleteUser(user);
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
                  <Row>
                    <Col md={12} style={{ fontWeight: "bold", paddingTop: 3 }}>
                      {users.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} users`}
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

export default UserIndex;
