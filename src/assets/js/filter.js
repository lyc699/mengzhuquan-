export default {// 过滤器代码
     /**
     * 将手机号中间4位数字替换为星号
     * @param {string} str - 待处理字符串
     * @returns {string} 已处理字符串
     */
    phoneToken(str) 
    {
        if(!str.match(/^\d+$/)) {
            return str
        }
        str = str.toString()
        return `${str.substr(0, 3)}****${str.substr(-4, 4)}`
    }
}