import styled from "styled-components";
import { lighten } from "polished";

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

export const SearchFadingBox = styled.div `
  opacity: ${props => props.isSearching ? "0.3" : "1"};
`;

export const Header = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 150px;
  margin: 0;
`;

export const Copyright = styled.div `
  width: 100%;
  text-align: left;
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

export const Input = styled.input `
  display: ${props => props.inline ? "inline-block" : "block"};
  width: ${props => props.inline ? "48%" : "100%"};
  padding: 10px;
  margin-right: ${props => props.margin && "4%"};
  box-sizing: border-box;
  border: 3px solid ${config.MainColor};
  font-size: 20px;
  color: ${config.MainColor};
  outline: none;
  background: ${props => props.search && `100% 0% url('data:image/svg+xml;charset=utf8,%3Csvg%20height%3D%2232px%22%20version%3D%221.1%22%20viewBox%3D%220%200%2032%2032%22%20width%3D%2232px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cg%20fill%3D%22${config.MainColor}%22%20id%3D%22icon-111-search%22%3E%3Cpath%20d%3D%22M19.4271164%2C21.4271164%20C18.0372495%2C22.4174803%2016.3366522%2C23%2014.5%2C23%20C9.80557939%2C23%206%2C19.1944206%206%2C14.5%20C6%2C9.80557939%209.80557939%2C6%2014.5%2C6%20C19.1944206%2C6%2023%2C9.80557939%2023%2C14.5%20C23%2C16.3366522%2022.4174803%2C18.0372495%2021.4271164%2C19.4271164%20L27.0119176%2C25.0119176%20C27.5621186%2C25.5621186%2027.5575313%2C26.4424687%2027.0117185%2C26.9882815%20L26.9882815%2C27.0117185%20C26.4438648%2C27.5561352%2025.5576204%2C27.5576204%2025.0119176%2C27.0119176%20L19.4271164%2C21.4271164%20L19.4271164%2C21.4271164%20Z%20M14.5%2C21%20C18.0898511%2C21%2021%2C18.0898511%2021%2C14.5%20C21%2C10.9101489%2018.0898511%2C8%2014.5%2C8%20C10.9101489%2C8%208%2C10.9101489%208%2C14.5%20C8%2C18.0898511%2010.9101489%2C21%2014.5%2C21%20L14.5%2C21%20Z%22%20id%3D%22search%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E') no-repeat;`}
  background-size: contain;
  ${props => props.bottomless && "border-bottom: none"};
  @media ${device.laptopL} {
    padding: 8px;
    font-size: 16px;
  }
  @media ${device.laptop} {
    padding: 6px;
    font-size: 14px;
  }
  @media ${device.tablet} {
    margin: 0;
    display: block;
    width: 100%;
    margin-bottom: ${props => !props.bottomless && "10px"};
    padding: 5px;
    font-size: font-size: 10px;;
  }
`;

export const TrackList = styled.div `
  display: flex;
  margin-top: 20px;
  width: 100%;
  min-width: 200px;
  margin: 0;
  padding: 0;
`;

export const TrackListBody = styled.div `
  margin-right: 50px;
  min-width: 200px;
  width: 90vw;
  @media ${device.laptop} {
    margin-right: 30px;
  }
`;

export const TrackListFilters = styled.div `
  display: inline-block;
  width: 15vw;
  > h1 {
    font-size: 30px;
    margin: 0;
    padding: 0;
    color: ${config.MainColor};
    @media ${device.laptopL} {
      font-size: 24px;
    }
  }
  > div {
    word-wrap: break-word;
    padding: 0;
    &:hover {
      cursor: pointer;
      color: rgba(0,0,0,.3);
    }
    @media ${device.laptopL} {
      font-size: 14px;
    }
    @media ${device.laptop} {
      font-size: 12px;
    }
  }
  @media ${device.tablet} {
    display: none;
  }
`;

