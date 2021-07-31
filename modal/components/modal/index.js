/*
 * @Author: AaronChu
 * @Date: 2021-07-15 18:11:55
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-07-31 11:19:32
 * @FilePath: \modal\components\modal\index.js
 */

Component({
  options: { // 全局样式支持
    addGlobalClass: true
  },
  properties: {
    show: { // 弹出
      type: Boolean,
      value: false,
    },
  },
  data: {
    visible: false,
    animation: null,
    animationData: null,
  },
  observers: {
    show: function(show){
      if(show){
        setTimeout(function () {
          this.onShow();
        }.bind(this), 0)
      }
    }
  },
  ready: function () {
    const animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0,
    });
    this.setData({
      animation,
    })
  },
  methods: {
    /**
     * @description: 打开弹窗
     */
    onShow () {
      const that = this
      const query = wx.createSelectorQuery().in(this)
      query.select('#modal-box').boundingClientRect( (res) => {
        const { animation } = that.data;
        animation.translateY(-res.height).step()
        that.setData({
          visible: true,
          animationData: animation.export(),
        })
      }).exec();
    },
    /**
     * @description: 关闭弹窗
     */
    onClose () {
      const { animation } = this.data
      animation.translateY(0).step()
      this.setData({
        visible: false,
        animationData: animation.export(),
      })
      setTimeout(function () {
        this.triggerEvent('Close');
      }.bind(this), 200)
    },
  },
})

