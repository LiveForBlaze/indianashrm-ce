import React, { PureComponent, Fragment } from "react";
import { ModalHeader, Footer, Text, ErrorMessage } from "../../styles/styled-components/BuyLinks";

import config from "../../config";
import UIconfig from "../../UIconfig";
import API from "../../api";

class SignUpForm extends PureComponent {
  state = {
    isSuccess: false,
    isFailed: false,
    errorMessage: "",
  }
  componentDidMount() {
    this.stripe = window.Stripe(config["stripeKey"]);
    console.log(this.state.windowWidth)
    const windowWidth = window.innerWidth,
          fontSize = windowWidth > 1440 ? "16px" : windowWidth > 1024 ? "14px" : windowWidth > 768 ? "12px" : "10px" ;
    const style = { base: { fontSize } };
    const { cardElementRef } = this.props;

    if (cardElementRef.current) {
      const elements = this.stripe.elements();
      this.card = elements.create("card", { hidePostalCode: true, style });
      this.card.mount(cardElementRef.current);
    }
  }

   handleKeyDown = (e, cb) => {
     if (e.keyCode === 13 && e.shiftKey === false) {
       e.preventDefault();
       cb();
     }
   };

  componentWillUnmount() {
    if (this.card) {
      this.card.destroy();
      this.card = null;
    }
    this.stripe = null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, amount, submit, name, portalId } = this.props,
          [ firstName, lastName ] = fullName.split(" ");
    submit(true, true);
    if (!fullName || !email || !password) {
      submit(true, false);
      return this.setState({isFailed: true, errorMessage: "You need to fill in all the required fields."});
    } else {
      this.setState({isFailed: false, errorMessage: ""})
    }
    this.stripe.createToken(this.card).then(result => {
      if(result.error) {
        submit(false);
        this.setState({isFailed: true, errorMessage: result.error.message})
      } else {
        API.register(email, password, firstName, lastName, fullName, result.token.id, amount, portalId, name)
          .then(resp => {
            this.setState({isSuccess: true});
          })
          .catch(err => {
            if(err.response) {
              submit(false);
              this.setState({isFailed: true, errorMessage: JSON.parse(err.response.text).message})
            }
        })
      }
    })
  }

  render() {
    const { isSuccess, isFailed, errorMessage } = this.state,
          { SupportEmail } = UIconfig[this.props.name];
    return (
      <form onSubmit={this.handleSubmit} onKeyDown={this.handleKeyDown.bind(this, this.handleSubmit)} method="POST">
        {isSuccess ? (
          <Fragment>
            <ModalHeader>Success!</ModalHeader>
            <Text>
              You will get an email confirmation now and another email when recordings will be available.
            </Text>
            <Footer>
              <div>
                <div>Support: <a href={`mailto:${SupportEmail}`}>{SupportEmail}</a></div>
              </div>
            </Footer>
          </Fragment>
        ) : (
          <Fragment>
            {isFailed && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {this.props.children}
          </Fragment>)}
      </form>
    );
  }
};

export default SignUpForm;
