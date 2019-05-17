const axios = require('axios');
const cryptoJS = require('crypto-js');
import AuthService from './AuthService.js'

export default {
  toDisplayDateString: function (time) {
    if (this.isNullOrUndefinedOrEmpty(time)) {
      return '';
    }
    let longTime;
    if (this.toType(time) === 'date') {
      longTime = time.getTime();
    } else if (this.toType(time) === 'number') {
      longTime = time;
    } else {
      return '';
    }
    let date = new Date(longTime + (8 * 60 * 60 * 1000)) // timezone +0800
    return date.toISOString().substr(0, 19).replace('T', ' ');
  },

  // ES会将 date() 类型转换为 string\UTC-0 点来表示
  parseEsJsonStringField: function (time) {
    if (this.isNullOrUndefinedOrEmpty(time)) {
      return time;
    }
    if (this.toType(time) === 'string') {
      let date = new Date(time);
      if (date.toString() !== "Invalid Date") {
        return this.toDisplayDateString(date);
      }
    }
    return time;
  },

  generateCookieMap() {
    let cookieMap = {};
    //取到的cookie可能存在空格
    document.cookie.split(';').map(cookie => {
      let temp = cookie.trim().split("=");
      cookieMap[temp[0]] = temp[1];
    });
    return cookieMap;
  },

  setUserInformation: function () {
    let cookieMap = this.generateCookieMap();

    if (cookieMap.hasOwnProperty("P000003")) {//爱奇艺云cookie，该cookie存的是token
      let token = cookieMap["P000003"];
      AuthService.iqiyiCloudAuthentication(token, "p", msg => {
        window.localStorage.setItem('userName', msg.name);
        window.localStorage.setItem('userId', msg.uid);
      });
    } else if (cookieMap.hasOwnProperty("C000001")) {//爱奇艺云cookie，该cookie存的是token
      let token = cookieMap["C000001"];
      AuthService.iqiyiCloudAuthentication(token, "c", msg => {
        window.localStorage.setItem('userName', msg.name);
        window.localStorage.setItem('userId', msg.uid);
      });
    } else if (cookieMap.hasOwnProperty("P00002")) {//openAPI的cookie，该cookie存的是用户信息
      let userInfo = JSON.parse(decodeURIComponent(cookieMap["P00002"]));
      let passport = decodeURIComponent(cookieMap["P00001"]);
      AuthService.authentication(passport, userInfo['uid'], userInfo['nickname'], msg => {
        if (msg['uid'] === userInfo['uid']) {
          window.localStorage.setItem('userName', msg.name);
          window.localStorage.setItem('userId', msg.uid);
        }
      });
    } else {
      window.localStorage.setItem('userName', "请登录");
      window.location = process.env.ANNO_WEB_URL + "/login";
    }
  },

  checkCookie: function () {
    //如果当前页面不是登录页面，就需要检查cookie
    if (window.location.href !== process.env.ANNO_WEB_URL + "/login") {
      if (this.isNullOrUndefinedOrEmpty(window.localStorage.getItem("userId")) || this.isNullOrUndefinedOrEmpty(window.localStorage.getItem("userName"))) {
        this.setUserInformation();
      }
    }
  },

  getWebToken: function () {
    let currentTimestamp = new Date().getTime();
    let key = cryptoJS.enc.Latin1.parse('aesEncryptionKey');
    let iv = cryptoJS.enc.Latin1.parse('encryptionIntVec');

    let token = 'anno-web' + currentTimestamp.toString();
    let encrypted = cryptoJS.AES.encrypt(token, key, {
      iv: iv,
      mode: cryptoJS.mode.CBC
    });
    return encrypted.toString();
  },

  gotoGroupDetailPage: function (groupId, router) {
    router.push({
      name: 'groupDetail',
      params: {
        id: groupId,
      }
    })
  },

  gotoProjectDetailPage: function (groupId, projectId, router) {
    router.push({
      name: 'projectDetail',
      params: {
        projectId: projectId,
        groupId: groupId
      }
    })
  },

  gotoNewJobPage: function (userId, jobType, config, router) {
    router.push({
      name: 'newJob',
      params: {
        userId: userId,
        jobType: jobType,
        config: config,
      }
    })
  },

  gotoJobDetailPage: function (jobId, router) {
    router.push({
      name: 'jobDetail',
      params: {
        jobId: jobId,
      }
    })
  },

  gotoAssignmentsPerDayStatisticsDetailPage: function (jobId, date, router) {
    router.push({
      name: 'assignmentsPerDayStatisticsDetail',
      params: {
        jobId,
        date
      }
    })
  },

  gotoJobAssignmentPage: function (job, type, isJobHitTypeSimple, router) {
    if (isJobHitTypeSimple) {
      this.gotoSearchAssignmentPage(job, type, router);
    } else {
      this.gotoSimpleAssignmentPage(job, type, router);
    }
  },

  gotoSimpleAssignmentPage: function (job, type, router) {
    router.push({
      name: 'SimpleAssignment',
      params: {
        jobId: job['_id'],
        job: job,
        type: type,
        isHistory: false
      }
    })
  },

  gotoSearchAssignmentPage: function (job, type, router) {
    router.push({
      name: 'SearchAssignment',
      params: {
        jobId: job['jobId'],
        job: job,
        type: type
      }
    })
  },

  gotoSimpleAssignAsHistoryPage: function(job, type, router, hits, hitIdAssignmentSetMap) {
    router.push({
      name: 'SimpleAssignment',
      params: {
        jobId: job['_id'],
        job: job,
        //标识标注历史还是质检历史
        type: type,
        isHistory: true,
        hits: hits,
        hitIdAssignmentSetMap: hitIdAssignmentSetMap
      }
    })
  },

  gotoJobAssignHistoryPage: function (job, assignType, isHitTypeSimple, router) {
    router.push({
      name: "AssignHistory",
      params: {
        job: job,
        jobId: job['_id'],
        type: assignType,
        isHitTypeSimple: isHitTypeSimple
      }
    });
  },

  gotoLoginPage: function (router) {
    router.push({
      name: 'login',
    });
  },

  generatePagePath: function (pageName, params) {
    let path;
    switch (pageName) {
      case 'GROUP_DETAIL':
        path = '/group/' + params.groupId;
        break;
      case 'TEAM_DETAIL':
        path = '/team/' + params.teamId;
        break;
      case 'PROJECT_DETAIL':
        path = '/group/' + params.groupId + '/project/' + params.projectId;
        break;
      case 'JOB_DETAIL':
        path = '/job/' + params.jobId;
        break;
    }
    return path;
  },

  toType: function (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  },

  errorMessage: function (_this, message) {
    _this.$Message.error({
      content: message,
      duration: 0,
      closable: true
    });
  },

  isNullOrUndefinedOrEmpty: function (arg, whitespaceAsEmpty) {
    if (arg === null || arg === undefined) {
      return true;
    }

    if (this.toType(arg) === 'object') {
      return JSON.stringify(arg) === "{}";
    } else if (this.toType(arg) === 'array') {
      return arg.length === 0;
    } else if (this.toType(arg) === "string") {
      if (whitespaceAsEmpty) {
        return arg.trim() === '';
      }
      return arg === '';
    }
  },

  isNullOrUndefined: function (arg) {
    if (arg === null || arg === undefined) {
      return true;
    }
    return false;
  },


  containsDuplicateElements: function (arr) {
    for (let j = 0; j < arr.length; j++) {
      arr[j] = ('' + arr[j]).trim();
    }
    let hash = {};
    for (let i in arr) {
      if (hash[arr[i]]) {
        return true;
      }
      hash[arr[i]] = true;
    }
    return false;
  },

  removeArrayElemByIndex: function (arr, index) {
    if (index === arr.length - 1) {
      arr.pop();
      return;
    }
    for (let i = index; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1];
    }
    arr.pop();
  },

  /***
   * 判断String数组中是否存在某个元素
   * @param arr
   * @param strElem
   * @returns {boolean}
   */
  hasStrElem: function (arr, strElem) {
    for (let elem of arr) {
      if (elem === strElem) {
        return true;
      }
    }
    return false;
  },
  /***
   * 往没有重复元素的数组中插入新元素
   * @param arr
   * @param strElem
   */
  addStrElem: function (arr, strElem) {
    if (!this.hasStrElem(arr, strElem)) {
      arr.push(strElem);
    }
  },
  /***
   * 从没有重复元素的字符串数组中删除某指定元素
   * 要求arr数组中元素必须是String，且元素不能重复
   * 不用Set因为new Set()出来的对象UI不能动态根据其中内容改变而刷新
   * @param arr
   * @param strElem
   */
  deleteStrElem: function (arr, strElem) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === strElem) {
        for (let j = i; j < arr.length; j++) {
          arr[j] = arr[j + 1];
        }
        arr.pop();
        break;
      }
    }
  },

  /***
   * 判断字符串数组中是否有某个字符串元素
   * @param arr
   * @param strElem
   */
  containStrElem: function (arr, strElem) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === strElem) {
        return true;
      }
    }
    return false;
  },

  checkJson: function (templateJson, testJson) {
    let illegal = [];
    for (let item in templateJson) {
      if ((typeof templateJson[item]) !== (typeof testJson[item])) {
        illegal.push(item);
        continue;
      }
      let type = this.toType(templateJson[item]);
      if (type === 'object') {
        let subIllegal = this.checkJson(templateJson[item], testJson[item]);
        for (let i = 0; i < subIllegal.length; i++) {
          subIllegal[i] = item + '.' + subIllegal[i];
        }
        illegal = illegal.concat(subIllegal);
      }
      if (type === 'array') {
        for (let testJsonArrayItem of testJson[item]) {
          if (this.toType(testJsonArrayItem) !== 'object') {
            illegal.push(item);
            break;
          }
          let count = 0;
          for (let templateJsonArrayItem of templateJson[item]) {
            if (this.checkJson(templateJsonArrayItem, testJsonArrayItem).length === 0) {
              break;
            }
            count++;
          }
          if (templateJson[item].length === count) {
            illegal.push(item);
          }
        }
      }
    }
    return illegal;
  },

  copyArray(arr1) {
    return JSON.parse(JSON.stringify(arr1));
  },

  arrayElementIsEqual: function (arr1, arr2) {
    let arrTmp1 = this.copyArray(arr1).sort();
    let arrTmp2 = this.copyArray(arr2).sort();
    return JSON.stringify(arrTmp1) === JSON.stringify(arrTmp2);
  },

  base64ToBlob: function (b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  },

  isHitTypeSimple: function (hit) {
    if (hit.workSet.length > 1) {
      return false;
    }
    let hitType = hit.workSet[0].type;
    if (hitType !== 'text') {
      return false;
    }
    return true;
  },

  linkify: function (text, urlRegex) {
    return text.replace(urlRegex, function (url) {
      return "点击查看".link(url);
    });
  }
}
