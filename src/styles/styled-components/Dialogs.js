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

// ================================================
// <Button>  props:
// ================================================
// reversed(boolean) - reverse styles, normal/hover
// radius(number) - border radius in pixels eg. "5"
// right(number) - margin-right in pixels eg. "10"
// ================================================
export const Button = styled.button `
  padding: 5px 15px;
  outline: none;
  background: ${props => props.reversed ? config.ButtonSecondaryColor : config.ButtonColor};
  color: ${props => props.reversed ? config.ButtonColor : config.ButtonSecondaryColor};
  border: 3px solid ${config.ButtonColor};
  border-radius: ${props => props.radius ? `${props.radius}px` : "0px"};
  margin-right: ${props => props.right && `${props.right}px`};
  @media ${device.tablet} {
    padding: 5px 10px;
    font-size: 10px;
  }
  &:hover {
    background: ${props => props.reversed ? config.ButtonColor : config.ButtonSecondaryColor};
    color: ${props => props.reversed ? config.ButtonSecondaryColor : config.ButtonColor};
    border-color: ${config.ButtonColor};
    cursor: pointer;
  }
`;

export const Link = styled.span `
  color: ${config.MainColor};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Modal = styled.div `
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.7);
`;

export const Card = styled.div `
  margin-top: 10px;
  padding: 10px;
  border: 2px solid ${config.MainColor};
  @media ${device.laptopL} {
    padding: 8px;
    font-size: 14px;
  }
  @media ${device.laptop} {
    padding: 7px;
    font-size: 12px;
  }
  @media ${device.tablet} {
    padding: 5px;
    font-size: 10px;
  }
`;

export const ModalText = styled.div `
  padding: 30px;
  font-size: 16px;
  max-height: 100vh;
  .subheader {
    font-weight: 600;
    color: rgb(160,205,55);
  }
  @media ${device.tablet} {
    font-size: 14px;
  }
  @media ${device.mobileL} {
    font-size: 12px;
  }
`;

export const ModalTextButton = styled.div `
  text-align: center;
  font-size: 14px;
  @media ${device.laptop} {
    font-size: 12px;
  }
`;

export const ForgotPassword = styled.div `
  margin-bottom: 5px;
  > span {
    color: ${config.SecondaryColor};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
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

export const ModalContent = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${props => props.hasVideo ? 0 : "30px"};
  background: white;
  min-width: 400px;
  max-height: 100vh;
  overflow-y: auto;
  ${props => props.width && `max-width: ${props.width}` };
  margin-top: ${props => `${props.margin}px`};
  font-size: 1.8em;
  border: 2px solid ${config.MainColor};
  form {
    padding: 0;
    margin: 0;
    width: 100%;
  }
  @media ${device.laptopXL} {
    padding: ${props => props.hasVideo ? 0 : "1.1em"};
    font-size: 1.6em;
    ${props => props.width && `width: ${props.width}` };
  }
  @media ${device.laptopL} {
    padding: ${props => props.hasVideo ? 0 : "0.9em"};
    font-size: 1.4em;
    min-width: 350px;
    ${props => props.width && `width: ${props.width}` };
  }
  @media ${device.laptop} {
    padding: ${props => props.hasVideo ? 0 : "0.7em"};
    font-size: 1.2em;
  }
  @media ${device.tablet} {
    padding: ${props => props.hasVideo ? 0 : "0.6em"};
    min-width: 300px;
    ${props => props.width && "width: 90vw" };
  }
  @media ${device.mobileL} {
    min-width: 250px;
    ${props => props.width && "width: 95vw" };
  }
  ${props => props.isSpinner && "background: transparent; border: none"}
`;

export const ModalHeader = styled.div `
  width: 100%;
  font-size: 35px;
  text-align: ${props => props.align ? props.align : "center"};
  margin-bottom: ${props => props.bottom ? props.bottom : "20px"};
  color: ${props => props.color ? props.color : config.HomePageMainButtonColor};
  @media ${device.laptopXL} {
    font-size: 30px;
  }
  @media ${device.laptop} {
    font-size: 28px;
  }
  @media ${device.tablet} {
    font-size: 26px;
  }
  @media ${device.mobileL} {
    font-size: 20px;
  }
`;

export const Prices = styled.div `
  font-size: 16px;
  text-align: left;
  margin-top: 20px;
  width: 100%;
  color: ${props => props.color ? props.color : "black"};
  @media ${device.laptopL} {
    font-size: 14px;
  }
  @media ${device.laptop} {
    font-size: 12px;
  }
  @media ${device.tablet} {
    font-size: 10px;
  }
`;

export const ModalBody = styled.div `
  padding: 10px;
  font-size: 16px;
  width: 100%;
`;

export const ModalFooter = styled.div `
  display: flex;
  width: 100%;
  margin-top: 20px;
  padding: 0;
  align-items: center;
  font-size: 14px;
  @media ${device.tablet} {
    margin-top: 10px;
  }
  .centered {
    text-align: center;
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
  font-size: 16px;
  outline: none;
  ${props => props.bottomless && "border-bottom: none"};
  ${props => props.error && "color: rgb(210,210,210); border-color: rgba(255,10,10,.5); background: rgba(255,10,10,.1); &::placeholder { color: red; font-weight: 400}"};
  @media ${device.laptopL} {
    padding: 8px;
    font-size: 14px;
  }
  @media ${device.laptop} {
    padding: 6px;
    font-size: 12px;
  }
  @media ${device.tablet} {
    margin: 0;
    display: block;
    width: 100%;
    margin-bottom: ${props => !props.bottomless && "10px"};
    padding: 5px;
    font-size: 10px;
  }
`;
