import React, { Component } from "react";

import SignInDialog from "../dialogs/SignInDialog";
import SignUpDialog from "../dialogs/SignUpDialog";
import RestoreDialog from "../dialogs/RestoreDialog";

import Logo2018 from "../../assets/images/ishrm_logo.png";
import Logo2019 from "../../assets/images/logo.png";
import { Button, Header } from "../../styles/styled-components/Common";
import { Main, MainContent, MainList, Bottom, Copyright } from "../../styles/styled-components/HomePage";
import { HomePageData } from "../../data";
import "../../styles/home_page.css";
import API from "../../api";
import config from "../../UIconfig";

class HomePage extends Component {
  state = {
    data: null,
    dialogOpened: "",
    logged: this.props.user
  }
  handleLogout = () => {
    API.logOut(this.props.name);
    this.setState({logged: false})
  }
  handleShowModal = (e) => {
    const name = e.target.dataset.name;
    console.log(e.target, this.state.dialogOpened)
    this.setState({dialogOpened: this.state.dialogOpened === name ? "" : name});
  }
  handleProceed = () => {
    this.props.history.push(this.props.name === "ishrm-2018" ? "/2018/portal" : "portal");
  }
  render() {
    const data = HomePageData[this.props.name],
          { name } = this.props,
          { dialogOpened, logged } = this.state,
          isOldPortal = name === "ishrm-2018",
          { HomePageCentralButtonTextLogged, HomePageCentralButtonText, DialogSignInButtonText, DialogSignUpButtonText, LogoAltText } = config;
    return (
      <div className="home-page-new">
        <Header>
          <div className="home-page-header-new">
            <div className="home-page-header-logo-new">
              <img src={isOldPortal ? Logo2018 : Logo2019} className="home-page-header-logo__image-new" alt={LogoAltText} />
            </div>
            <div className="header-buttons">
            {
              !logged ?
                <div>
                  <Button reversed data-name="isLoginDialogShown" onClick={this.handleShowModal} right={20}>{DialogSignInButtonText}</Button>
                  <Button data-name="isSignupDialogShown" onClick={this.handleShowModal}>{DialogSignUpButtonText}</Button>
                </div>
              : <Button onClick={this.handleLogout}>Log Out</Button>
            }
            </div>
          </div>
        </Header>
        <Main background>
          <div>
            <MainContent>
              <h1 className="home-page__heading-new">
                {data.headerText}
              </h1>
              <MainList>
                {
                  data.list.map((item, i) => { return <li key={i}>{item}</li> })
                }
              </MainList>
            </MainContent>
            <div className="main-button">
              <Button data-name="isSignupDialogShown" onClick={this.props.user ? this.handleProceed : this.handleShowModal}>{logged ? HomePageCentralButtonTextLogged : HomePageCentralButtonText}</Button>
            </div>
          </div>
        </Main>
        <Bottom>
          <div className="containerBlock">
            {data.middleText}
          </div>
        </Bottom>
        <Copyright>{data.copyrightText}</Copyright>
        { dialogOpened === "isSignupDialogShown" && <SignUpDialog dialogName="isSignupDialogShown" hide={this.handleShowModal} {...this.props} /> }
        { dialogOpened === "isLoginDialogShown" && <SignInDialog dialogName="isLoginDialogShown" hide={this.handleShowModal} {...this.props} /> }
        { dialogOpened === "isResotreShown" && <RestoreDialog dialogName="isResotreShown" hide={this.handleShowModal} {...this.props} /> }
      </div>
    );
  }
};

export default HomePage;
