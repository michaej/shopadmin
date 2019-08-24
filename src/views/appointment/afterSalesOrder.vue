<template>
  <en-table-layout
    :tableData="tableData.data"
    :loading="loading"
  >
    <div slot="toolbar" class="inner-toolbar">
      <div class="toolbar-btns">
        <el-date-picker
          v-model="exportDateRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          :picker-options="{ disabledDate(time) { return time.getTime() > Date.now() }, shortcuts: MixinPickerShortcuts }">
        </el-date-picker>
        <el-button size="mini" type="primary" icon="el-icon-download" @click="handleExportRefund" style="margin-left: 5px">导出Excel</el-button>
      </div>
      <div class="toolbar-search">
        <en-table-search
          @search="searchEvent"
          @advancedSearch="advancedSearchEvent"
          advanced
          advancedWidth="465"
          placeholder="请输入订单编号"
        >
          <template slot="advanced-content">
            <el-form ref="advancedForm" :model="advancedForm" label-width="110px">
              <el-form-item label="售后单号">
                <el-input size="medium" v-model="advancedForm.sn" clearable></el-input>
              </el-form-item>
              <el-form-item label="店铺名称">
                <el-input size="medium" v-model="advancedForm.seller_name" clearable></el-input>
              </el-form-item>
              <el-form-item label="申请售后类型">
                <el-select v-model="advancedForm.refund_type" placeholder="请选择" clearable>
                  <el-option label="取消订单" value="CANCEL_ORDER"/>
                  <el-option label="申请售后" value="AFTER_SALE"/>
                </el-select>
              </el-form-item>
              <el-form-item label="退款（货）类型">
                <el-select v-model="advancedForm.refuse_type" placeholder="请选择" clearable>
                  <el-option label="退款" value="RETURN_MONEY"/>
                  <el-option label="退货" value="RETURN_GOODS"/>
                </el-select>
              </el-form-item>
              <el-form-item label="申请时间">
                <el-date-picker
                  v-model="advancedForm.refund_time_range"
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
              <el-form-item label="售后状态">
                <el-select v-model="advancedForm.refund_status" placeholder="请选择" clearable>
                  <el-option label="等待卖家确认" value="APPLY"/>
                  <el-option label="卖家同意退款" value="PASS"/>
                  <el-option label="卖家拒绝退款" value="REFUSE"/>
                  <el-option label="退货入库" value="STOCK_IN"/>
                  <el-option label="待平台处理" value="WAIT_FOR_MANUAL"/>
                  <el-option label="取消申请" value="CANCEL"/>
                  <el-option label="退款中" value="REFUNDING"/>
                  <el-option label="退款失败" value="REFUNDFAIL"/>
                  <el-option label="完成" value="COMPLETED"/>
                </el-select>
              </el-form-item>
              <!-- 订单类型 梦想官活动选项 -->
              <el-form-item label="订单类型">
                <el-select v-model="advancedForm.is_activity" placeholder="请选择" clearable>
                  <el-option label="商城订单" value="0"/>
                  <el-option label="梦想官活动订单" value="1"/>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="订单类型">
                <el-select v-model="advancedForm.order_type" placeholder="请选择" clearable>
                  <el-option label="商城订单" value="NOT_APPLY"/>
                  <el-option label="梦想官活动订单" value="APPLY"/>
                </el-select>
              </el-form-item> -->
            </el-form>
          </template>
        </en-table-search>
      </div>
    </div>
    <template slot="table-columns">
      <!--退款ID-->
      <el-table-column prop="seller_id" label="售后ID"/>
      <!--售后单号-->
      <el-table-column prop="order_no" label="退单编号"/>
      <!--店铺名称-->
      <el-table-column prop="shop_name" label="店铺名称"/>
      <!--申请售后类型-->
      <!-- <el-table-column prop="refuse_type_text" label="申请售后类型"/> -->
      <!--售后状态-->
      <el-table-column label="售后状态">
        <template slot-scope="scope">
          {{ scope.row.status == 2 ? '待退款' : (scope.row.status == 4 ? '退款完成' : '')}}
          </template>
      </el-table-column>
      <!--创建时间-->
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.create_time | unixToDate }}</template>
      </el-table-column>
      <!--申请金额-->
      <el-table-column label="申请金额">
        <template slot-scope="scope">{{ scope.row.paid_money | unitPrice('￥') }}</template>
      </el-table-column>
      <!--操作-->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleOperateRefund(scope.$index, scope.row)">操作</el-button>
        </template>
      </el-table-column>
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
</template>

<script>
  import * as API_refund from '@/api/refund'
  import { Foundation } from '~/ui-utils'

  export default {
    name: 'refundList',
    mounted() {
      this.GET_RefundOrder()
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 列表数据 */
        tableData: '',

        /** 高级搜索数据 */
        advancedForm: {},

        /** 导出Excel日期 */
        exportDateRange: []
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_RefundOrder()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_RefundOrder()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          order_sn: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_RefundOrder()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.start_time
        delete this.params.end_time
        const { refund_time_range } = this.advancedForm
        if (refund_time_range) {
          this.params.start_time = parseInt(refund_time_range[0] / 1000)
          this.params.end_time = parseInt(refund_time_range[1] / 1000)
        }
        delete this.params.refund_time_range
        this.GET_RefundOrder()
      },

      /** 操作订单 */
      handleOperateRefund(index, row) {
        this.$router.push({ path: `/appointment/refund/${row.order_no}` })
        this.$router.push({
          name: 'afterTheDetails',
          params: {
            order_no: row.order_no,
            callback: this.GET_RefundOrder
          }
        })
      },

      /** 导出退款单 */
      handleExportRefund() {
        const range = this.MixinClone(this.exportDateRange)
        if (!range || range.length === 0) {
          this.$message.error('请选择要导出的时间段！')
          return false
        }
        const start_time = parseInt(range[0] / 1000)
        const end_time = parseInt(range[1] / 1000)
        API_refund.exportRefundExcel({ start_time, end_time }).then(response => {
          const json = {
            sheet_name: '退款单',
            sheet_values: response.map(item => ({
              '退款单ID': item.id,
              '退款流水号': item.sn,
              '退款相关订单号': item.order_sn,
              '退款方式': item.refund_way,
              '店铺名称': item.seller_name,
              '收款人': item.member_name,
              '退款状态': item.refund_status,
              '创建时间': item.create_time ? Foundation.unixToDate(item.create_time) : '',
              '退款金额': Foundation.formatPrice(item.refund_price),
              '退款时间': item.refund_time ? Foundation.unixToDate(item.refund_time) : ''
            }))
          }
          this.MixinExportJosnToExcel(json, '退款单')
        })
      },

      /** 获取退款单列表数据 */
      GET_RefundOrder() {
        this.loading = true
        API_refund.getRefundLists(this.params).then(response => {
          this.loading = false
          this.tableData = response
          // 修改售后状态
          for(var i = 0;i<this.tableData.data.length;i++){
            if(this.tableData.data[i].refund_status == 'WAIT_FOR_MANUAL'){
              this.tableData.data[i].refund_status_text = '待平台处理'
            }

            if(this.tableData.data[i].refund_status == 'REFUNDING'){
              this.tableData.data[i].refund_status_text = '退款中'
            }
            
          }
        }).catch(() => { this.loading = false })
      }
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
    padding: 0 20px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }
</style>
