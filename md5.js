const common = require('./libs/common');

var str = '123456';
var str1 = common.md5(123456+common.MD5_suffix)

console.log(str1)
