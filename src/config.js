const config = {
  "apiHost": "",
  "portalPrice": 199,
  "stripeKey": "",
  "env": "development",
  "portalName": "INDIANA SHRM",
  "portalId2018": "",
  "portalName2018": "ishrm-2018",
  "portalId2019": "",
  "portalName2019": "ishrm-2019",
};

if (process.env.NODE_ENV === "production") {
  Object.assign(config, {
    "apiHost": "",
    "stripeKey": "",
    "env": "production"
  });
}


export default config;
