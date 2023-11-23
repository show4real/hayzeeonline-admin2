import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import SettingsPanel from "./shared/SettingsPanel";
import Footer from "./shared/Footer";
import { withTranslation } from "react-i18next";

import "antd/dist/reset.css";
import "./style.css";

class App extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
  };
  componentDidMount() {
    this.onRouteChanged();
  }

  checkSideBar = () => {
    const { user } = this.state;
    let sidebarComponent;
    if (!this.state.isFullPageLayout && user && user.admin == 1) {
      sidebarComponent = <Sidebar />;
    }
    return sidebarComponent;
  };
  render() {
    const { user } = this.state;
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : "";
    // let sidebarComponent = !this.state.isFullPageLayout ? (
    //   user && user.admin == 1 ? (
    //     <Sidebar />
    //   ) : (
    //     <Sidebar2 />
    //   )
    // ) : (
    //   ""
    // );

    let SettingsPanelComponent = !this.state.isFullPageLayout ? (
      <SettingsPanel />
    ) : (
      ""
    );
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : "";
    return (
      <>
        <div className="container-scroller">
          {user !== null && navbarComponent}
          <div className="container-fluid page-body-wrapper">
            {user !== null && this.checkSideBar()}

            <div className="main-panel">
              <div className="content-wrapper">
                <AppRoutes />
                {user !== null && SettingsPanelComponent}
              </div>
              {user !== null && footerComponent}
            </div>
          </div>
        </div>
      </>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    const { i18n } = this.props;
    const body = document.querySelector("body");
    if (this.props.location.pathname === "/layout/RtlLayout") {
      body.classList.add("rtl");
      i18n.changeLanguage("ar");
    } else {
      body.classList.remove("rtl");
      i18n.changeLanguage("en");
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
      "/user-pages/login-1",
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/user-pages/login-2",
      "/user-pages/register-1",
      "/user-pages/register-2",
      "/user-pages/lockscreen",
      "/error-pages/error-404",
      "/error-pages/error-500",
      "/general-pages/landing-page",
    ];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
        break;
      } else {
        this.setState({
          isFullPageLayout: false,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.remove("full-page-wrapper");
      }
    }
  }
}

export default withTranslation()(withRouter(App));
