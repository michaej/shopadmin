/**
 * 分类选择组件
 * 随选随用
 */
import Vue from 'vue'
import ClassifyPicker from './src/main'

ClassifyPicker.install = () => {
  Vue.component(ClassifyPicker.name, ClassifyPicker)
}

export default ClassifyPicker