export const SeeMore = styled.button `
  padding: 3px;
  background: ${props => props.reversed ? config.ButtonSecondaryColor : config.ButtonColor};
  color: ${props => props.reversed ? config.ButtonColor : config.ButtonSecondaryColor};
  border: 2px solid ${config.ButtonColor};
  margin-left: 10px;
  outline: none;
  font-size: 0.7em;
  line-height: 0.7em;
  &:hover {
    background: ${props => props.reversed ? config.ButtonColor : config.ButtonSecondaryColor};
    color: ${props => props.reversed ? config.ButtonSecondaryColor : config.ButtonColor};
    border-color: ${props => props.bg ? "white" : config.ButtonColor};
    cursor: pointer;
  }
  @media ${device.mobileL} {
    margin-left: 0px;
    padding: 2px;
    line-height: 0.6em;
    font-size: 0.6em;
  }
`;

export const MobileButton = styled.div `
  display: none;
  width: 30px;
  margin-top: 10px;
  height: 24px;
  background: 50% 0% url('data:image/svg+xml;charset=utf8,%3Csvg%20version%3D%221.1%22%20viewBox%3D%220%200%2032%2032%22%20height%3D%2232px%22%20width%3D%2232px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cg%20fill%3D%22${config.MainColor}%22%3E%3Cpath%20d%3D%22M24%2C3c0-0.6-0.4-1-1-1H1C0.4%2C2%2C0%2C2.4%2C0%2C3v2c0%2C0.6%2C0.4%2C1%2C1%2C1h22c0.6%2C0%2C1-0.4%2C1-1V3z%22%2F%3E%3Cpath%20d%3D%22M24%2C11c0-0.6-0.4-1-1-1H1c-0.6%2C0-1%2C0.4-1%2C1v2c0%2C0.6%2C0.4%2C1%2C1%2C1h22c0.6%2C0%2C1-0.4%2C1-1V11z%22%2F%3E%3Cpath%20d%3D%22M24%2C19c0-0.6-0.4-1-1-1H1c-0.6%2C0-1%2C0.4-1%2C1v2c0%2C0.6%2C0.4%2C1%2C1%2C1h22c0.6%2C0%2C1-0.4%2C1-1V19z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E') no-repeat;
  background-size: cover;
  &:hover {
    cursor: pointer;
  }
  @media ${device.tablet} {
    display: inline-block;
  }
`;

export const ButtonGroup = styled.div`
  display: inline-box;
  @media ${device.tablet} {
    display: none;
  }
`;

export const TrackListFiltersMobile = styled.div `
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%
  border: 1px solid transparent;
  box-sizing: border-box;
  background: rgba(255,255,255,.95);
  min-width: 250px;
  > h1 {
    display: block;
    padding: 5px 20px;
    font-size: 30px;
    color: ${config.MainColor};
  }
  > div {
    word-wrap: break-word;
    padding: 10px 20px;
    &:hover {
      cursor: pointer;
      background: rgba(0,0,0,.1);
    }
    &:nth-child(1) {
      cursor: default;
      font-size: 2vw;
      background: rgb(210,210,210);
      text-align: center;
    }
  }
  @media ${device.tablet} {
    display: inline-block;
  }
  @media ${device.mobileM} {
    font-size: 12px;
    > h1 {
      font-size: 30px;
    }
  }
  @media ${device.mobileS} {
    font-size: 12px;
    > h1 {
      font-size: 20px;
    }
  }
`;

export const TracksContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${props => props.column && "flex-direction: column"}
  padding-top: 10px;
  width: 100%;
  min-width: 240px;
