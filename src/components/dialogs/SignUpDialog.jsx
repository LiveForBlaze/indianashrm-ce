import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import SignUp from "../forms/SignUpForm";

import { AtomModal } from "../Atoms";
import { ModalHeader, ModalFooter, Button, Input, Prices, Card } from "../../styles/styled-components/Dialogs";

import config from "../../UIconfig";

class SignUpDialog extends PureComponent {

  state = {
    fullName: '',
    email: '',
    password: '',
    isSubmitClicked: false,
    isSubmitLocked: false,
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (clicked=true, locked=false) => {
    this.setState({isSubmitClicked: clicked, isSubmitLocked: locked})
  }

  render() {
    const { HomePageCentralButtonText, DialogSignUpButtonText, SupportEmail } = config,
          cardElementRef = React.createRef(),
          { fullName, email, password, isSubmitClicked, isSubmitLocked, isAttendee } = this.state,
          { dialogName, hide, name, portalId } = this.props;
    return (
      <AtomModal name={dialogName} hide={hide}>
        <ModalHeader>{HomePageCentralButtonText}</ModalHeader>
        <SignUp name={name} portalId={portalId} submit={this.onSubmit} {...{cardElementRef, ...this.state}}>
          <Input error={isSubmitClicked && !fullName} type="text" placeholder="Full Name" name="fullName" onChange={this.handleChange} value={fullName} bottomless />
          <Input error={isSubmitClicked && !email} type="email" placeholder="Email" name="email" onBlur={this.handleCheckEmail} onChange={this.handleChange} value={email} bottomless />
          <Input error={isSubmitClicked && !password} type="password" autocomplete="current-password" placeholder="Create Password" name="password" onChange={this.handleChange} value={password}/>
          <Prices>
            <div className={(isAttendee && isAttendee !== null) ? "invisible": ""}>
              $149 - regular price
            </div>
          </Prices>
          <Card ref={cardElementRef} className="form_bordered" />
          <ModalFooter>
            <div>
              <div>Support: <a href={`mailto:${SupportEmail}`}>{SupportEmail}</a></div>
            </div>
            <div>
              <Button disabled={isSubmitLocked} type="submit">{DialogSignUpButtonText}</Button>
            </div>
          </ModalFooter>
        </SignUp>
      </AtomModal>
    );
  }
};

export default withRouter(SignUpDialog);
