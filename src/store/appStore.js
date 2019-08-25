import { decorate, action, observable } from "mobx";

class AppStore {
  constructor() {
    this.currentUser = null;
    this.isLoggingIn = false;
    this.isLoggedIn = false;
  }

  setUser(userData) {
    this.currentUser = userData;
    this.isLoggingIn = false;
    this.isLoggedIn = true;
  }

  setIsLoggingIn(val) {
    this.isLoggingIn = !!val;
  }
};

decorate(AppStore, {
  currentUser: observable,
  isLoggingIn: observable,
  isLoggedIn: observable,
  setUser: action
});

const configureStore = () => new AppStore();

export default configureStore;
