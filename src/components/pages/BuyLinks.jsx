import React, { Component } from "react";
import { Button, BuyMain, BuyBody, BuyHeader, Text, Prices, BuyHeaderLine, Footer, Input, Card } from "../../styles/styled-components/BuyLinks";
import SignUp from "../forms/SignUpForm";

import Logo2018 from "../../assets/images/ishrm_logo.png";
import Logo2019 from "../../assets/images/logo.png";

import config from "../../UIconfig";

class BuyLinks extends Component {
  state = {
    fullName: '',
    email: '',
    password: Math.random().toString(36).slice(-8),
    amount: 0,
    priceText: "",
    isSubmitLocked: false,
    fullNameHasError: false,
    emailHasError: false,
  }

  componentDidMount() {
    const link = this.props.match.url.slice(1);
    if (link === "pre") {
      this.setState({amount: 89, priceText: "special pre-conference price"})
    } else if(link === "onsite") {
      this.setState({amount: 99, priceText: "for attendees only"})
    } else {
      this.setState({amount: 149, priceText: "regular price"})
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value, isSubmitLocked: false});
  }

  handleSubmit = () => {
    this.setState({isSubmitLocked: !this.state.isSubmitLocked});
  }

  handleCheckErrors = (fullNameHasError, emailHasError) => {
    this.setState({fullNameHasError, emailHasError});
  }

  render() {
    const cardElementRef = React.createRef(),
          isOldPortal = this.props.name === "ishrm-2018",
          { SupportEmail } = config[this.props.name],
          { amount, priceText, fullName, email, fullNameHasError, emailHasError, password, isSubmitLocked } = this.state;
    return(
      <BuyMain className="containerBlock">
        <BuyHeader>
          <img src={isOldPortal ? Logo2018 : Logo2019} className="home-page-header-logo__image-new" alt="Logo" />
          <BuyHeaderLine>
            Access Top HR Education from <br/>INDIANA SHRM Now!
          </BuyHeaderLine>
        </BuyHeader>
        <BuyBody>
          <SignUp name={this.props.name} portalId={this.props.portalId} fieldCheck={this.handleCheckErrors} submit={this.handleSubmit} {...{cardElementRef, ...this.state}}>
            <Text>
            The HR Indiana Conference is one of the largest regional human resources conferences in the United States.
            We offer world-renowned keynote speakers, three days of educational sessions, networking opportunities and exposure to the latest HR products and services.
            <ul>
              <li>60+ hours of courses</li>
              <li>from top experts in human resources</li>
              <li>24-hour access on desktop and mobile devices</li>
            </ul>
            </Text>
            <div>
              <Input type="text" error={fullNameHasError && !fullName} placeholder="Full Name" name="fullName" onChange={this.handleChange} value={fullName} inline margin />
              <Input type="email" error={emailHasError && !email} placeholder="Email" name="email" onChange={this.handleChange} value={email} inline  />
            </div>
            <Input type="hidden" placeholder="Create Password" name="password" onChange={this.handleChange} deafaultValue={password} value={password}/>
            <Prices>
              ${amount} - {priceText} <br/>
            </Prices>
            <Card ref={cardElementRef} className="form_bordered" />
            <Footer>
              <div>
                <div>Support: <a href={`mailto:${SupportEmail}`}>{SupportEmail}</a></div>
              </div>
              <div>
                <Button disabled={isSubmitLocked} type="submit">Buy</Button>
              </div>
            </Footer>
          </SignUp>
        </BuyBody>
      </BuyMain>
    )
  }
}

export default BuyLinks;
