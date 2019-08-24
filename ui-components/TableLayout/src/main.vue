<template>
  <div class="container" v-loading="loading">
    <div v-if="toolbar" class="toolbar">
      <slot name="toolbar"></slot>
    </div>
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      ref="table"
      :data="tableData"
      :row-key="rowKey"
      :stripe="stripe"
      :header-cell-style="{textAlign: 'center'}"
      :style="{width: '100%'}"
      @selection-change="selectionChange"
      @sort-change='sortChange'
    >
      <slot name="table-columns"></slot>
    </el-table>
    <div v-if="pagination" class="pagination">
      <div class="pagination-toolbar">
        <slot name="pagination-toolbar"></slot>
      </div>
      <slot name="pagination"></slot>
    </div>
    <!-- 商品预览 -->
    <el-dialog
      title="商品详情"
      :visible.sync="goodsDetailVisible"
      width="1000px">
      <div class="goodsInfoContent">
        <el-form label-position="right" label-width="150px" :model="goodsInfo">
          <el-form-item v-if="!isGroupBuy" label="商品分类：">
            <div v-text="goodsInfo.activity_category_name" v-if="activity == 1"></div>
            <div v-text="goodsInfo.category_name" v-if="activity == 0"></div>
          </el-form-item>
          <el-form-item label="店铺名称：" v-if="goodsInfo.seller_name">
            <el-input v-model="goodsInfo.seller_name" disabled style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input v-model="goodsInfo.goods_name" disabled  style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item v-if="!isGroupBuy" label="商品编号：">
            <el-input v-model="goodsInfo.sn" disabled  style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="商品价格：">
            <el-input v-model="goodsInfo.price" disabled  style="width:70%;">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="市场价格：">
            <el-input v-model="goodsInfo.mktprice" disabled  style="width:70%;">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="成本价格：">
            <el-input v-model="goodsInfo.cost" disabled  style="width:70%;">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="!isGroupBuy" label="贵宾折扣：">
            <el-input v-model="goodsInfo.vip_discount" disabled  style="width:70%;">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="!isGroupBuy" label="铂金折扣：">
            <el-input v-model="goodsInfo.platinum_discount" disabled  style="width:70%;">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="规格明细：" v-if="goodsInfo.sku_list && goodsInfo.sku_list[0].spec_list && goodsInfo.sku_list.length > 0 && goodsInfo.sku_list[0].spec_list.length > 0">
            <el-table
              :data="goodsStockData0"
              :span-method="arraySpanMethod"
              :header-cell-style="{textAlign: 'center'}"
              border
              style="width: 100%">
              <!-- <el-table-column
              v-for="(item,index) in spec_list"
              :key="index"
                :prop="item.spec_value"
                :label="item.spec_name">
              </el-table-column> -->
              <el-table-column
              v-for="(item, index) in goodsStockTitle0"
              :label="item.label"
              :key="index">
              <template slot-scope="scope">
                <!-- <el-input v-if="item.prop === 'quantity'" v-model="scope.row.quantity"/>
                <span v-if="item.prop !== 'quantity'" >{{ scope.row[item.prop] }}</span> -->
                <span>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="商品图片：">
            <ul class="imgUl">
              <li v-if="goodsInfo.goods_gallery_list && goodsInfo.goods_gallery_list != []" v-for="item in goodsInfo.goods_gallery_list">
                <img style="width:150px;height:150px;" :src="item.original">
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="商品详情：">
            <div class="goodsIntro" v-html="goodsInfo.intro"></div>
          </el-form-item>
          
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goodsDetailVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'EnTableLayout',
    props: {
      /** 是否显示斑纹 */
      stripe: {
        type: Boolean,
        default: true
      },
      /** 行数据的 Key */
      rowKey: {
        type: String,
        default: null
      },
      /** 是否显示工具栏 */
      toolbar: {
        type: Boolean,
        default: true
      },
      /** 是否显示分页 */
      pagination: {
        type: Boolean,
        default: true
      },
      /** 表格数据 */
      tableData: {
        default: () => ([])
      },
      /** 加载状态 */
      loading: {
        type: Boolean,
        default: false
      },
      /** 当选择项发生变化 */
      selectionChange: {
        type: Function,
        default: () => {}
      },
    },
    data(){
      return {
        // 商品数据
        goodsInfo:{},
        // 商品预览弹窗
        goodsDetailVisible:false,
        isGroupBuy: false,
        order:'',
        activity:'',
        goodsStockTitle0: [],
        goodsStockData0:[],
        concactArray:[]
      }
    },
    watch:{
      order:function(){
        this.$emit('getOrderSort',this.order)
      }
    },
    mounted(){
      this.getTable()
    },
    methods: {
      getTable(){
        this.$refs.table.toggleAllSelection()
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // console.log( row, column, rowIndex, columnIndex,666)
        // if (columnIndex === 0) {
        //   if (rowIndex % 2 === 0) {
        //     return {
        //       rowspan: 2,
        //       colspan: 1
        //     };
        //   } else {
        //     return {
        //       rowspan: 0,
        //       colspan: 0
        //     };
        //   }
        // }
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex < this.goodsStockTitle0.length - 6) {
          const _row = this.concactArray[rowIndex][columnIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      showDij(data,activity){
        this.goodsInfo = data
        this.activity = activity
        var arr = data.sku_list
        this.goodsStockTitle0 = []
        this.goodsStockData0 = []
        arr.forEach(key => {
                if(key.spec_list){
                  let _skus = key.spec_list.map(elem => {
                  return { label: elem.spec_name, prop: elem.spec_name }
                })
                this.goodsStockTitle0 = _skus.concat([
                  { label: '规格id', prop: 'sku_id' },
                  { label: '货号', prop: 'sn' },
                  { label: '重量(kg)', prop: 'weight' },
                  { label: '库存', prop: 'quantity' },
                  { label: '成本价', prop: 'cost' },
                  { label: '价格(元)', prop: 'price' }])
                let _skuData = key.spec_list.map(elem => {
                  let _map = new Map().set(elem.spec_name, elem.spec_value)
      
                  let obj = Object.create(null)
                  for (let [k, v] of _map) {
                    obj[k] = v
                  }
                  return obj
                  
                })

                const _key = {
                  sku_id: key.sku_id,
                  sn: key.sn,
                  weight: key.weight,
                  quantity: key.quantity,
                  cost: key.cost,
                  price: key.price,
                }
                this.goodsStockData0.push(Object.assign(_key, ..._skuData))
                }
                
        });
                console.log(this.goodsStockTitle0,this.goodsStockData0,6565 )
                this.concactArray = []
                this.goodsStockData0.forEach((key, index) => {
                this.concactArrayCom(index, key)
              })

        



        this.goodsDetailVisible = true;
      },
      showDijByGroupbuy(data,activity,isGroupBuy){
        this.goodsInfo = data
        this.activity = activity
        var arr = data.sku_list
        this.goodsStockTitle0 = []
        this.goodsStockData0 = []
        this.isGroupBuy = isGroupBuy
        arr.forEach(key => {
          if(key.spec_list){
            let _skus = key.spec_list.map(elem => {
              return { label: elem.spec_name, prop: elem.spec_name }
            })
            this.goodsStockTitle0 = _skus.concat([
              { label: '规格id', prop: 'sku_id' },
              { label: '库存', prop: 'quantity' },
              { label: '成本价', prop: 'cost' },
              { label: '价格(元)', prop: 'price' },
              { label: '市场价(元)', prop: 'market_price' }])
            let _skuData = key.spec_list.map(elem => {
              let _map = new Map().set(elem.spec_name, elem.spec_value)

              let obj = Object.create(null)
              for (let [k, v] of _map) {
                obj[k] = v
              }
              return obj

            })

            const _key = {
              sku_id: key.sku_id,
              quantity: key.quantity,
              cost: key.cost,
              price: key.price,
              market_price: key.market_price
            }
            this.goodsStockData0.push(Object.assign(_key, ..._skuData))
          }

        });
        this.concactArray = []
        this.goodsStockData0.forEach((key, index) => {
          this.concactArrayCom(index, key)
        })

        this.goodsDetailVisible = true;
      },
      concactArrayCom(index, item) {
        let _isMerge = false
        /** 循环列 先循环第一列 若相同则合并 再循环第二列 依次循环 若不相同 则不合并并终止此列循环开始下一列循环 */
        let _currnetRow = []
        for (let i = 0, _len = this.goodsStockTitle0.length - 3; i < _len; i++) {
          if (this.goodsStockTitle0[i].prop === 'sku_id') {
            i++
            continue
          }
          if (index > 0 && item[this.goodsStockTitle0[i].prop] !== this.goodsStockData0[index - 1][this.goodsStockTitle0[i].prop]) {
            _currnetRow[i] = 1
            _isMerge = true
          } else if (index > 0 && !_isMerge) {
            _currnetRow[i] = 0
            let _count = 1
            while (this.concactArray[index - _count][i] === 0) {
              _count++
            }
            this.concactArray[index - _count][i] += 1
          } else { // index === 0
            _currnetRow[i] = 1
          }
        }
        this.concactArray.push(_currnetRow)
      },
      sortChange(column, prop, order){
        // console.log(column, prop, order,789789)
        if(column.prop == "buy_count" && column.order == "descending"){
          this.order = 0
        }else if (column.prop == "buy_count" && column.order == "ascending"){
          this.order = 1
        }else if (column.prop == "enable_quantity" && column.order == "descending"){
          this.order = 2
        }else if (column.prop == "enable_quantity" && column.order == "ascending"){
          this.order = 3
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  /** 工具栏样式 */
  .toolbar {
    display: flex;
    align-items: center;
    height: 44px;
    border-bottom: 1px solid #e6ebf5;
    background-color: #fff;
  }
  .inner-toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 20px;
  }

  .toolbar-search {
    margin-right: 10px;
  }
  /** 分页样式 */
  .pagination {
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    text-align: right;
    background-color: #ffffff;
    .pagination-toolbar {
      display: flex;
      align-items: center;
    }
  }
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }
  /deep/ .goodsIntro img{
    max-width: 80% !important;
    display: block;
  }
  /deep/ .goodsIntro p{
    margin: 0;
  }
  .imgUl {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap; 
    li {
      margin-right:10px; 
    }
  }
</style>
