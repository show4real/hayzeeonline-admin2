import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class AdminRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(this.props);

    return (
      <Route
        {...props}
        render={(props) =>
          user !== null ? (
            <Component {...props} />
          ) : (
            <Redirect to="/auth/login" />
          )
        }
      />
    );
  }
}

export default AdminRoute;
