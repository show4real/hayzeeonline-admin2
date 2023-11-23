import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class VendorRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;
    const user =
      JSON.parse(localStorage.getItem("user")) !== null
        ? JSON.parse(localStorage.getItem("user"))
        : {};
    console.log(this.props);

    return (
      <Route
        {...props}
        render={(props) =>
          user.vendor === 1 ? (
            <Component {...props} />
          ) : (
            <Redirect to="/auth/login" />
          )
        }
      />
    );
  }
}

export default VendorRoute;