`;

export const TrackItemContainer = styled.div `
  width: ${props => `${(props.parentWidth - 50)/5}px`};
  font-weight: 600;
  color: ${config.MainColor};
  text-align: left;
  min-width: 40px;
  flex-wrap: wrap;
  > div {
    padding: 10px 20px;
    background: rgba(0,0,0,.06);
    margin-bottom: 10px;
  }
  > div:hover {
    background: rgba(160,205,55,.5);
  }
  @media ${device.laptopL} {
    font-size: 13px;
    line-height: 14px;
  }
  @media ${device.laptop} {
    font-size: 11px;
    line-height: 12px;
  }
  @media ${device.tablet} {
    width: ${props => `${(props.parentWidth - 30)/3}px`};
    &:nth-child(10) {
      margin-right: 0;
    }
  }
  @media ${device.mobileL} {
    width: ${props => `${(props.parentWidth - 20)/3}px`};
    font-size: 9px;
  }
  @media ${device.mobileM} {
    font-size: 8px;
  }
  @media ${device.mobileS} {
    font-size: 6px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const TrackItem = styled.div `
  width: 100%;
  height: ${props => `${(props.parentWidth - 50)/5}px`};
  background-image: url(${props => props.image});
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 10px;
  padding: 30px;
  box-sizing: border-box;
  outline: 2px solid transparent;
  border: 3px solid ${config.MainColor};
  @media ${device.laptopL} {
    margin-bottom: 5px;
  }
  @media ${device.laptop} {
    margin-bottom: 2px;
  }
  @media ${device.tablet} {
    height: ${props => `${(props.parentWidth - 50)/3}px`};
  }
  &:hover {
    cursor: pointer;
    outline: 2px solid ${config.MainColor};
    border: 3px solid ${config.MainColor};
  }
`;

export const TrackRecordItem = styled.div `
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding: 0;
  word-wrap: break-word;
  background: rgba(0,0,0,0.06);
`;

export const RecrodDescripton = styled.div `
  padding: 10px;
  font-size: 18px;
  line-height: 28px;
  > .header-new {
    font-weight: 600;
    color: ${config.MainColor};
  }
  > .speakers {
    color: ${config.TrackSpeakersColor};
  }
  > div: {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0,0,0,.6);
  }
  > div:nth-child(3) {
    color: rgb(0,0,0);
  }
  @media ${device.laptopL} {
    font-size: 16px;
    line-height: 22px;
  }
  @media ${device.laptop} {
    font-size: 14px;
    line-height: 18px;
  }
  @media ${device.tablet} {
    line-height: 11px;
    font-size: 10px;
    > div {
      font-size: 10px;
      margin-bottom: 4px;
    }
  }
  @media ${device.mobileL} {
    font-size: 8px;
    padding: 5px;
    line-height: 8px;
    > div {
      font-size: 8px;
      margin-bottom: 0px;
    }
  }
`;

export const TrackHeading = styled.div `
  font-size: 20px;
  font-weight: 600;
  color: ${config.MainColor};
  margin-bottom: 5px;
`;

export const VideoPreview = styled.div `
  color: white;
  width: 300px;
  height: ${props => `${300/props.ratio}px`};
  background-image: ${props => `url(${props.background})`};
  background-position: 0% 0%;
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  border: 3px solid ${config.MainColor};
  &:hover {
    cursor: pointer;
    border: 3px solid ${lighten('0.3', `${config.MainColor}`)};
  }
  @media ${device.laptopL} {
    width: 250px;
    height: ${props => `${250/props.ratio}px`};
  }
  @media ${device.laptop} {
    width: 200px;
    height: ${props => `${200/props.ratio}px`};
  }
  @media ${device.tablet} {
    width: 150px;
    height: ${props => `${150/props.ratio}px`};
  }
  @media ${device.mobileL} {
    width: 100px;
    height: ${props => `${100/props.ratio}px`};
  }
`;

export const ErrorMessage = styled.div `
  width: 95%;
  padding: 20px;
  border: 1px solid rgba(255,10,10,.7);
  color: rgba(255,10,10,.7);
  background: rgba(255,10,10,.2);
  font-size: 14px;
  box-sizing: border-box;
  margin: auto;
  margin-bottom: 20px;
  text-align: center;
  @media ${device.laptop} {
    font-size: 12px;
  }
`;
