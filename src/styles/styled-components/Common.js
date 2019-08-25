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

const defaultFontSize = 1.5;

export const Header = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 150px;
  margin: 0;
  .header-buttons {
    font-size: 0.8vw;
  }
`;

export const TruncateContainer = styled.div `
  display: flex;
  overflow: hidden;
  margin-bottom: ${props => props.width < 380 ? "1px" : "3px"};
  width: ${props => `${props.width}px`};
  font-size: ${props => `${props.fontSize}px`};
  line-height: ${props => `${props.fontSize+3}px`};
  height: ${props => `${(props.fontSize+3)*props.lines}px`};
`;

export const Truncate = styled.div `
  height: 100%;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
  text-align: justify;
  ${props => props.lines === 1 && "text-align: left; white-space: nowrap; border: none"};
  ${props => props.header && `color: ${config.MainColor}; font-weight: 600;`};
  ${props => props.subHeader && `color: ${config.SecondaryColor}; font-weight: 600;`};
`;

export const Loader = styled.div `
  animation: spin 2s linear infinite;
  border: 9px solid #f3f3f3;
  border-top: 9px solid ${config.MainColor};
  border-radius: 50%;
  display: inline-block;
  height: 60px;
  width: 60px;
`;

// ================================================
// <Button>  props:
// ================================================
// reversed(boolean) - reverse styles, normal/hover
// size(string)  - defines paddings and font size "s/m/l" - not available yet
// paddingY(number) - vertical padding
// paddingX(number) - horizontal padding
// color(string) - customize button's MainColor
// secondaryColor(sring) - customuze button's SecondaryColor
// border(string) - border width eg. "10px" or "2vw"
// radius(number) - border radius in pixels eg. "5"
// right(number) - margin-right in pixels eg. "10"
// bold(boolean) - font-weight: 600
// ================================================

export const Button = styled.button `
  outline: none;
  padding: ${props => props.paddingY ? `${props.paddingY}em` : `${config.ButtonPaddingY}em`} ${props => props.paddingX ? `${props.paddingX}em` : `${config.ButtonPaddingX}em`};
  margin-top: 10px;
  margin-right: ${props => props.right ? `${props.right}px` : "0px"};
  color: ${props => props.secondaryColor ? props.secondaryColor : config.ButtonSecondaryColor};
  background: ${props => props.color ? props.color : config.ButtonColor};
  border: ${props => props.border ? props.border : config.ButtonBorderWidth} solid  ${props => props.color ? props.color : config.ButtonColor};
  border-radius: ${props => props.radius ? `${props.radius}px` : config.ButtonBorderRadius};
  font-weight: ${props => props.bold ? 600 : 300};
  ${props => props.reversed && `
    color: ${props.color ? props.color : config.ButtonColor};
    background: ${props.secondaryColor ? props.secondaryColor : config.ButtonSecondaryColor};
  `};

  font-size: ${props => props.ButtonFontSize ? `${props.ButtonFontSize}em` : `${defaultFontSize}em`};
  line-height: ${props => props.ButtonFontSize ? `${props.ButtonFontSize}em` : `${defaultFontSize}em`};

  &:hover {
    cursor: pointer;
    color: ${props => props.color ? props.color : config.ButtonColor};
    background: ${props => props.secondaryColor ? props.secondaryColor : config.ButtonSecondaryColor};
    ${props => props.reversed && `
      color: ${props.secondaryColor ? props.secondaryColor : config.ButtonSecondaryColor};
      background: ${props.color ? props.color : config.ButtonColor};
    `};
  }

  @media ${device.laptopXL} {
    font-size: ${props => props.ButtonFontSize ? `${props.ButtonFontSize+0.2}em` : `${defaultFontSize+0.2}em`};
  }
  @media ${device.laptop} {
    font-size: ${props => props.ButtonFontSize ? `${props.ButtonFontSize+0.3}em` : `${defaultFontSize+0.3}em`};
  }
  @media ${device.mobileL} {
    font-size: ${props => props.ButtonFontSize ? `${props.ButtonFontSize+0.4}em` : `${defaultFontSize+0.3}em`};
  }


`;
