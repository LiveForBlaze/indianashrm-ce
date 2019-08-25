import React, { PureComponent } from "react";
import { AtomModal } from "../Atoms";

class RecordDialog extends PureComponent {

   state = { width: 0 }

   componentDidMount() {
     this.handleResize();
     window.addEventListener('resize', this.handleResize, false);
   }

   componentWillUnmount() {
     window.removeEventListener('resize', this.handleResize, false);
   }

   handleResize = () => {
     this.setState({width: window.innerWidth})
   }

   render() {
     const { hide, video, dialogName } = this.props,
           src = `https://penxy.com/widget/?e=${video.alias}`,
           widthRatio = this.state.width > 1024 ? 2 : this.state.width > 768 ? 1.5 : this.state.width > 425 ? 1.2 : 1,
           iFrameHeight = ((this.state.width / widthRatio) / video.ratio) < window.innerHeight ? ((this.state.width / widthRatio) / video.ratio) : window.innerHeight,
           iFrameWidth = iFrameHeight * video.ratio;
     return (
       <AtomModal name={dialogName} videoHeight={iFrameHeight} hide={hide} video={true}>
         <iframe frameBorder="0" width={iFrameWidth} height={iFrameHeight} src={src} title={`Preview recording ${src}`} allowFullScreen />
       </AtomModal>
     )
   }
}

export default RecordDialog;
