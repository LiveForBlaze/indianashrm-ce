import React, { Component, Fragment } from "react";
import { inject } from "mobx-react";
import _ from 'lodash';

import { withRouter } from "react-router-dom";
import { ButtonGroup, Copyright, Input, TrackList, TrackListBody, TrackListFilters, TrackListFiltersMobile, MobileButton, TracksContainer, TrackHeading, SearchFadingBox } from "../../styles/styled-components/TrackPage";
import { Button, Header } from "../../styles/styled-components/Common";

import Logo2018 from "../../assets/images/ishrm_logo.png";
import Logo2019 from "../../assets/images/logo.png";

import Track from "./Track";
import TrackRecord from "./TrackRecord";
import AccountDialog from "../dialogs/AccountDialog";

import API from "../../api";
import config from "../../config";

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isMobileButtonClicked: false,
      isAccountShown: false,
      isSearching: false,
      cmeTotal: 0,
      nonCmeTotal: 0,
      tracks: [],
      filteredTracks: [],
      filter: 0,
      typeFilter: 0,
      width: 0,
      data: {},
      search: "",
    }
    this.tracksContainerRef = React.createRef();
    this.handleSearch = _.debounce(this.handleSearch, 1000);
  }

  handleResize = () => {
    this.setState({width: this.tracksContainerRef.current.offsetWidth})
  }

  componentDidMount() {
    const validHash = !this.props.location.hash ? 0 : this.props.location.hash.slice(1) < 7 ? this.props.location.hash.slice(1) : 0;
    this.handleGetData(validHash);
    this.handleResize();
    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  handleGetData = (validHash=null) => {
    API.getTracksLogged(this.props.name).then(resp => {
      this.setState({
        tracks: [...resp.body],
        filteredTracks: [...resp.body],
        tracksSearchMatch: new Array(resp.body.length+1).join('0').split('').map(parseFloat)
      }, () => {this.handleFilterTracks(null, validHash)}
    )});
  }

  handleFilterTracks = (e, hash=null) => {
    const filter = hash ? hash : e ? +e.target.id : 0;
    this.setState({filter, isMobileButtonClicked: false});
  }

  handleFilterTracksType = (typeFilter) => {
    this.setState({typeFilter, isMobileButtonClicked: false})
  }


  handleTrackClick = (e) => {
    if(this.state.filter !== +e.target.id) {
      this.setState({filter: +e.target.id});
    } else {
      this.setState({filter: 0});
    }
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value.toLowerCase(),
      isSearching: e.target.value.length > 1,
    }, this.handleSearch());
  }

  handleSearch = () => {
    const { search, tracks } = this.state,
          tracksSearchMatch = new Array(tracks.length).join('0').split('').map(parseFloat);
    let cmeTotal = 0, nonCmeTotal = 0;

    if(search.length < 2) return this.setState({tracksSearchMatch, cmeTotal, nonCmeTotal });
    this.state.filteredTracks.forEach((track, trackIndex) => {
      let recordsSearchMatch = track.recordings ? new Array(track.recordings.length).join('0').split('').map(parseFloat) : [];
      track.recordings && track.recordings.forEach((rec, recIndex) => {
        const speakerList = rec.speakers.map((speaker) => `${speaker.firstName} ${speaker.lastName}`).join(" ").toLowerCase().indexOf(search) !== -1,
              description = rec.summary.toLowerCase().indexOf(search) !== -1,
              title = rec.name.toLowerCase().indexOf(search) !== -1;
        if(speakerList || title || description) {
          tracksSearchMatch[trackIndex] = 1;
          recordsSearchMatch[recIndex] = 1;
          rec.ceHours ? ++cmeTotal : ++nonCmeTotal;
        };
      });
      this.setState({[track.title]: [...recordsSearchMatch]});
    });
    this.setState({tracksSearchMatch, isSearching: false, cmeTotal, nonCmeTotal})
  }

  handleLogOut = () => {
    API.logOut(this.props.name);
    this.props.history.push(this.props.name === "ishrm-2018" ? "/2018" : "/");
  }

  handleShowModal = (e) => {
    const name = e.target.dataset.name;
    this.setState({[name]: !this.state[name]});
  }

  buttonGroup = () => {
    return (
      <div className="header-buttons">
        <Button reversed data-name="isAccountShown" onClick={this.handleShowModal} right={20}>Account</Button>
        <Button reversed onClick={this.handleLogOut}>Log Out</Button>
      </div>
    )
  }

  notFoundMessage = (data) => {
    const { search, isSearching, filter, typeFilter, cmeTotal, nonCmeTotal } = this.state,
          searchDone = search.length > 1 && !isSearching;
    let result = false,
        text = "";
    if(data) {
      if(data.index === filter-1) {
        if(typeFilter === 1) {
          result = config.CMEfilter && !data.withCME;
          text = "CME ";
        } else if(typeFilter === 2) {
          result = config.CMEfilter && !data.nonCME;
          text = "non-CME ";
        } else {
          result = !(data.nonCME + data.withCME);
        }
      }
    } else {
      if(typeFilter === 1) {
        result = !filter && !cmeTotal;
        text = "CME ";
      } else if(typeFilter === 2) {
        result = !filter && !nonCmeTotal;
        text = "non-CME ";
      } else {
        result = !filter && !cmeTotal && !nonCmeTotal;
      }
    }
    if(searchDone && result) {
      return <div>Sorry, we couldn't find any {text}records mathcing "<b>{search}</b>".</div>
    }
  }

  render() {
  const { search, isSearching, filteredTracks, tracksSearchMatch, filter, typeFilter, tracks, width, isMobileButtonClicked } = this.state,
        logged = this.props.user,
        isOldPortal = this.props.name === "ishrm-2018";
  return (
    <div className="home-page-new">
      <div className="containerBlock">
        <Header>
          <div className="home-page-header-new full-width">
            <div className="home-page-header-logo-new">
              <img src={isOldPortal ? Logo2018 : Logo2019} className="home-page-header-logo__image-new" alt="Logo" />
            </div>
            <ButtonGroup>{this.buttonGroup()}</ButtonGroup>
          </div>
        </Header>
        <TrackList>
          <TrackListBody>
            <Input search placeholder="What do you want to learn?" value={search} onChange={this.handleChange} />
            <TracksContainer column ref={this.tracksContainerRef}>
              {
                filteredTracks.map((item, index) => {
                  const tracksHide = filter || (search.length > 1 );
                  return !tracksHide && <Track key={index} item={item} index={index} width={width} click={this.handleTrackClick}/>

                })
              }
              { this.notFoundMessage() }
            </TracksContainer>
            <SearchFadingBox isSearching={isSearching}>
              {
                filteredTracks.map((item, index) => {
                  const check = index === filter-1 || (search.length > 1 && tracksSearchMatch[index] === 1 && !filter);
                  let nonCME = 0, withCME = 0;
                  return (
                    <Fragment key={index}>
                      {index === filter-1 && <TrackHeading>{item.title}</TrackHeading>}
                      {
                        !!check && item.recordings && item.recordings.map((record, recordIndex) => {
                          const scheck = search.length < 2 || !this.state[item.title] || this.state[item.title][recordIndex],
                                typeCheck = !typeFilter || (typeFilter === 1 && record.ceHours) || (typeFilter === 2 && !record.ceHours);
                          !!scheck && (record.ceHours ? ++withCME  : ++nonCME);
                          return (
                            !!scheck && typeCheck && <TrackRecord key={recordIndex} logged={logged} parentWidth={width} record={record} modalOpen={this.handleShowModal} />
                          )
                        })
                      }
                      { this.notFoundMessage({ index, nonCME, withCME }) }
                    </Fragment>
                  )}
                )
              }
            </SearchFadingBox>
          </TrackListBody>
          <div>
          <TrackListFilters>
            <h1>Topics:</h1>
            <div id={0} onClick={this.handleFilterTracks} className={!filter ? "bold" : ""} >
              All tracks
            </div>
            {
              tracks.map((item, index) => {
                return (
                  <div key={index}>
                    <div id={index+1} onClick={this.handleFilterTracks} className={index === filter -1 ? "bold" : ""}>
                      {item.title}
                    </div>
                  </div>
                )}
              )
            }
          </TrackListFilters>
          <br/><br/>
          {
            config.CMEfilter &&
            <TrackListFilters>
              <h1>Types:</h1>
              <div onClick={this.handleFilterTracksType.bind(this, 0)} className={!typeFilter ? "bold" : ""} >
                All types
              </div>
              <div onClick={this.handleFilterTracksType.bind(this, 1)} className={typeFilter === 1 ? "bold" : ""} >
                CME-Only
              </div>
              <div onClick={this.handleFilterTracksType.bind(this, 2)} className={typeFilter === 2 ? "bold" : ""} >
                Non-CME
              </div>
            </TrackListFilters>
          }
          </div>
          <MobileButton data-name="isMobileButtonClicked" onClick={this.handleShowModal}/>
          {
            isMobileButtonClicked &&
              <TrackListFiltersMobile>
                {this.buttonGroup()}
                <h1>Choose Topic</h1>
                <div id={0} onClick={this.handleFilterTracks} className={!filter ? "bold" : ""} >
                  All tracks
                </div>
                {
                  tracks.map((item, index) => {
                    return (
                      <div key={index}>
                        <div id={index+1} onClick={this.handleFilterTracks} className={index === filter -1 ? "bold" : ""}>
                          {item.title}
                        </div>
                      </div>
                    )}
                  )
                }
                {
                  config.CMEfilter &&
                  <Fragment>
                    <h1>Choose Type</h1>
                    <div onClick={this.handleFilterTracksType.bind(this, 0)} className={!typeFilter ? "bold" : ""} >
                      All types
                    </div>
                    <div onClick={this.handleFilterTracksType.bind(this, 1)} className={typeFilter === 1 ? "bold" : ""} >
                      CME-Only
                    </div>
                    <div onClick={this.handleFilterTracksType.bind(this, 2)} className={typeFilter === 2 ? "bold" : ""} >
                      Non-CME
                    </div>
                  </Fragment>
                }
              </TrackListFiltersMobile>
          }
        </TrackList>
        {this.state.isAccountShown && <AccountDialog dialogName="isAccountShown" hide={this.handleShowModal} name={this.props.name} user={this.props.user} />}
        <Copyright>2019 © Powered by SlideSpiel.com</Copyright>
      </div>
    </div>
  );
}
};

export default withRouter(inject("store")(HomePage));
