'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  YUN_SERVICE_URL: '"http://anno-service-test.online.qiyi.qae:8084/ws/v1/anno.json"',
  YUN_WEB_URL: '"localhost"'

})
