import React, { Component } from "react";
import { TrackItemContainer } from "../../styles/styled-components/TrackPage";

class Track extends Component {
  render() {
    const { index, item, click } = this.props;
    return (
      <TrackItemContainer>
        <div onClick={click} id={index+1} name={item.title}>{item.title}</div>
      </TrackItemContainer>
    )
  }
}

export default Track;
