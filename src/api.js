import config from "./config";
const superagent = require('superagent');

const portalId = config["portalId2019"];

const Api = {

  getUser(userId = "me", portalName) {
    return this.req("get", `api/user/${userId}`, null, portalName);
  },

  login(username, password, id=portalId) {
    const data = {
      portalId: id,
      grant_type: "password",
      username,
      password
    }
    return this.req("post", "token", data)
  },

  logOut(portalName) {
    localStorage.removeItem(`${portalName}-access_token`);
  },

  register(email, password, firstName, lastName, fullName, token, amount=null, portalId, portalName) {
    return this.req("post", "api/user/register", {
      firstName,
      lastName,
      email,
      password,
      portalId,
      fullName,
      token,
      amount
    }, portalName)
  },

  resetPassword(email, portalId) {
    const data = {
      portalId,
      email,
    }
    return this.req("post", "api/user/resendaccess", data)
  },

  getTracks(id=portalId) {
    return this.req("get", `api/portal/${id}/preview`);
  },

  getTracksLogged(portalName) {
    return this.req("get", "api/portal/content", null, portalName);
  },

  getCertificates(portalName) {
    return this.req("get", "api/user/certificates", null, portalName);
  },

  getCertificate(recordingId) {
    return this.reqBin(`api/user/certificate/${recordingId}`);
  },



  reqBin(path, accesToken) {
    const url = `${config["apiHost"]}/${path}`,
          token = accesToken ? accesToken : localStorage.getItem(`${config.portalNameNew}-access_token`);
    return (
      superagent
        .get(url)
        .set({ "Authorization": `Bearer ${token}` })
        .responseType('blob')
    );
  },

  req(method, path, data, portalName=config.portalName2019) {
    const url = `${config["apiHost"]}/${path}`,
          token = localStorage.getItem(`${portalName}-access_token`);
    console.log(portalName)
    return (
      superagent(method, url)
        .send(data)
        .set({
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Accept": "*/*",
          "Authorization": `Bearer ${token}`
        })
    );
  }
};

export default Api;
