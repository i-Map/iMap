import axios from 'axios'
import { Message } from 'iview'
import jsonp from 'jsonp'
import qs from 'qs'
axios.defaults.timeout = 1000000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json' //通信格式
// axios.defaults.baseURL = 'http://localhost:3000/' //配置接口地址
axios.defaults.baseURL = 'https://imap.leanapp.cn' //配置接口地址

export default {
  // POST请求
  post({...obj}) {
    return new Promise((resolve,reject) => {
      axios.post(obj.url, obj.data).then(data => {
        if(data.data.code === 0){
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
  // 坐标请求(百度地图API)
  getLocation({...obj}) {
    return new Promise((resolve, reject) => {
      jsonp(obj.url + '?' + qs.stringify(obj.data) , null,  (err, data) => {
        if (err) {
          Message.error('请求错误')
        } else {
          if(data.status === 0) {
            resolve(data)
          }
        }
      })
    })
  },
  // GET请求
  get({...obj}) {
    return new Promise((resolve,reject) => {
      axios.get(obj.url).then(data => {
        if(data.data.code === 0){
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
  }
}
