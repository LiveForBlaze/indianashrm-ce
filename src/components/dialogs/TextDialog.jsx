import React, { PureComponent } from "react";
import { Button } from "../../styles/styled-components/Common";
import { ModalHeader, ModalText, ModalFooter } from "../../styles/styled-components/Dialogs";
import { AtomModal } from "../Atoms";

class TextDialog extends PureComponent {
  render() {
    return (
      <AtomModal hide={this.props.hide} video={true} width="50vw">
        <ModalText>
          <ModalHeader align="left" bottom="15px">{this.props.title}</ModalHeader>
          {this.props.children}
          <br/>
          <ModalFooter>
            <div className="centered">
              <div><Button small onClick={this.props.hide}>Close</Button></div>
            </div>
          </ModalFooter>
        </ModalText>
      </AtomModal>
    )
  }
}

export default TextDialog;
