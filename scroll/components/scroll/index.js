/*
 * @Author: AaronChu
 * @Date: 2021-08-04 10:25:54
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-04 10:59:38
 * @FilePath: \scroll\components\scroll\index.js
 */
var page = 1
Component({
  options: {
    addGlobalClass: true
  },
  properties: { // 接收的参数
    height: { // 滚动区域高度，默认100vh
      type: String,
      value: '100vh'
    },
    isRefresh: { // 是否支持刷新，默认关闭
      type: Boolean,
      value: false
    },
    isTriggered: { // 刷新状况，需要与页面同步
      type: Boolean,
      value: false
    },
    hasMore:{ // 是否有更多，默认是，可加载更多
      type: Boolean,
      value: true
    }
  },
  observers:{
    isTriggered: function (isTriggered){
      this.setData({
        triggered: isTriggered
      })
    },
    hasMore: function (hasMore){
      this.setData({
        has_more: hasMore
      })
    }
  },
  data: {
    triggered: false, // 触发下拉刷新
    has_more: true // 是否有更多
  },
  methods: {
    /**
     * @description: 下拉刷新
     */
    refresh(){
      this.setData({ has_more: true }) // 刷新后默认可以加载更多，此时不知道下面是有多少的
      page = 1
      this.triggerEvent('GetData', { page: page })
    },

    /**
     * @description: 上拉加载更多
     */
    more(){
      if(this.data.has_more){ // 等页面请求确认是否有更多才可以往下加载
        page += 1
        this.triggerEvent('GetData', { page: page })
      }
    },
  }
})
