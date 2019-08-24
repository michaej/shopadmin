/**
 * Created by Andste on 2018/5/28.
 * 商品选择器
 * 依赖于element-ui
 */

import Vue from 'vue'
import TagGoodsPicker from './src/main.vue'

TagGoodsPicker.install = () => {
  Vue.component(TagGoodsPicker.name, TagGoodsPicker)
}

export default TagGoodsPicker
