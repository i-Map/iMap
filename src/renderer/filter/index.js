import Vue from 'vue'

Vue.filter('dateFormat', time => {
  if(time === '')
    return '暂无数据'
  else
    return time
})
