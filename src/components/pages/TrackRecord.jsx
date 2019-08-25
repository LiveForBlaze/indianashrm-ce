import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Truncate from 'react-truncate';

import DeferredImage from "../DeferredImage";
import { AtomTruncate } from "../Atoms";
import TextDialog from "../dialogs/TextDialog";
import { TrackRecordItem, RecrodDescripton } from "../../styles/styled-components/TrackPage";
import { Link } from "../../styles/styled-components/Dialogs";

import RecordDialog from "../dialogs/RecordDialog";

class TrackRecord extends Component  {
  state = {
    width: 0,
    turncateWidth: 0,
    isSeeMoreShown: false,
    isRecordShown: false,
    turncateFontSize: 0,
    turncateHeaderFontSize: 0,
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions, false);
  }

  updateDimensions = () => {
    const imageWidth = window.innerWidth > 1440 ? 330 : window.innerWidth > 1024 ? 280 : window.innerWidth > 768 ? 230 : window.innerWidth > 425 ? 180 : window.innerWidth > 360 ? 120 : 150,
          turncateFontSize = window.innerWidth > 1440 ? 18 : window.innerWidth > 1024 ? 14 : window.innerWidth > 768 ? 12 : window.innerWidth > 425 ? 8 : window.innerWidth > 360 ? 10 : 8,
          turncateHeaderFontSize = window.innerWidth > 1440 ? 24 : window.innerWidth > 1024 ? 19 : window.innerWidth > 768 ? 16 : window.innerWidth > 425 ? 12 : window.innerWidth > 360 ? 14 : 12;
    this.setState({
      turncateWidth: this.props.parentWidth - imageWidth,
      turncateFontSize,
      turncateHeaderFontSize
     });
  }

  handleOpenModal = (name, alias) => {
    this.props.modalOpen(name, alias);
  }

  handleOpenLink = (link) => {
    this.props.history.push(link);
  }

  handleShowMore = () => {
    this.setState({isSeeMoreShown: !this.state.isSeeMoreShown})
  }

  handleShowModal = (e) => {
    const name = e.target.dataset.name;
    this.setState({[name]: !this.state[name]});
  }

  render() {
    const { onClick, id, record } = this.props,
          { name, speakers, summary, ratio, price, previewUrl, alias, questionsCount, goals } = this.props.record,
          { turncateWidth, turncateFontSize, turncateHeaderFontSize, isSeeMoreShown } = this.state,
          speakersString = speakers.map((speaker) => speaker.firstName + speaker.lastName).join(", "),
          lines = ratio > 1.7 ? 3 : ratio < 1.4 ? 6 : 5,
          link = questionsCount > 0 ? `/quizzes/${record.id}` : null,
          cdnUrl = previewUrl.replace('https://slidespielweb.azurewebsites.net/', 'https://sspwebapi.azureedge.net/'),
          summaryWithGoals = (summary && `${summary}<br/>`) + (goals && `<b>Learning Goals & Objectives:</b><br/>${goals}`);
    return (
      <TrackRecordItem id={id} onClick={onClick}>
        <DeferredImage ratio={ratio} alias={alias} price={price} src={cdnUrl} alt={name} data-name="isRecordShown" onClick={link ? this.handleOpenLink.bind(this, link) : this.handleShowModal}/>
        <RecrodDescripton>
          <AtomTruncate className="header-new" header lines={1} fontSize={turncateHeaderFontSize} width={turncateWidth} isOverflowed={this.handleOverflow} text={name} />
          <AtomTruncate className="speakers" subHeader lines={1} fontSize={turncateFontSize} width={turncateWidth} isOverflowed={this.handleOverflow} text={speakersString} />
          <div style={{fontSize: turncateFontSize, lineHeight: `${turncateFontSize+2}px`}}>
            <Truncate lines={window.innerWidth > 1024 ? lines : lines-1} width={turncateWidth} ellipsis={<span>... <Link onClick={this.handleShowMore}>More...</Link></span>}>
              <div dangerouslySetInnerHTML={{__html: summary}} />
            </Truncate>
          </div>
        </RecrodDescripton>
        {
          isSeeMoreShown &&
            <TextDialog hide={this.handleShowMore} title={name}>
              <div className="subheader">{speakersString}</div><br/>
              <div dangerouslySetInnerHTML={{__html: summaryWithGoals}} />
            </TextDialog>
        }
        {this.state.isRecordShown && <RecordDialog dialogName="isRecordShown" hide={this.handleShowModal} name={this.props.name} video={{alias, ratio}} />}
      </TrackRecordItem>
    )
  }
}

export default withRouter(TrackRecord);
