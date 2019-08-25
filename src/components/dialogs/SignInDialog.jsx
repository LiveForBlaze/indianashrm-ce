import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { inject } from "mobx-react";

import SignInForm from "./../../components/forms/SignInForm";
import { AtomModal } from "../Atoms";
import { ErrorMessage } from "../../styles/styled-components/TrackPage";
import { ModalHeader } from "../../styles/styled-components/Dialogs";
import API from "./../../api";

class SignInDialog extends PureComponent {

  state = { errorMessage: "", isSubmitLocked: false }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({isSubmitLocked: true})
    const formElements = e.target.elements,
          email = formElements.email.value,
          password = formElements.password.value,
          { store, portalId, name } = this.props;
    API.login(email, password, portalId)
      .end((error, response) => {
        this.setState({isSubmitLocked: false})
        if(error) {
          this.setState({isFailed: true, errorMessage: JSON.parse(error.response.text).error_description})
        }
        else {
          localStorage.setItem(`${name}-access_token`, response.body.access_token);
          API.getUser("me", name).end((err, resp) => {
            if(err) {
              this.setState({isFailed: true, errorMessage: JSON.parse(resp.response.text).error_description})
            }
            else {
              store.setUser(resp.body);
              this.props.history.push(this.props.name === "ishrm-2018" ? "/2018/portal" : "portal");
            }
          });
        }
      })
  }

  render() {
    const { dialogName, hide } = this.props,
          { errorMessage, isSubmitLocked } = this.state;
    return (
      <AtomModal show={true} name={dialogName} hide={hide}>
        <ModalHeader>Sign In</ModalHeader>
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <SignInForm {...this.props} locked={isSubmitLocked} onSubmit={this.handleSubmit} />
      </AtomModal>
    );
  }
};

SignInDialog.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default withRouter(inject("store")(SignInDialog));
