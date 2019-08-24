<template>
  <div>
    <en-table-layout
      :tableData="tableData.data"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
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
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="序号">
                  <el-input size="medium" v-model="advancedForm.ship_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="服务单号">
                  <el-input size="medium" v-model="advancedForm.goods_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="下单时间">
                  <el-input size="medium" v-model="advancedForm.buyer_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="完成时间">
                  <el-input size="medium" v-model="advancedForm.buyer_mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="店铺名称">
                  <el-input size="medium" v-model="advancedForm.buyer_mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="服务已付金额">
                  <el-input size="medium" v-model="advancedForm.buyer_mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="预约人">
                  <el-input size="medium" v-model="advancedForm.buyer_mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="服务状态">
                  <el-input size="medium" v-model="advancedForm.buyer_mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="付款方式">
                  <el-input size="medium" v-model="advancedForm.buyer_mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="退款状态">
                  <el-input size="medium" v-model="advancedForm.buyer_mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="支付方式">
                  <el-input size="medium" v-model="advancedForm.buyer_mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="订单来源">
                  <el-input size="medium" v-model="advancedForm.buyer_mobile" clearable></el-input>
                </el-form-item>
                <!-- <el-form-item label="选择店铺">
                  <en-shop-picker @changed="(shop) => { advancedForm.seller_id = shop.shop_id }"/>
                </el-form-item>
                <el-form-item label="下单日期">
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
                <el-form-item label="订单状态">
                  <el-select v-model="advancedForm.order_status" placeholder="请选择" clearable>
                    <el-option label="待付款" value="CONFIRM"/>
                    <el-option label="已付款" value="PAID_OFF"/>
                    <el-option label="已发货" value="SHIPPED"/>
                    <el-option label="已收货" value="ROG"/>
                    <el-option label="已完成" value="COMPLETE"/>
                    <el-option label="已取消" value="CANCELLED"/>
                    <el-option label="已删除" value="DELETEED"/>
                    <el-option label="交易关闭" value="TRADE_CLOSE"/>
                    <el-option label="出库失败" value="INTODB_ERROR"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="售后状态">
                  <el-select v-model="advancedForm.service_status" placeholder="请选择" clearable>
                    <el-option label="未申请" value="NOT_APPLY"/>
                    <el-option label="已申请" value="APPLY"/>
                    <el-option label="审核通过" value="PASS"/>
                    <el-option label="审核未通过" value="REFUSE"/>
                    <el-option label="已失效不允许申请售后" value="EXPIRED"/>
                  </el-select>
                </el-form-item> -->
                <!-- 订单类型 梦想官活动选项 -->
                <!-- <el-form-item label="订单类型">
                  <el-select v-model="advancedForm.is_activity" placeholder="请选择" clearable>
                    <el-option label="商城订单" value="0"/>
                    <el-option label="梦想官活动订单" value="1"/>
                  </el-select>
                </el-form-item> -->
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
      <template slot="table-columns">
        <!--序号-->
        <el-table-column prop="id" label="序号"/>
        <!--服务单号-->
        <el-table-column prop="order_no" label="服务单号"/>
        <!--下单时间-->
        <el-table-column prop="create_time" :formatter="MixinUnixToDate" label="下单时间"/>
        <!--完成时间-->
        <el-table-column prop="update_time" :formatter="MixinUnixToDate" label="完成时间"/>
        <!--店铺名称-->
        <el-table-column prop="shop_name" label="店铺名称"/>
        <!--服务已付金额-->
        <el-table-column label="服务已付金额">
          <template slot-scope="scope">{{ scope.row.paid_money | unitPrice('￥') }}</template>
        </el-table-column>
        <!--预约人-->
        <el-table-column prop="reserve_user_name" label="预约人"/>
        <!--商品数量-->
        <!-- <el-table-column prop="goods_num" label="商品数量"/> -->
        <!--订单状态-->
        <el-table-column label="服务状态">
        <template slot-scope="scope">
          {{ scope.row.status == 0 ? '删除' : ( scope.row.status == 1 ? '代付款' : (scope.row.status == 2 ? '已预约' : (scope.row.status == 3 ? '已完成' : (scope.row.status == 4 ? '已取消' : (scope.row.status == 5 ? '申请退款' : '')))))}}
          </template>
        </el-table-column>
        <!--付款方式-->
        <el-table-column label="付款方式">
        <template slot-scope="scope">
          {{ scope.row.trade_type == 1 ? '预付款' : ( scope.row.trade_type == 2 ? '全款' : '')}}
          </template>
        </el-table-column>
        <!--发货状态-->
        <!-- <el-table-column prop="ship_status_text" label="发货状态"/> -->
        <!--售后状态-->
        <el-table-column prop="service_status" label="退款状态"/>
        <!--付款方式-->
        <el-table-column label="支付方式">
          <template slot-scope="scope">
            {{ scope.row.payment_method == 0 ? '' : ( scope.row.payment_method == 1 ? '微信' : '')}}
            </template>
        </el-table-column>
        <!--订单来源-->
        <el-table-column prop="resource" label="订单来源"/>
        <!--订单类型-->
        <!-- <el-table-column label="订单类型">
          <template slot-scope="scope">
            <span v-if="scope.row.is_activity == 0"> 商城订单</span>
            <span v-else-if="scope.row.is_activity == 1"> 梦想官活动订单</span>
          </template>
        </el-table-column> -->
        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.order_status !== 'COMPLETE' && scope.row.order_status !== 'TRADE_CLOSE' && scope.row.order_status !== 'DELETEED' && scope.row.order_status !== 'CANCELLED'"
              size="mini"
              type="primary"
              @click="handleOperateOrder(scope.$index, scope.row)">查看</el-button>
            <!-- <el-button
              v-else
              size="mini"
              @click="handleOperateOrder(scope.$index, scope.row)">查看</el-button> -->
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
  </div>
