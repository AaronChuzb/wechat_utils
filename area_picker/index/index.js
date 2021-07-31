/*
 * @Author: AaronChu
 * @Date: 2021-07-20 16:05:23
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-07-20 16:27:03
 * @FilePath: \areaPicker\index\index.js
 */
const app = getApp()

Page({
  data: {
    address: "请选择",
    address1: "请选择",
  },
  onChange(e){
    console.log(e)
    if(e.currentTarget.dataset.index == "1"){
      this.setData({
        address: e.detail.value[0].name + e.detail.value[1].name
      })
    } else {
      this.setData({
        address1: e.detail.value[0].name + e.detail.value[1].name + e.detail.value[2].name
      })
    }
  },
  onChoose(e){
    console.log(e)
  },
  onLoad() {
    
  },
})
