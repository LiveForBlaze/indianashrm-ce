import React, { Fragment, Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Spinner } from "./components/Atoms";
import { Provider } from "mobx-react";

import configureStore from "./store/appStore";

import HomePage from "./components/pages/HomePage";
import RestrictedAccessPage from "./components/pages/RestrictedAccessPage";
import TrackPage from "./components/pages/TrackPage";
import BuyLinks from "./components/pages/BuyLinks";

import API from "./api";
import config from "./config";

const store = configureStore();

store.setIsLoggingIn(true);

const choosePortalHOC = (WrappedComponent, name, isProtected=false) => {
  return class Container extends Component {
    state = {
      user: "",
      token: "",
      isLoggingIn: true,
      portalId: (name === "ishrm-2018" ? config.portalId2018 : config.portalId2019),
    }
    componentDidMount() {
      const logged = localStorage.getItem(`${name}-access_token`);
      document.title = `Get recordings of ${config.portalName} conference`;
      if(logged) {
        API.getUser("me", name).end((err, resp) => {
          this.setState({user: resp.body, token: logged, isLoggingIn: false});
          store.setUser(resp.body)
        });
      } else {
        this.setState({isLoggingIn: false})
      }
    }

    render() {
      if(this.state.isLoggingIn) {
        return <Spinner />
      } else {
        if(isProtected) {
          return this.state.user ? <WrappedComponent name={name} {...this.state} {...this.props} /> : <RestrictedAccessPage />
        } else {
          return <WrappedComponent name={name} {...this.state} {...this.props} />;
        }
      }
    }
  };
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route exact path="/2018/portal" component={choosePortalHOC(TrackPage, config.portalName2018, true)} />
            <Route exact path="/2018/post" component={choosePortalHOC(BuyLinks, config.portalName2018)} />
            <Route path="/2018" component={choosePortalHOC(HomePage, config.portalName2018)} />
            <Route exact path="/portal" component={choosePortalHOC(TrackPage, config.portalName2019, true)} />
            <Redirect exact path="/pre" to="/post" />
            <Redirect exact path="/onsite" to="/post" />
            <Route exact path="/post" component={choosePortalHOC(BuyLinks, config.portalName2019)} />
            <Route path="/" component={choosePortalHOC(HomePage, config.portalName2019)} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
