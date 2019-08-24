<template>
<div>
  <en-table-layout
    ref="child"
    :tableData="tableData.data"
    :loading="loading"
  >
    <!-- <div slot="toolbar" class="inner-toolbar">
      <div class="toolbar-btns">
        <div class="conditions">
          <el-button @click="addShopDialog = true" type="primary" size="small">添加</el-button>
          <el-button size="mini" type="primary" icon="el-icon-download" @click="handleExportRefund" style="margin-left: 5px">导出Excel</el-button>
        </div>
      </div>
      <div class="toolbar-search">
        <en-table-search
          @search="searchEvent"
          @advancedSearch="advancedSearchEvent"
          advanced
          placeholder="请输入：用户账号/用户昵称"
        >
          <template slot="advanced-content">
            <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
              <el-form-item label="时间">
                  <el-date-picker
                    v-model="advancedForm.order_time_range"
                    type="daterange"
                    align="center"
                    :editable="false"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp"
                    :picker-options="{ disabledDate(time) { return time.getTime() > Date.now() }, shortcuts: MixinPickerShortcuts }">
                  </el-date-picker>
                </el-form-item>
             
            </el-form>
          </template>
        </en-table-search>
      </div>
    </div> -->

    <template slot="table-columns">
      <!-- <el-table-column prop="sn" label="交易号"/>
      <el-table-column prop="mobile" label="用户账号"/> -->
      <el-table-column prop="member_name" label="会员名称"/>
      <el-table-column prop="pay_money" label="购买金额"/>
      <!-- <el-table-column prop="count" label="获得次数"/>
      <el-table-column prop="invalid_count" label="有效次数"/> -->
      <el-table-column label="最近购买日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.payment_time }}
        </template>
      </el-table-column>
      <el-table-column label="类型" >
        <template slot-scope="scope">
          {{ scope.row.type==1 ? "老客户" : "新客户" }}
        </template>
      </el-table-column>
      <!-- 商品预览 -->
      
    </template>

    <el-pagination
      v-if="tableData"
      slot="pagination"
      @size-change="handlePageSizeChange"
      @current-change="handlePageCurrentChange"
      :current-page="tableData.page_no"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="tableData.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.data_total">
    </el-pagination>
    
  </en-table-layout>
  <!-- 排序设置 -->
  <el-dialog
    title="商品排序"
    :visible.sync="dialogVisible"
    center="center"
    width="30%">
    <div>
      <el-form ref="sortForm" :model="sortForm" class="el_form_line">
        <el-form-item prop="withDrawal" label="排序：">
          <el-input type="number" v-model="sortForm.sort" maxlength=6 placeholder="请输入排序"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="enterSort">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 添加商品dialog -->
  <el-dialog
    title="添加商品"
    v-if="addShopDialog"
    :visible.sync="addShopDialog"
    center="center"
    width="1100px">
    <div>
      <!-- 插入的内容 -->
      <good-form></good-form>
    </div>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="addShopDialog = false">取 消</el-button>
      <el-button type="primary" >确 定</el-button>
    </span> -->
  </el-dialog>
  <!-- 商品详情预览 -->
  <!-- <el-dialog
    title="商品详情"
    :visible.sync="goodsDetail"
    width="800px">
    <div class="goodsInfoContent">
      <el-form label-position="right" label-width="150px" :model="goodsInfo">
        <el-form-item label="店铺名称：" v-if="goodsInfo.seller_name">
          <el-input v-model="goodsInfo.seller_name" disabled style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="goodsInfo.goods_name" disabled  style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="商品编号：">
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
        <el-form-item label="商品详情：">
          <div class="goodsIntro" v-html="goodsInfo.intro"></div>
        </el-form-item>
        
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="goodsDetail = false">确 定</el-button>
    </span>
  </el-dialog> -->
</div>  
</template>

