import React, { Component } from "react";
import { Label, Input, Button, Col } from "reactstrap";
import "./App.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      dob: "",
      age: "",
      gender: "",
      country: "",
      submitClicked: false,
      searches: "",
      items: [],
      errors: {
        firstError: "",
        dobError: "",
        ageError: "",
        countryError: "",
        genderError: "",
      },
    };
  }
  onChangeFirst = (e) => {
    this.setState({
      firstname: e.target.value,
      firstError: "",
    });
  };
  onChangeDob = (e) => {
    this.setState({
      dob: e.target.value,
      dobError: "",
    });
  };
  onChangeAge = (e) => {
    this.setState({
      age: e.target.value,
      ageError: "",
    });
  };
  selectGender = (e) => {
    console.log("gender", e);
    this.setState({
      gender: e.target.value,
      genderError: "",
    });
  };
  selectCountry = (e) => {
    console.log("cont", e);
    this.setState({
      country: e.target.value,
      countryError: "",
    });
    console.log("con", this.state.country);
  };

  onClickButton = () => {
    let errors = this.state.errors;
    if (
      this.state.firstname &&
      this.state.dob &&
      this.state.age &&
      this.state.country &&
      this.state.gender
    ) {
      let user = {
        firstname: this.state.firstname,
        dob: this.state.dob,
        age: this.state.age,
        country: this.state.country,
        gender: this.state.gender,
      };
      let userD = Object.assign([], this.state.items);
      userD.push(user);
      this.setState({
        submitClicked: true,
        items: userD,
      });
    } else {
      if (!this.state.firstname) {
        this.setState({
          firstError: "Enter Name",
        });
      }
      if (!this.state.dob) {
        this.setState({
          dobError: "Enter DOB",
        });
      }
      if (!this.state.age) {
        this.setState({
          ageError: "Enter Age",
        });
      }
      if (!this.state.country) {
        this.setState({
          genderError: "Select Gender",
        });
      }
      if (!this.state.country) {
        this.setState({
          countryError: "Select Country",
        });
      }
    }
  };

  render() {
    return (
      <div className="body">
        <div className="home">
          <div className="form">
            <Label className="title"> Name </Label>
            <Input
              type="text"
              maxLength="10"
              onChange={this.onChangeFirst}
              value={this.state.firstname}
            />
            <p className="text-danger">
              {!this.state.firstname ? this.state.firstError : ""}
            </p>
            <br />

            <Label className="title"> DOB </Label>
            <Input
              type="date"
              onChange={this.onChangeDob}
              value={this.state.dob}
            />
            <p className="text-danger">
              {!this.state.dob ? this.state.dobError : ""}
            </p>
            <br />
            <Label className="title"> AGE </Label>
            <Input
              type="number"
              onChange={this.onChangeAge}
              value={this.state.age}
            />
            <p className="text-danger">
              {!this.state.age ? this.state.ageError : ""}
            </p>
            <br />
            <Label className="title"> GENDER </Label>
            <div value={this.state.gender} onChange={this.selectGender}>
              <input type="radio" value="MALE" name="gender" /> Male
              <input type="radio" value="FEMALE" name="gender" /> Female
              <input type="radio" value="OTHER" name="gender" /> Other
            </div>
            <p className="text-danger">
              {!this.state.gender ? this.state.genderError : ""}
            </p>

            <Label className="title"> Country </Label>
            <select
              name="category"
              value={this.state.country}
              onChange={this.selectCountry}
            >
              <option value="">Select...</option>
              <option value="INDIA">INDIA</option>
              <option value="JAPAN">JAPAN</option>
            </select>
            <p className="text-danger">
              {!this.state.country ? this.state.countryError : ""}
            </p>
            <br />

            <Button style={{ color: "blue" }} onClick={this.onClickButton}>
              {" "}
              SUBMIT
            </Button>
          </div>
        </div>

        <div>
          {this.state.items.map((item, index) => {
            return (
              <Col classname="Col" item xs={5} key={index}>
                <p>
                  <span>Name:{item.firstname}</span>
                </p>
                <p>
                  <span>DOB:{item.dob}</span>
                </p>
                <p>
                  <span>AGE:{item.age}</span>
                </p>
                <p>
                  <span>GENDER:{item.gender}</span>
                </p>
                <p>
                  <span>Country: {item.country}</span>
                </p>
              </Col>
            );
          })}
        </div>
      </div>
    );
  }
}
export default SignUp;
