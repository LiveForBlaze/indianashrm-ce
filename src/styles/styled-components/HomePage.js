import styled from "styled-components";
import background from '../../assets/images/background.jpg';
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

export const Main = styled.div `
  display: flex;
  flex-direction: column;
  min-height: ${props => props.height ? props.height : config.HomePageMainHeight};
  height: ${props => props.height ? props.height : config.HomePageMainHeight};
  background-color: ${props => props.color ? props.color : config.MainColor};
  background-image: ${props => props.background ? `url(${background})` : "none"};
  background-position: ${props => props.position ? props.position : config.HomePageMainImagePosition};
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
  padding: 0px;
  min-width: 250px;
  .main-button {
    font-size: 0.8vw;
    text-align: center;
  }
  @media ${device.mobileL} {
    min-height: 50vw;
  }
`;

export const MainContent = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.backgroundColor ? props.backgroundColor : config.HomePageMainContentBackground};
  color: white;
  width: 50vw;
  padding: 20px;
  @media ${device.laptop} {
    padding: 10px;

  @media ${device.tablet} {
    width: 100%;
  }
  > div {
    width: 100%;
    font-size: 3em;
    text-align: center;
    @media ${device.laptopXL} {
      font-size: 2.2em;
    }
    @media ${device.laptopL} {
      font-size: 1.6em;
    }
    @media ${device.laptop} {
      font-size: 1.3em;
    }
    @media ${device.tablet} {
      font-size: 1em;
    }
  }
`;

export const MainList = styled.ul `
  margin: 0;
  padding: 0;
  font-size: 2em;
  @media ${device.desktop} {
    font-size: 2em;
  }
  @media ${device.laptopXL} {
    font-size: 1.4em;
  }
  @media ${device.laptopL} {
    font-size: 1em;
  }
  @media ${device.laptop} {
    font-size: 0.8em;
    line-height: 1.4em;
  }
  @media ${device.tablet} {
    font-size: 0.55em;
    line-height: 1em;
    > li {
      padding-bottom: 5px;
    }
  }
  @media ${device.mobileL} {
    font-size: 0.4em;
  }
`;

export const Bottom = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
  min-width: 250px;
  background: ${props => props.background ? props.background : config.HomePageBottomBackgroundColor};
  color: ${props => props.color ? props.color : config.HomePageBottomTextColor};
  @media ${device.laptopL} {
    padding: 40px;
  }
  @media ${device.laptop} {
    padding: 30px;
  }
  @media ${device.tablet} {
    padding: 20px;
  }
  @media ${device.mobileL} {
    padding: 10px;
  }
  > div {
    min-width: 250px;
    text-align: center;
    font-size: 1.5em;
    @media ${device.laptopXL} {
      font-size: 1.1em;
    }
    @media ${device.laptopL} {
      font-size: 0.7em;
    }
    @media ${device.laptop} {
      font-size: 0.6em;
    }
    @media ${device.tablet} {
      font-size: 0.5em;
    }
  }
`;

//Button props: reversed, margin="20px", padding="20px 20px", radius="20px"
export const Button = styled.button `
  padding:  ${props => props.big ? config.HomePageMainBigButtonPadding : config.HomePageMainButtonPadding};
  margin-left: ${props => props.margin ? props.margin : "20px"};
  background: ${props => props.reversed ? config.HomePageMainButtonSecondatyColor : config.HomePageMainButtonColor};
  color: ${props => props.reversed ? config.HomePageMainButtonColor : config.HomePageMainButtonSecondatyColor};
  border: 2px solid ${config.HomePageMainButtonColor};
  border-radius: ${props => props.radius ? props.radius : "0px"};
  font-size: ${props => props.small ? "1.2em" : `${config.HomePageMainButtonFontSize}px`};
  font-weight: ${props => props.bold ? 600 : 300};
  &:hover {
    background: ${props => props.reversed ? config.HomePageMainButtonColor : config.HomePageMainButtonSecondatyColor};
    color: ${props => props.reversed ? config.HomePageMainButtonSecondatyColor : config.HomePageMainButtonColor};
    border-color: ${props => props.bg ? "white" : config.HomePageMainButtonColor};
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
    margin-left: 10px;
    &:nth-child(1) {
      margin-left: 0;
    }
  }
  @media ${device.mobileS} {
    font-size: ${props => props.small ? "0.4em" : `${config.HomePageMainButtonFontSize-10}px`};
    margin-left: 5px;
  }
`;

export const Copyright = styled.div `
  width: 100%;
  text-align: right;
  padding-top: 10px;
  box-sizing: border-box;
  font-size: 1em;
  padding-right: 30px;
  @media ${device.laptopL} {
    font-size: 0.6em;
  }
  @media ${device.laptop} {
    font-size: 0.5em;
  }
  @media ${device.tablet} {
    font-size: 0.4em;
    padding-right: 20px;
  }
  @media ${device.mobileL} {
    font-size: 0.4em;
    padding-right: 5px;
  }
  @media ${device.mobileS} {
    font-size: 0.3em;
    padding-right: 0px;
  }
`;

export const LandingBlock = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  font-size: 3em;
  text-align: center;
  font-weight: 600;
  padding: 10px;
  padding-top: 40px;
  @media ${device.laptopXL} {
    font-size: 2em;
  }
  @media ${device.laptopL} {
    font-size: 1.8em;
  }
  @media ${device.laptop} {
    font-size: 1.4em;
    padding-top: 50px;
  }
  @media ${device.tablet} {
    font-size: 1.2em;
    padding-top: 30px;
  }
  @media ${device.mobileL} {
    font-size: 1em;
    padding-top: 20px;
  }
`;

export const LandingBlockContent = styled.div `
  font-size: 0.5em;
  padding-top: 30px;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${props => props.smallLine ? "0.4em" : "0.6em"};
  line-height: ${props => props.smallLine ? "1em" : "1.5em"};
  text-align: ${props => props.left && "left"};
  > p {
    padding-bottom: 1em;
  }
  > p > div {
    line-height: ${props => props.smallLine ? "1.5em" : "1.5em"};
  }
  > p > span {
    display: block;
    font-weight: 600;
    font-size: 1.4em;
  }
`;

export const LandingTrack = styled.div `
  display: flex;
  text-align: left;
  padding-bottom: 30px;
  > div:nth-child(2) {
    font-size: 1em;
  }
`;
