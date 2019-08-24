import FloorTagsPicker from './FloorTagsPicker'
import FloorTitlePicker from './FloorTitlePicker'
import CategoryPicker from './CategoryPicker'
import SkuSelector from './SkuSelector'
import SkuActivity from './srcActivity'
import GradeEditor from './GradeEditor'
import ShopPicker from './ShopPicker'

import ClassifyPicker from './ClassifyPicker'

import UE from './UE'

const components = {
    FloorTagsPicker,
    FloorTitlePicker,
    GradeEditor,
    ShopPicker,
    SkuSelector,
    SkuActivity,
    CategoryPicker,
    ClassifyPicker
}

components.install = function(Vue) {
    Object.keys(components).forEach(key => {
        key !== 'install' && Vue.component(components[key].name, components[key])
    })
}

export default components

export {
    FloorTagsPicker,
    FloorTitlePicker,
    GradeEditor,
    ShopPicker,
    UE,
    SkuSelector,
    SkuActivity,
    CategoryPicker,
    ClassifyPicker
}
