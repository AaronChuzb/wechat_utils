/*
 * @Author: AaronChu
 * @Date: 2021-07-14 11:36:24
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-07-20 16:23:06
 * @FilePath: \areaPicker\components\region\index.js
 */
const region  = require('../../utils/region.js');
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    column: {
      type: Number,
      value: 3
    }
  },
  data: {
    areaText: '', // 显示的省市区文字
    blockArray: [], // 显示的省市区三级数组，二维数组
    blockIndex: [0, 0, 0], // 显示出来的选择下标，默认，[0,0,0]
    regionArray: [], // 选择器当前的省市区三级数组，二维数组
    regionIndex: [0, 0, 0], // 选择器当前选中的下标
    provinceList: region.province, // 省级数组，
    cityList: [], // 地市级数组，
    areaList: [], // 区县数组
    column_num: 3
  },
  observers:{
    column:function(column){
      if(column > 3 || column < 2){
        this.setData({
          column_num: 3
        })
      } else {
        this.setData({
          column_num: column
        })
      }
    }
  },
  lifetimes: {
    // 数据初始化
    attached: function() {
      let provinceList = region.province, cityList = [], areaList = []
      cityList = this.getCity(region.province[0])
      areaList = this.getArea(cityList[0])
      let blockArray = [], regionArray = []
      if(this.data.column_num == 3){
        blockArray = [provinceList, cityList, areaList]
        regionArray = [provinceList, cityList, areaList]
      } else if (this.data.column_num == 2){
        blockArray = [provinceList, cityList]
        regionArray = [provinceList, cityList]
      }
      else if (this.data.column_num == 1){
        blockArray = provinceList
        regionArray = provinceList
      }
      this.setData({
        blockArray,
        regionArray,
        cityList,
        areaList,
      })
    },
  },
  methods: {
    /**
     * @description: 根据省份获取城市
     * @param {Object} province 省份对象 { id: "110000", name: "北京市", parent_id: NULL }，所有省的parent_id为空
     * @return {Array} 城市列表
     */
    getCity (province) {
      if (province) {
        const list = region.city.filter(val => {
          return val.parent_id == province.id
        })
        return list.length ? list : [province] // 不为空返回该列表，为空返回传入进来的数值
      } else return [] // 未传值返回空置
    },

    /**
     * @description: 根据城市获取该市的区列表
     * @param {Object} city 城市对象 { id: "110100", name: "北京市", parent_id: "110000" }，parent_id即为城市对应的省份
     * @return {Array} 区列表
     */
    getArea (city) {
      if (city) {
        const list = region.area.filter(val => {
          return val.parent_id == city.id
        })
        return list.length ? list : [city] // 不为空返回该列表，为空返回传入进来的数值
      } else return [] // 未传值返回空置
    },
    onChange (e) {
      const regionIndex = this.data.regionIndex;
      regionIndex[e.detail.column] = e.detail.value;
      if(e.detail.column === 0) {
        regionIndex[1] = 0;
        if(this.data.column_num == 3){
          regionIndex[2] = 0;
        }
      } else if(e.detail.column === 1) {
        if(this.data.column_num == 3){
          regionIndex[2] = 0;
        }
      }
      const provinceItem = region.province[regionIndex[0]];
      let cityList = [], areaList = [];
      if(this.data.column_num > 1){
        cityList = this.getCity(provinceItem);
      }
      if(this.data.column_num == 3){
        areaList = this.getArea(cityList[regionIndex[1]]);
      }
      let regionArray = []
      if(this.data.column_num == 3){
        regionArray = [region.province, cityList, areaList]
      } else if (this.data.column_num == 2){
        regionArray = [region.province, cityList]
      }
      this.setData({
        regionArray: regionArray,
        regionIndex: regionIndex,
        cityList,
        areaList,
      })
      if(this.data.column_num == 3){
        this.triggerEvent('Change', { index: regionIndex, value: [this.data.provinceList[regionIndex[0]], cityList[regionIndex[1]], areaList[regionIndex[2]]] })
      } else if (this.data.column_num == 2){
        this.triggerEvent('Change', { index: regionIndex, value: [this.data.provinceList[regionIndex[0]], cityList[regionIndex[1]]] })
      }
    },
    onChoose (e) { // 点击确定按钮的事件
      if(this.data.column_num == 3) {
        const oldKey = this.data.blockArray[2][this.data.blockIndex[2]]; // 这是留住上次选中的第三级区域代码
        const newKey = this.data.regionArray[2][this.data.regionIndex[2]]; // 本次选中的第三级区域代码
        if(oldKey != newKey) { // 如果本次选择和之前的不一样，则修改数据
          this.setData({
            blockArray: this.data.regionArray,
            regionIndex: e.detail.value,
            blockIndex: e.detail.value,
            areaText: `${this.data.regionArray[0][this.data.regionIndex[0]].name}${this.data.regionArray[1][this.data.regionIndex[1]].name}${this.data.regionArray[2][this.data.regionIndex[2]].name}`
          })
        } else {
          this.setData({
            areaText: `${this.data.regionArray[0][this.data.regionIndex[0]].name}${this.data.regionArray[1][this.data.regionIndex[1]].name}${this.data.regionArray[2][this.data.regionIndex[2]].name}`
          })
        }
        this.triggerEvent('Choose', { index: this.data.regionIndex, value: [this.data.provinceList[this.data.regionIndex[0]], this.data.cityList[this.data.regionIndex[1]], this.data.areaList[this.data.regionIndex[2]]] })
      } else if(this.data.column_num == 2) {
        const oldKey = this.data.blockArray[1][this.data.blockIndex[1]]; // 这是留住上次选中的第二级区域代码
        const newKey = this.data.regionArray[1][this.data.regionIndex[1]]; // 本次选中的第二级区域代码
        if(oldKey !== newKey) { // 如果本次选择和之前的不一样，则修改数据
          this.setData({
            blockArray: this.data.regionArray,
            regionIndex: e.detail.value,
            blockIndex: e.detail.value,
            areaText: `${this.data.regionArray[0][this.data.regionIndex[0]].name}${this.data.regionArray[1][this.data.regionIndex[1]].name}`
          })
        } else {
          this.setData({
            areaText: `${this.data.regionArray[0][this.data.regionIndex[0]].name}${this.data.regionArray[1][this.data.regionIndex[1]].name}`
          })
        }
        this.triggerEvent('Choose', { index: this.data.regionIndex, value: [this.data.provinceList[this.data.regionIndex[0]], this.data.cityList[this.data.regionIndex[1]]] })
      }
    }
  }
})