<script>
  import {parseTime} from '@/utils'
  import * as award from '@/api/award'
  import { Foundation } from '~/ui-utils'
  export default {
    name: 'lotteryAmount',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 商品列表数据 */
        tableData: '',

        /** 高级搜索数据 */
        advancedForm: {
          
        },

        /**商品状态 */
        options: [{
          value: '0',
          label: '待审核'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '审核拒绝;是否上架'
        }, {
          value: '3',
          label: '已下架'
        }, {
          value: '4',
          label: '已上架'
        }],
        // 商品数据
        goodsInfo:{},
        // 商品预览弹窗
        goodsDetail:false,
        // 设置排序
        dialogVisible:false,
        // 排序数据
        sortForm:{},
        // 添加商品弹窗
        addShopDialog:false,
        /** 商品类别 */
        goodsClassify:[]
      }
    },
    components: {
      // 'good-form':goodForm
    },
    mounted() {
      this.GET_GoodsList()
      // this.GET_GoodsClassifyList()
    },
    watch:{
      addShopDialog(val){
        if(!val){
          this.GET_GoodsList()
        }
      }
    },
    methods: {
      handleExportRefund(){
        this.loading = true
        delete this.params.page_no
        delete this.params.page_size
        award.exportAmountList(this.params).then(response => {
          console.log(response,789)
           const json = {
            sheet_name: '抽奖记录',
            sheet_values: response.data.map(item => ({
              '交易号': item.sn,
              '用户账号': item.mobile,
              '用户昵称': item.user_name,
              '支付金额（元）': item.price,
              '获得次数': item.count,
              '有效次数': item.invalid_count,
              '时间': item.create_time ? Foundation.unixToDate(item.create_time) : '',
            }))
          }
          this.MixinExportJosnToExcel(json, '抽奖记录')

          this.loading = false
        }).catch(() => (this.loading = false))
      },
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GoodsList()
      },

       /** 单个商品上架、下架操作确认 */
      handleOperateGoods(index, row) {
        if (row.market_enable === 0) {
          this.$confirm('确定要上架这个商品吗？', '提示', { type: 'warning' }).then(() => {
            API_goods.upGoods(row.goods_id).then(response => {
              row.market_enable = 1
              this.$message.success('上架商品成功！')
            })
          }).catch(() => {})
        } else {
          this.$prompt('请输入下架原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /.+/,
            inputErrorMessage: '请填写下架原因！'
          }).then(({ value }) => {
            API_goods.underGoods(row.goods_id, value).then(() => {
              row.market_enable = 0
              this.$message.success('下架商品成功！')
            })
          }).catch(() => {})
        }
      },


      /** 销售状态格式化 */
      marketStatus(row, column, cellValue) {
        const { market_enable, is_auth } = row
        if (is_auth === 1) {
          return row.market_enable === 1 ? '售卖中' : '已下架'
        } else {
          return is_auth === 2 ? '审核拒绝' : '待审核'
        }
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        this.params.page_no = 1
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        delete this.params.start_time
        delete this.params.end_time
        this.GET_GoodsList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.start_time
        delete this.params.end_time
        // delete this.params.keyword
        if (this.advancedForm.order_time_range) {
          this.params.start_time = this.advancedForm.order_time_range[0] / 1000
          this.params.end_time = this.advancedForm.order_time_range[1] / 1000
        }
        delete this.advancedForm.order_time_range
        delete this.params.order_time_range
        this.params.page_no = 1
        this.GET_GoodsList()
      },

      /** 高级搜索中 分类选择组件值发生改变 */
      categoryChanged(data) {
        this.advancedForm.category_path = data.category_path || ''
      },

      GET_GoodsList() {
        this.loading = true
        award.getAmountList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
        }).catch(() => (this.loading = false))
      },
      /** 商品预览 */
      showGoodsInfo(row){
        this.goodsInfo = {}
        this.goodsDetailVisible = true
        let goodsId = row.goods_id
        let params = {
          goods_id : row.goods_id
        }
        API_goodsThings.getGoodsDetail(params,row.goods_id).then(response => {
          console.log(response)
          this.goodsInfo = response.data
          this.goodsInfo.vip_discount = response.data.vip_discount *100
          this.goodsInfo.platinum_discount = response.data.platinum_discount *100
          this.$refs.child.showDij(this.goodsInfo,1)
        })
        
      },
      // showGoodsInfo(row){
      //   console.log(row)
      //   this.goodsInfo = {}
      //   this.goodsDetail = true
      //   let params = {
      //     goods_id : row.goods_id
      //   }
      //   API_goodsThings.getGoodsDetail(params,row.goods_id).then(response => {
      //     this.goodsInfo = response.data
      //   })
        
      // },
      /** 删除好物优享 */
      deleteBestGoods(row){
        let params = {
          goods_id : row.goods_id
        }
        API_goodsThings.deleteBestGoods(params).then(response => {
          if(response.code == 0){
            this.$message.success('删除好物优享商品成功')
            this.GET_GoodsList()
          }else{
            this.$message.error(response.message)
          }
        });
      },
      // 设置排序
      setSort(row){
        this.sortForm = {
          goods_id : row.goods_id,
          sort:row.sort
        }
        this.dialogVisible = true
      },
      // 确认排序
      enterSort(){
        // if(this.sortForm.sort < 0){
        //   this.$message.error('排序必须大于0')
        //   return false
        // }
        // if(this.sortForm.sort.length != 6){
        //   this.$message.error('排序必须为6位数字')
        //   return false
        // }
        let reg = /^[0-9]+$/
        // let reg = /^[+]{0,1}(\d+)$/
        let result = reg.test(this.sortForm.sort)
        if(!result || this.sortForm.sort >= 1000000){
          this.$message.error('排序必须为0-1000000之间的正整数')
          return false
        }
        API_goodsThings.updatesort(this.sortForm).then(response => {
          if(response.code == 0){
            this.GET_GoodsList()
            this.dialogVisible = false
          }else{
            this.$message.error('排序必须为0-1000000之间的正整数')
          }
        })
        
        
      },
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .inner-toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .toolbar-search {
    margin-right: 10px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }
  .goods_name {
    color: #4183c4;
    &:hover {
      color: #f42424;
    }
  }
  /deep/ .el_form_line{
    display: flex;
    justify-content: center;
    .el-form-item__label{
      display: inline-block;
    }
    .el-form-item__content{
      display: inline-block;;
    }
    .el-input__inner{
      padding: 0 0 0 15px;
    }
  }
  div.toolbar-btns {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    div {
      span {
        display: inline-block;
        font-size: 14px;
        color: #606266;
      }
    }
    .conditions {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      min-width: 24.5%;
      margin-left: 10px;
      .choose-machine {
        width: 60%;
      }
    }
  }
  /deep/ .goodsIntro img{
    max-width: 80% !important;
    display: block;
  }
  /deep/ .goodsIntro p{
    margin: 0;
  }
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 300px;
  }
</style>
