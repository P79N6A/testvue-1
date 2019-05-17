const axios = require('axios');
let url = process.env.YUN_SERVICE_URL.substring(0, process.env.YUN_SERVICE_URL.indexOf("/", 7));
const OPENAPIURL = url + "/authentication";
const IQIYICLOUDURL = url + "/cloudAuthentication";

export default {
  authentication(passport, uid, nickName, success, failure) {
    let params = new URLSearchParams();
    params.append('passport', passport);
    params.append('uid', uid);
    params.append('nickName', nickName);
    axios.post(OPENAPIURL, params)
      .then((res) => {
        if (success) {
          success(res.data);
        }
      })
      .catch((err) => {
        if (failure) {
          failure(err);
        } else {
          window.alert('服务异常: ' + err + '，请联系运维人员')
        }
      })
  },

  iqiyiCloudAuthentication(token, type, success, failure) {
    let params = new URLSearchParams();
    params.append('token', token);
    params.append('type', type);
    axios.post(IQIYICLOUDURL, params)
      .then((res) => {
        if (success) {
          success(res.data);
        }
      })
      .catch((err) => {
        if (failure) {
          failure(err);
        } else {
          window.alert('服务异常: ' + err + '，请联系运维人员')
        }
      })
  }
};
