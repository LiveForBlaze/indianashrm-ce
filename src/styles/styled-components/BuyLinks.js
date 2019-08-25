import styled from "styled-components";
import config from "../../UIconfig";

const device = {
  mobileS: '(max-width: 320px)',
  mobileM: '(max-width: 375px)',
  mobileL: '(max-width: 425px)',
  tablet: '(max-width: 768px)',
  laptop: '(max-width: 1024px)',
  laptopL: '(max-width: 1440px)',
  laptopXL: '(max-width: 1920px)',
  desktop: '(max-width: 2560px)'
}

export const BuyMain = styled.div `
  width: 50vw;
  min-width: 400px;
  max-width: 600px;
  margin: auto;
  font-size: 0.9em;
  padding-bottom: 30px;
`;

export const Button = styled.button `
  padding:  ${props => props.big ? config.HomePageMainBigButtonPadding : config.HomePageMainButtonPadding};
  margin-left: ${props => props.margin ? props.margin : "20px"};
  background: ${props => props.reversed ? config.ButtonSecondaryColor : config.MainColor};
  color: ${props => props.reversed ? config.MainColor : config.ButtonSecondaryColor};
  border: 2px solid ${config.MainColor};
  border-radius: ${props => props.radius ? props.radius : "0px"};
  font-size: ${props => props.small ? "1.2em" : `${config.HomePageMainButtonFontSize}px`};
  font-weight: ${props => props.bold ? 600 : 300};
  &:hover {
    background: ${props => props.reversed ? config.MainColor : config.ButtonSecondaryColor};
    color: ${props => props.reversed ? config.ButtonSecondaryColor : config.MainColor};
    border-color: ${props => props.bg ? "white" : config.MainColor};
    cursor: pointer;
    ${props => props.disabled && "color: rgb(210,210,210); border-color: rgb(210,210,210); background: white; cursor: not-allowed"}
  }
  ${props => props.disabled && "color: rgb(210,210,210); border-color: rgb(210,210,210); background: white;"}
  @media ${device.laptopXL} {
    font-size: ${props => props.small ? "0.9em" : `${config.HomePageMainButtonFontSize-2}px`};
  }
  @media ${device.laptopL} {
    font-size: ${props => props.small ? "0.9em" : `${config.HomePageMainButtonFontSize-3}px`};
  }
  @media ${device.laptop} {
    font-size: ${props => props.small ? "0.9em" : `${config.HomePageMainButtonFontSize-4}px`};
  }
  @media ${device.tablet} {
    font-size: ${props => props.small ? "0.5em" : `${config.HomePageMainButtonFontSize-6}px`};
  }
  @media ${device.mobileL} {
    font-size: ${props => props.small ? "0.4em" : `${config.HomePageMainButtonFontSize-8}px`};
    padding:  0.4em 2em;
  }
  @media ${device.mobileS} {
    font-size: ${props => props.small ? "0.4em" : `${config.HomePageMainButtonFontSize-10}px`};
    display: block;
    margin-bottom: 1vw;
    padding:  0.3em 1em;
  }
`;

export const BuyBody = styled.div `
  padding: 10px;
`;

export const BuyHeader = styled.div `
  padding: 0;
  > img {
    margin-bottom: 10px;
    height: 100px;
  }
  @media ${device.tablet} {
    padding-bottom: 5px;
  }
`;

export const BuyHeaderLine = styled.div `
  background: ${config.MainColor};
  padding: 10px;
  color: white;
  text-align: center;
  font-size: 22px;
`;

export const Text = styled.div `
  font-size: 16px;
  > ul {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  @media ${device.tablet} {
    font-size: 14px;
  }
`;

export const ModalHeader = styled.div `
  font-size: 35px;
  text-align: center;
  margin-bottom: 30px;
  color: ${props => props.color ? props.color : config.HomePageMainButtonColor};
  @media ${device.laptopXL} {
    font-size: 30px;
  }
  @media ${device.laptop} {
    font-size: 28px;
    margin-bottom: 15px;
  }
  @media ${device.tablet} {
    font-size: 26px;
    margin-bottom: 10px;
  }
  @media ${device.mobileL} {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

export const ErrorMessage = styled.div `
  width: 100%;
  padding: 20px;
  border: 1px solid rgba(255,10,10,.7);
  color: rgba(255,10,10,.7);
  background: rgba(255,10,10,.2);
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 20px;
  text-align: center;
  @media ${device.laptop} {
    font-size: 12px;
  }
`;

export const Footer = styled.div `
  display: flex;
  width: 100%;
  margin-top: 30px;
  padding: 0;
  align-items: center;
  font-size: 14px;
  @media ${device.tablet} {
    margin-top: 10px;
  }
  > div:nth-child(1) {
    flex: 1;
    display: flex;
    flex-direction: column;
    @media ${device.laptopXL} {
      font-size: 12px;
    }
    @media ${device.laptopL} {
      font-size: 11px;
    }
    @media ${device.laptop} {
      font-size: 10px;
    }
  }
`;

export const Input = styled.input `
  display: ${props => props.inline ? "inline-block" : "block"};
  width: ${props => props.inline ? "48%" : "100%"};
  padding: 10px;
  margin-right: ${props => props.margin && "4%"};
  box-sizing: border-box;
  border: 2px solid ${config.MainColor};
  font-size: 14px;
  outline: none;
  ${props => props.error && "color: rgb(210,210,210); border-color: rgba(255,10,10,.5); background: rgba(255,10,10,.1); &::placeholder { color: red}"};
  ${props => props.bottomless && "border-bottom: none"};

  @media ${device.laptopL} {
    padding: 8px;
    font-size: 14px;
  }
  @media ${device.laptop} {
    padding: 6px;
  }
  @media ${device.tablet} {
    margin: 0;
    display: block;
    width: 100%;
    margin-bottom: ${props => !props.bottomless && "10px"};
    padding: 5px;
  }
`;

export const Card = styled.div `
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 10px;
  border: 2px solid ${config.MainColor};
  @media ${device.laptopL} {
    padding: 8px;
  }
  @media ${device.laptop} {
    padding: 7px;
  }
  @media ${device.tablet} {
    padding: 5px;
  }
`;

export const Prices = styled.div `
  font-size: 16px;
  text-align: left;
  margin-top: 10px;
  width: 100%;
  color: ${props => props.color ? props.color : "black"};
  @media ${device.laptopL} {
    font-size: 14px;
  }
  @media ${device.laptop} {
    font-size: 12px;
  }
`;
