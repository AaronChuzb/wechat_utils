/*
 * @Author: AaronChu
 * @Date: 2021-07-31 11:15:54
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-07-31 11:23:09
 * @FilePath: \modal\index\index.js
 */
const app = getApp()

Page({
  data: {
    show: false
  },
  showModal(){
    this.setData({
      show: true
    })
  },
  onClose(){
    this.setData({
      show: false
    })
  },
  onLoad() {
    
  },
})
