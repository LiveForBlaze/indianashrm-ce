import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { VideoPreview } from "../styles/styled-components/TrackPage";

class DeferredImage extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      src: "data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
      isDefaultSrc: true
    };
    this.handleDocReadyChange = this.handleDocReadyChange.bind(this);
  }

  componentDidMount() {
    if (this.state.isDefaultSrc) {
      this.handleDocReadyChange();
      document.addEventListener("readystatechange", this.handleDocReadyChange);
    }
  }

  componentWillUnmount() {
    if (this.state.isDefaultSrc) {
      document.removeEventListener("readystatechange", this.handleDocReadyChange);
    }
  }

  handleDocReadyChange() {
    if (document.readyState !== "complete")
      return;

    this.setState({src: this.props.src, isDefaultSrc: false});
    document.removeEventListener("readystatechange", this.handleDocReadyChange);
  }

  render() {
    const { src, alias, ...rest } = this.props;
    return (
      <VideoPreview background={src} {...rest} />
    );
  }
};

DeferredImage.propTypes = {
  src: PropTypes.string.isRequired
};

export default DeferredImage;
