<template>
  <div>
    <en-table-layout
      toolbar
      pagination
      :tableData="tableData"
      :height="560"
      :loading="loading">
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <!-- 日期选择 -->
          <span class="spanLabel">下单时间</span>
          <el-date-picker style="width:280px"
            v-model="advancedForm.order_time_range"
            type="daterange"
            align="center"
            :editable="false"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          &nbsp;&nbsp;
          <!-- 店铺名称 -->
          <span class="spanLabel">店铺名称</span>
          <el-input style="width:120px" v-model='params.shop_name'></el-input>
          &nbsp;&nbsp;
          <!-- 订单编号 -->
          <span class="spanLabel">服务编号</span>
          <el-input style="width:150px" v-model='params.order_sn'></el-input>
          &nbsp;&nbsp;
          <!--结算状态-->
          <!--<span class="spanLabel">结算状态</span>-->
          <!-- <el-select
              class="choose-machine"
              v-model="params.settlement_status"
              placeholder="请选择结算状态"
              @change="changeSettlementStatus"
              clearable>
              <el-option
                v-for="item in settlementStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          &nbsp;&nbsp; -->
          <!--订单状态-->
          <!--<span class="spanLabel">订单状态</span>-->
          <div class="conditions">
            <el-select style="width:200px"
              class="choose-machine"
              v-model="params.item_type"
              placeholder="请选择服务状态"
              @change="changeGoodsStatus"
              clearable>
              <el-option
                v-for="item in goodsStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
            &nbsp;&nbsp;
            <el-button type="primary" @click="GET_flowList">查询</el-button>
            <el-button type="primary" @click="handleExport">导出</el-button>
          </div>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column label="服务编号">
          <template slot-scope="scope">{{ scope.row.order_no }}</template>
        </el-table-column>
        <el-table-column label="店铺名称">
          <template slot-scope="scope">{{ scope.row.shop_name }}</template>
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
        </el-table-column>
        <el-table-column label="订单金额">
          <template slot-scope="scope">{{ scope.row.business_money | unitPrice('￥')}}</template>
        </el-table-column>
        <el-table-column label="收益">
          <template slot-scope="scope">{{ scope.row.profit_price | unitPrice('￥')}}</template>
        </el-table-column>
        <el-table-column label="平台服务费">
          <template slot-scope="scope">{{ (scope.row.service_price ? scope.row.commi_price : '0.00') | unitPrice('￥')}}</template>
        </el-table-column>
        <el-table-column label="上级分成">
          <template slot-scope="scope">{{ scope.row.superior_price }}</template>
        </el-table-column>
        <el-table-column label="服务状态">
          <template slot-scope="scope">
            {{ scope.row.order_status == 0 ? '删除' : (scope.row.order_status == 1 ? '待付款' : (scope.row.order_status == 2 ? '已预约' : (scope.row.order_status == 3 ? '已完成' : (scope.row.order_status == 4 ? '已取消' : (scope.row.order_status == 5 ? '申请退款' : (scope.row.order_status == 6 ? '交易关闭' : ''))))))}}
          </template>
        </el-table-column>
        <el-table-column label="完成时间">
          <template slot-scope="scope">{{ scope.row.end_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
        </el-table-column>
        <!-- <el-table-column label="支付方式">
          <template slot-scope="scope">{{ scope.row.payment_type === 'ONLINE' ? '在线支付' : ( scope.row.payment_type === 'COD' ? '货到付款' : '' )}}</template>
        </el-table-column> -->
        <el-table-column label="第三方交易号">
          <template slot-scope="scope">{{ scope.row.third_party_no }}</template>
        </el-table-column>
        <!-- <el-table-column label="供货价">
          <template slot-scope="scope">{{ (scope.row.order_cost_price ? scope.row.order_cost_price : '0.00') | unitPrice('￥')}}</template>
        </el-table-column> -->
        <el-table-column label="操作" width="300" style="text-align: left;">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleFlow(scope.row)">查看
            </el-button>
          </template>
        </el-table-column>
      </template>
      <el-pagination
        slot="pagination"
        v-if="pageData"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="pageData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.data_total">
      </el-pagination>
    </en-table-layout>

  </div>
</template>

<script>
  import * as API_flowQuery from '@/api/flowQuery'
  import { RegExp,Foundation } from '~/ui-utils'

  export default {
    name: 'flowQuery',
    data() {

      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10,
        },

        /** 列表数据 */
        tableData: [],

        /** 列表分页数据 */
        pageData: [],

        /** 订单状态列表 */
        goodsStatusList: [
          { value: 'PAYMENT', label: '正常' },
          { value: 'REFUND', label: '退款' }
        ],

        /** 结算状态列表 */
        settlementStatusList: [
          { value: '1', label: '可结算' },
          { value: '0', label: '不可结算' }
        ],

        /** 店铺信息 */
        shopInfo: this.$store.getters.shopInfo,

        /** 总日期 */
        advancedForm:{},
      }
    },
    mounted() {
      this.params = {
        ...this.params
      }
      this.GET_flowList()
    },
    activated() {
      delete this.params.item_type
      this.params = {
        ...this.params
      }
      this.GET_flowList()
    },
    beforeRouteUpdate(to, from, next) {
      delete this.params.item_type
      this.params = {
        ...this.params
      }
      this.GET_flowList()
      next()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_flowList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_flowList()
      },

      /** 切换结算状态*/
      changeSettlementStatus(val) {
        delete this.params.settlement_status
        if (val !== '' && val !== -1) {
          this.params = {
            ...this.params,
            settlement_status: val
          }
        }
      },

      /** 切换订单状态*/
      changeGoodsStatus(val) {
        delete this.params.item_type
        if (val !== '' && val !== -1) {
          this.params = {
            ...this.params,
            item_type: val
          }
        }
      },

      /** 搜索 */
      GET_flowList() {
        delete this.params.start_time
        delete this.params.end_time
        if (this.advancedForm.order_time_range) {
          this.params.start_time = this.advancedForm.order_time_range[0].getTime() / 1000
          this.params.end_time = this.advancedForm.order_time_range[1].getTime() / 1000
        }
        delete this.params.order_time_range
        this.loading = true
        API_flowQuery.getFindAssetLogAll(this.params).then(response => {
          console.log(response)
          this.loading = false
          this.pageData = {
            page_no: response.data.page_no,
            page_size: response.data.page_size,
            data_total: response.data.data_total
          }
          this.tableData = response.data.data
        })
      },
      /** 导出流水 */
      handleExport(){
        if (this.advancedForm.order_time_range) {
          this.params.start_time = this.advancedForm.order_time_range[0].getTime() / 1000
          this.params.end_time = this.advancedForm.order_time_range[1].getTime() / 1000
        }
        let params = this.MixinClone(this.params);
        params.page_no = 1
        params.page_size = 2000

        API_flowQuery.getFlowQueryList(params).then(response => {
          let jsonData = response.data.data
          const json = {
            sheet_name: '流水查询单',
            sheet_values: jsonData.map(item => ({
              '订单编号': item.order_sn,
              '店铺名称': item.seller_name,
              '下单时间': item.order_time ? Foundation.unixToDate(item.order_time) : '',
              '订单金额': '￥' + item.price,
              '平台服务费': item.commi_price != null ? '￥' + item.commi_price : '￥0',
              '订单类型': item.item_type == 'REFUND' ? '退款' : '正常',
              '支付方式': item.payment_type == 'ONLINE' ? '在线支付' : ( item.payment_type == 'COD' ? '货到付款' : ''),
              '第三方交易号': item.pay_order_no,
              '供货价': item.order_cost_price ? '￥' + item.order_cost_price : '',
              '订单状态': item.order_status_text
            }))
          }
          this.MixinExportJosnToExcel(json, '流水查询单')
        })
      },
      /** 查看流水详情 */
      handleFlow(row){
        this.$router.push({ path: `water-details/${row.seller_id}` })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ div.toolbar {
    height: 70px;
    padding: 20px 0;
  }

  /deep/ .spanLabel{
    font-size: 16px;
    color:#666;
  }

  /deep/ .el-table {
    width: 100%;
    overflow-x: scroll;
    & td:not(.is-left) {
      text-align: center;
    }
  }

  .inner-toolbar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  /deep/ .pop-sku {
    .toolbar {
      display: none;
    }
    .el-dialog__body {
      .el-table {
        border: 1px solid #e5e5e5;
      }
    }
    .el-table__body-wrapper {
      max-height: 400px;
      overflow-y: scroll;
    }
  }


  .toolbar-search {
    margin-right: 10px;
    width: 20%;
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
      .choose-machine {
        width: 60%;
      }
    }
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }

  /deep/ div.cell {
    overflow:hidden;

    text-overflow:ellipsis;

    display:-webkit-box;

    -webkit-box-orient:vertical;

    -webkit-line-clamp:2;
  }
  /*下架原因*/
  .under-reason {
    color: red;
    cursor: pointer;
  }

</style>
