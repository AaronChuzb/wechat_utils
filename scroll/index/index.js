/*
 * @Author: AaronChu
 * @Date: 2021-08-04 10:25:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-04 11:11:02
 * @FilePath: \scroll\index\index.js
 */
const app = getApp()

Page({
  data: {
    triggered: false,
    hasMore: true,
    dataList: [[1, 2, 3]], // 二维数组，防止加载多页后一次setData的数据过多
  },

  /**
   * @description: 支持无限加载数据，每次变更的数据都不会超过一页的数据长度
   * @param {*} e
   */
  getData(e){
    let page // page为请求页数
    e?(page = e.detail.page):(page = 1)
    console.log(page)
    // TODO 开始接口请求，并将下部分加入其中，已延时函数来表示请求
    setTimeout(()=>{
      // 需要变更的数据位置
      let change = `dataList[${page - 1}]`
      // 判断数据长度，来确定是否下次要加载更多

      this.setData({ // 保存数据变更
        [change]: [page, page + 1, page + 2],
        triggered: false
      })
      this._freshing = false
    }, 100)
    
  },
  onLoad() {
    this.getData()
  },
})
