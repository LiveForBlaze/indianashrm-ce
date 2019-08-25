import React, { PureComponent } from "react";
import { Button } from "../../styles/styled-components/Dialogs";
import { ModalHeader, ModalBody, ModalFooter, Input, ErrorMessage } from "../../styles/styled-components/Dialogs";
import { AtomModal } from "../Atoms";

import API from "../../api";

class RestoreDialog extends PureComponent {

  state = {
    restored: false,
    email: "",
    error: "",
  }

  handleChange = (e) => {
    this.setState({email: e.target.value});
  }

  handleRestore = (e) => {
    e.preventDefault();
    const { email } = this.state;

    API.resetPassword(email, this.props.portalId)
     .end((error, response) => this.setState({error: error ? JSON.parse(error.response.text).message: "", restored: true}))
  }

  handleKeyDown = (e, cb) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      cb();
    }
  };

  render() {
    const { dialogName } = this.props;
    return (
      <AtomModal name={dialogName} hide={this.props.hide}>
        <ModalHeader>Password Reset</ModalHeader>
        {this.state.error && <ErrorMessage>{this.state.error}</ErrorMessage>}
        {
          this.state.restored && !this.state.error ? (
            <ModalBody>New password will be sent to <b>{this.state.email}</b></ModalBody>
          ) : (
          <form onSubmit={this.handleRestore} onKeyDown={this.handleKeyDown.bind(this, this.handleRestore)} method="POST">
            <Input type="email" placeholder="Email" name="username" onChange={this.handleChange} value={this.state.email} />
            <ModalFooter>
              <div /><div><Button type="submit">Reset Password</Button></div>
            </ModalFooter>
          </form>
          )
        }
      </AtomModal>
    )
  }
}

export default RestoreDialog;
