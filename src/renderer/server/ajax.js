import axios from 'axios'
import storage from 'store'
import { Message, Spin } from 'iview'
axios.defaults.timeout = 1000000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json' //通信格式
axios.defaults.baseURL = 'http://127.0.0.1:7001' //配置接口地址
// axios.defaults.baseURL = 'https://api.imap.trevor.top' //配置接口地址
// axios.defaults.baseURL = 'https://imap.leanapp.cn' //配置接口地址

export default {
  // POST 请求
  post({...obj}) {
    return new Promise((resolve,reject) => {
      axios({
        method: 'post',
        url: obj.url,
        data: obj.data,
        headers: {
          'Accept-Language': storage.get('LANG') || 'zh-CN'
        }
      }).then(data => {
        Message.success(data.data.msg)
        Spin.hide()
        resolve(data.data)
      }).catch(error => {
        Message.error(error.response.data.msg)
        Spin.hide()
        reject(error)
      })
    })
  },
  // GET 请求
  get({...obj}) {
    return new Promise((resolve,reject) => {
      axios({
        method: 'get',
        url: obj.url,
        params: obj.data,
        headers: {
          'Accept-Language': storage.get('LANG') || 'zh-CN'
        }
      }).then(data => {
        Message.success(data.data.msg)
        Spin.hide()
        resolve(data.data)
      }).catch(error => {
        Message.error(error.response.data.msg)
        Spin.hide()
        reject(error)
      })
    })
  }
}
