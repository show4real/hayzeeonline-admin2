import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class AuthRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <Route
        {...props}
        render={(props) =>
          user !== null ? <Redirect to="/" /> : <Component {...props} />
        }
      />
    );
  }
}

export default AuthRoute;
