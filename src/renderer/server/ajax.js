import axios from 'axios'
import { Message } from 'iview'
import jsonp from 'jsonp'
import qs from 'qs'
axios.defaults.timeout = 1000000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json' //通信格式
// axios.defaults.baseURL = 'http://127.0.0.1:7001' //配置接口地址
axios.defaults.baseURL = 'https://api.imap.trevor.top' //配置接口地址
// axios.defaults.baseURL = 'https://imap.leanapp.cn' //配置接口地址

export default {
  // POST请求
  post({...obj}) {
    return new Promise((resolve,reject) => {
      axios.post(obj.url, obj.data).then(data => {
        if(data.data.code === 0) {
          Message.success(data.data.msg)
          resolve(data.data)
        } else if (data.data.code === 1) {
          Message.warning(data.data.msg)
          resolve(data.data)
        } else if (data.data.code === 2) {
          Message.error(data.data.msg)
          resolve(data.data)
        } else {
          Message.error(data.data.msg)
          resolve(data.data)
        }
      }).catch(data => {
        reject(data)
      })
    })
  },
  // GET请求
  get({...obj}) {
    return new Promise((resolve,reject) => {
      axios.get(obj.url, { params: obj.data }).then(data => {
        if(data.status === 200) {
          resolve(data.data)
        } else if(data.data.code === 0) {
          resolve(data.data)
        } else if (data.data.code === 1) {
          Message.warning(data.data.msg)
          resolve(data.data)
        } else if (data.data.code === 2) {
          Message.error(data.data.msg)
          resolve(data.data)
        } else {
          Message.error(data.data.msg)
          resolve(data.data)
        }
      }).catch(data => {
        reject(data)
      })
    })
  },
  // jsonp
  jsonp({...obj}) {
    return new Promise((resolve, reject) => {
      jsonp(obj.url + '?' + qs.stringify(obj.data) , null,  (err, data) => {
        if (err) {
          Message.error('请求错误')
        } else if(data.status === 0) {
          resolve(data)
        } else if(data.code === 0) {
          resolve(data)
        } else {
          if(getUrlRelativePath() === '/')
            resolve(data)
          else
            Message.error('请求错误')
        }
      })
    })
  }
}