</template>

<script>
  import * as API_appointment from '@/api/appointment'
  import { Foundation } from '~/ui-utils'

  export default {
    name: 'orderList',
    data() {
      return {
        searchData:'',
        // 列表loading状态
        loading: false,
        // 列表参数
        params: {
          page_no: 1,
          page_size: 10
        },
        // 列表数据
        tableData: '',
        // 高级搜索数据
        advancedForm: {}
      }
    },
    filters: {
      paymentTypeFilter(val) {
        return val === 'ONLINE' ? '在线支付' : '货到付款'
      }
    },
    mounted() {
      this.GET_OrderList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_OrderList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_OrderList()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.$router.push({
          name: 'appointmentDetails',
          params: {
            sn: data,
            callback: this.GET_OrderList
          }
        })
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent(data) {
        this.params = {
          ...this.params,
          ...this.advancedForm,
          order_sn: data
        }
        delete this.params.start_time
        delete this.params.end_time
        if (this.advancedForm.order_time_range) {
          this.params.start_time = this.advancedForm.order_time_range[0]
          this.params.end_time = this.advancedForm.order_time_range[1]
        }
        // delete this.params.order_sn
        delete this.params.order_time_range
        this.params.page_no = 1
        this.GET_OrderList()
      },

      /** 查看、操作订单 */
      handleOperateOrder(index, row) {
        this.$router.push({
          name: 'appointmentDetails',
          params: {
            sn: row.order_no,
            callback: this.GET_OrderList
          }
        })
      },

      /** 获取预约列表 */
      GET_OrderList() {
        this.loading = true
        const params = this.MixinClone(this.params)
        if (params.start_time && params.end_time) {
          params.start_time = parseInt(params.start_time / 1000)
          params.end_time = parseInt(params.end_time / 1000)
        }
        if (params.seller_id === 0) delete params.seller_id
        API_appointment.getOrderList(params).then(response => {
          console.log(response.data)
          this.loading = false
          for(let i = 0;i<response.data.length;i++){
            response.data[i].orderNo = i+1
          }
          this.tableData = response
        }).catch(() => { this.loading = false })
      },

      /** 订单导出 */
      handleExportRefund() {
          let params = this.MixinClone(this.params)
          if (params.seller_id === 0) delete params.seller_id
          // delete params.page_no
          // delete params.page_size
          API_appointment.getOrderList(params).then(response => {
            if(!response.data){
              this.$message.error(response.message)
            }else{
              debugger
              const json = {
                sheet_name: '预约列表',
                sheet_values: response.data.map(item => ({
                  '序号': item.id,
                  '服务编号': item.order_no,
                  '下单时间': item.create_time ? Foundation.unixToDate(item.create_time) : '',
                  '完成时间': item.update_time ? Foundation.unixToDate(item.update_time) : '',
                  '店铺名称': item.shop_name,
                  '服务已付金额': item.paid_money,
                  '预约人':item.reserve_user_name,
                  '服务状态': item.status == 0 ? '删除' : ( item.status == 1 ? '代付款' : (item.status == 2 ? '已预约' : (item.status == 3 ? '已完成' : (item.status == 4 ? '已取消' : (item.status == 5 ? '申请退款' : ''))))),
                  '付款方式': item.trade_type == 1 ? '预付款' : ( item.trade_type == 2 ? '全款' : ''),
                  '退款状态':item.service_status,
                  '支付方式': item.payment_method == 0 ? '' : ( item.payment_method == 1 ? '微信' : ''),
                  '订单来源': item.resource,
                }))
              }
              this.MixinExportJosnToExcel(json, '预约列表')
              console.log('11111111111111dsad')
            }
          })
        // }

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
    padding: 0 20px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }
</style>

