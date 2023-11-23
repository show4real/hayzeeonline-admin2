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
import { getBrands } from "../services/categoryService";
import SpinDiv from "../components/SpinDiv";
import { throttle, debounce } from "../debounce";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import EditBrand from "./EditBrand";
import AddBrand from "./AddBrand";
import DeleteBrand from "./DeleteBrand";

class BrandIndex extends Component {
  state = {
    search: "",
    page: 1,
    rows: 10,
    loading: false,
    brands: [],
    total: 0,
    addBrand: false,
    editBrand: null,
    deleteBrand: null,
  };

  searchDebounced = debounce(this.searchBrands, 500);
  searchThrottled = throttle(this.searchBrands, 500);

  componentDidMount() {
    this.getBrands();
  }

  getBrands = () => {
    const { page, rows, search, brands } = this.state;
    this.setState({ loading: true });

    getBrands({ page, rows, search, brands })
      .then((res) => {
        this.setState({
          brands: res.brands.data,
          page: res.brands.current_page,
          total: res.brands.total,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  searchBrands = () => {
    const { page, rows, search, brands } = this.state;
    this.setState({ loading: false });

    getBrands({ page, rows, search, brands })
      .then((res) => {
        this.setState({
          brands: res.brands.data,
          page: res.brands.current_page,
          total: res.brands.total,
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
    await this.getBrands();
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

  toggleAddBrand = () => {
    this.setState(
      (prevState) => ({ addBrand: !prevState.addBrand }),
      () => {
        this.getBrands();
      }
    );
  };

  toggleEditBrand = (editBrand) => {
    this.setState({ editBrand }, () => {
      this.getBrands();
    });
  };

  toggleEdit = () => {
    this.setState(
      (prevState) => ({ editBrand: !prevState.editBrand }),
      () => {
        this.getBrands();
      }
    );
  };

  toggle = () => {
    this.setState(
      (prevState) => ({ deleteBrand: !prevState.deleteBrand }),
      () => {
        this.getBrands();
      }
    );
  };

  toggleDeleteBrand = (deleteBrand) => {
    this.setState({ deleteBrand });
  };

  render() {
    const {
      brands,
      total,
      page,
      rows,
      search,
      loading,
      addBrand,
      editBrand,
      deleteBrand,
    } = this.state;

    return (
      <div>
        {addBrand && (
          <AddBrand
            saved={this.searchBrands}
            addBrand={addBrand}
            toggle={this.toggleAddBrand}
          />
        )}
        {editBrand && (
          <EditBrand
            saved={this.getBrands}
            brand={editBrand}
            toggle={this.toggleEdit}
          />
        )}
        {deleteBrand && (
          <DeleteBrand
            saved={this.getBrands}
            brand={deleteBrand}
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
                            href="#brands"
                          >
                            Brands
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
                            onClick={this.toggleAddBrand}
                          >
                            Add Brand
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
                      Brands{" "}
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
                      {brands.map((brand) => (
                        <tr key={brand.id}>
                          <td>{brand.name}</td>
                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() => this.toggleEditBrand(brand)}
                                size="sm"
                              >
                                View
                              </Button>
                              <Button
                                variant="outline-danger"
                                onClick={() => this.toggleDeleteBrand(brand)}
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
                      {brands.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} brands`}
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

export default BrandIndex;
