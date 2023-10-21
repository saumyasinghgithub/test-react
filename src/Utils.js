import _ from "lodash";
import moment from "moment";

const Utils = {
  apiUrl: (path) => process.env.REACT_APP_API_URL + path,
  siteCookieName: `${process.env.REACT_APP_APPNAME}-userData`,

  getCookieOptions: () => {
    let co = { secure: false, path: "/" };
    if (process.env.REACT_APP_COOKIE_DOMAIN !== "localhost") {
      co["domain"] = process.env.REACT_APP_COOKIE_DOMAIN;
    }
    return co;
  },
  
};
export default Utils;
