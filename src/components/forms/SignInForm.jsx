import React from "react";
import PropTypes from "prop-types";
import { ModalFooter, Button, ForgotPassword } from "../../styles/styled-components/Dialogs";

import config from "../../UIconfig";

const SignInForm = ({onSubmit, locked, name, hide}) => {
  return (
    <form onSubmit={onSubmit} method="POST">
      <div className="form-group">
        <input type="email" autoComplete="username" className="form-control form_bordered form_bordered_bottomless" name="email" id="signin-form-email" placeholder="Email" required />
        <input type="password" autoComplete="current-password" className="form-control form_bordered" name="password" id="signin-form-password" placeholder="Password" required />
      </div>
      <ModalFooter>
        <div>
          <ForgotPassword onClick={hide}><span data-name="isResotreShown">Forgot password?</span></ForgotPassword>
          <div>Support: <a href={`mailto:${config[name].SupportEmail}`}>{config[name].SupportEmail}</a></div>
        </div>
        <div>
          <Button type="submit" disabled={locked}>Sign In</Button>
        </div>
      </ModalFooter>
    </form>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SignInForm;
