import axios from 'axios'
import { Message } from 'iview'
axios.defaults.timeout = 1000000; //响应时间
axios.defaults.headers['Content-Type'] = 'application/json' //通信格式
// axios.defaults.baseURL = 'http://127.0.0.1:7001' //配置接口地址
axios.defaults.baseURL = 'https://api.imap.trevor.top' //配置接口地址
// axios.defaults.baseURL = 'https://imap.leanapp.cn' //配置接口地址

export default {
  // POST 请求
  post({...obj}) {
    return new Promise((resolve,reject) => {
      axios.post(obj.url, obj.data, {
        headers: {
          'Accept-Language': window.$lang
        }
      }).then(data => {
        Message.success(data.data.data.msg)
        resolve(data.data)
      }).catch(error => {
        Message.error(error.response.data.msg)
        reject(error)
      })
    })
  },
  // GET 请求
  get({...obj}) {
    return new Promise((resolve,reject) => {
      axios.get(obj.url, { params: obj.data }, {
        headers: {
          'Accept-Language': window.$lang
        }
      }).then(data => {
        Message.success(data.data.data.msg)
        resolve(data.data)
      }).catch(error => {
        Message.error(error.response.data.msg)
        reject(error)
      })
    })
  }
}
