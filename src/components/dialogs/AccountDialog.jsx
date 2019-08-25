import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { inject } from "mobx-react";

import { AtomModal } from "../Atoms";
import { ModalHeader, ModalBody, ModalFooter } from "../../styles/styled-components/Dialogs";
import { Button } from "../../styles/styled-components/Dialogs";
import api from "./../../api";
import config from "./../../UIconfig";

class AccountDialog extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = { isFullyLoaded: false }
    this.child = React.createRef();
    this.state = { certificates: null };
  }

  componentDidMount() {
    api.getCertificates(this.props.name).then((data) => {
      this.setState({certificates: data.body, isFullyLoaded: true}, () => this.child.current.handleResize());
    });
  }

  handleGetCertificateClick = (e) => {
    const recordingId = e.target.getAttribute("data-record-id"),
          name = e.target.textContent;

    api.getCertificate(recordingId).then((blob) => {
      const url = URL.createObjectURL(blob.body),
            linkEl = document.createElement("a");

      linkEl.href = url;
      linkEl.download = name;
      linkEl.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100, url);
    });
  }

  render() {
    const { dialogName, hide, user, name } = this.props;
    return (
      <AtomModal ref={this.child} name={dialogName} hide={hide}>
        <ModalHeader>Account</ModalHeader>
          <ModalBody>
            <div>
              <div className="form-group">
                <div className="form-control form_bordered form_bordered_bottomless">
                  {user.firstName} {user.lastName}
                </div>
                <div className="form-control form_bordered">{user.email}</div>
              </div>
            </div>
            { config[name].hasCME &&
              <div>
                Your CME certificates:<br />
                {
                  this.state.certificates === null ?
                    "Loading..." :
                    this.state.certificates.length === 0 ?
                      "No certificates yet." :
                      this.state.certificates.map((certificate) => (
                        <div key={certificate.recordId} className="modal-certificates">
                          <a onClick={this.handleGetCertificateClick} href={`#certificate-${certificate.recordId}`} data-record-id={certificate.recordId}>
                            {certificate.name}
                          </a>
                        </div>
                      ))
                }
              </div>
            }
            <ModalFooter>
                <div>Support: <a href="mailto:info@penxy.com">info@penxy.com</a></div>
                <div><Button type="button" small data-name={dialogName} onClick={hide}>Go Back</Button></div>
              </ModalFooter>
            </ModalBody>
      </AtomModal>
    );
  }
};

AccountDialog.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isLoggingIn: PropTypes.bool,
};

export default withRouter(inject(({store}, props) => ({
  isLoggingIn: store.isLoggingIn
}))(AccountDialog));
