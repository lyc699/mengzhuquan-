'use strict'
const buildType = process.argv.pop()
const obj = {
  NODE_ENV: '"production"'
}
switch(buildType){
  case 'test' :// 测试
      obj.srconfig = '"test"'
      break;
  case 'prod' ://生产
      obj.srconfig = '"prod"'
      break;
  default :
      obj.srconfig = '""'
      break;
}

module.exports = obj