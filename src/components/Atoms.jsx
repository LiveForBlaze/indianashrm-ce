import React, { PureComponent } from "react";
import { Modal, ModalContent } from "../styles/styled-components/Dialogs";
import { Loader, Truncate, TruncateContainer } from "../styles/styled-components/Common";

export class Spinner extends PureComponent {
  render() {
    return (
      <AtomModal spinner={true}>
        <Loader />
      </AtomModal>
    )
  }
}

export class AtomModal extends PureComponent {

  state = { height: 0}

  dialogRef = React.createRef();

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  handleResize = () => {
    this.setState({height: this.dialogRef.current.offsetHeight})
  }

  handleHide = (e) => {
    if(e.target === e.currentTarget) {
      this.props.hide(e);
    }
  }

  render(){
    const { height } = this.state,
          { videoHeight, spinner, name } = this.props,
          actualHeight = videoHeight ? videoHeight : height,
          actualMargin = window.innerHeight > actualHeight ? (window.innerHeight - actualHeight)/2 : 0;
    return (
      <Modal data-name={name} onClick={this.handleHide}>
        <ModalContent width={this.props.width} isSpinner={spinner} hasVideo={this.props.video} ref={this.dialogRef} margin={actualMargin}>
          {this.props.children}
        </ModalContent>
      </Modal>
    )
  }
}

export class AtomTruncate extends PureComponent {
  render(){
    const { text } = this.props;
    return (
      <TruncateContainer {...this.props}>
        <Truncate {...this.props} {...this.state} dangerouslySetInnerHTML={{__html: text}} />
      </TruncateContainer>
    )
  }
}
