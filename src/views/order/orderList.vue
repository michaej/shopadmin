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
                <el-form-item label="收货人">
                  <el-input size="medium" v-model="advancedForm.ship_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                  <el-input size="medium" v-model="advancedForm.goods_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="买家名字">
                  <el-input size="medium" v-model="advancedForm.buyer_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="买家手机号">
                  <el-input size="medium" v-model="advancedForm.buyer_mobile" clearable></el-input>
                </el-form-item>
                <el-form-item label="选择店铺">
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
                </el-form-item>
                <!-- 订单类型 梦想官活动选项 -->
                <el-form-item label="订单类型">
                  <el-select v-model="advancedForm.is_activity" placeholder="请选择" clearable>
                    <el-option label="商城订单" value="0"/>
                    <el-option label="梦想官活动订单" value="1"/>
                  </el-select>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
      <template slot="table-columns">
        <!--订单序号-->
        <el-table-column prop="orderNo" label="订单序号"/>
        <!--订单编号-->
        <el-table-column prop="sn" label="订单编号"/>
        <!--下单时间-->
        <el-table-column prop="create_time" :formatter="MixinUnixToDate" label="下单时间"/>
        <!--付款时间-->
        <el-table-column prop="payment_time" :formatter="MixinUnixToDate" label="付款时间"/>
        <!--店铺名称-->
        <el-table-column prop="seller_name" label="店铺名称"/>
        <!--订单总额-->
        <el-table-column label="订单总额">
          <template slot-scope="scope">{{ scope.row.order_amount | unitPrice('￥') }}</template>
        </el-table-column>
        <!--收货人-->
        <el-table-column prop="ship_name" label="收货人"/>
        <!--商品数量-->
        <el-table-column prop="goods_num" label="商品数量"/>
        <!--订单状态-->
        <el-table-column prop="order_status_text" label="订单状态"/>
        <!--付款状态-->
        <el-table-column prop="pay_status_text" label="付款状态"/>
        <!--发货状态-->
        <el-table-column prop="ship_status_text" label="发货状态"/>
        <!--售后状态-->
        <el-table-column prop="service_status_text" label="售后状态"/>
        <!--支付方式-->
        <el-table-column label="支付方式">
          <template slot-scope="scope">{{ scope.row.payment_type | paymentTypeFilter }}</template>
        </el-table-column>
        <!--订单来源-->
        <el-table-column prop="client_type" label="订单来源"/>
        <!--订单类型-->
        <el-table-column label="订单类型">
          <template slot-scope="scope">
            <span v-if="scope.row.is_activity == 0"> 商城订单</span>
            <span v-else-if="scope.row.is_activity == 1"> 梦想官活动订单</span>
          </template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.order_status !== 'COMPLETE' && scope.row.order_status !== 'TRADE_CLOSE' && scope.row.order_status !== 'DELETEED' && scope.row.order_status !== 'CANCELLED'"
              size="mini"
              type="primary"
              @click="handleOperateOrder(scope.$index, scope.row)">操作</el-button>
            <el-button
              v-else
              size="mini"
              @click="handleOperateOrder(scope.$index, scope.row)">查看</el-button>
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
  import * as API_order from '@/api/order'
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
        this.params = {
          ...this.params,
          order_sn: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.params.page_no = 1
        this.GET_OrderList()
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
          name: 'orderDetail',
          params: {
            sn: row.sn,
            callback: this.GET_OrderList
          }
        })
      },

      /** 获取订单列表 */
      GET_OrderList() {
        this.loading = true
        const params = this.MixinClone(this.params)
        if (params.start_time && params.end_time) {
          params.start_time = parseInt(params.start_time / 1000)
          params.end_time = parseInt(params.end_time / 1000)
        }
        if (params.seller_id === 0) delete params.seller_id
        API_order.getOrderList(params).then(response => {
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
          delete params.page_no
          delete params.page_size
          API_order.getExport(params).then(response => {
            if(!response.data){
              this.$message.error(response.message)
            }else{
              const json = {
                sheet_name: '订单列表',
                sheet_values: response.data.map(item => ({
                  '交易编号': item.trade_sn,
                  '订单编号': item.sn,
                  '活动订单': item.is_activity == 1 ? '是' : '否',
                  '店铺名称': item.seller_name,
                  '商品名称': item.goods_name,
                  '订单总额': item.order_price,
                  '平台服务费': item.merchant_price,
                  '成本价':item.cost_price,
                  '商品单价':item.goods_price,
                  '成交价':item.purchase_price,
                  '小计':item.subtotal,
                  '下单时间':item.create_time ? Foundation.unixToDate(item.create_time) : '',
                  '付款时间':item.payment_time ? Foundation.unixToDate(item.payment_time) : '',
                  '订单状态': item.order_status_text,
                  '售后状态': item.service_status_text,
                  '配送费用': item.shipping_price,
                  '支付方式': item.payment_method_name,
                  '支付交易号': item.pay_order_no,
                  '收货人姓名': item.ship_name,
                  '收货人电话': item.ship_mobile,
                  // '收货人电话': item.ship_tel || '',
                  '收货地址': item.ship_province + item.ship_city + item.ship_county + item.ship_addr,
                  '省份':item.ship_province,
                  '市':item.ship_city,
                  '区':item.ship_county,
                  '商品编码':item.goods_sn,
                  '货号':item.sku_sn,
                  '商品规格': item.spec_value || '',
                  '数量': item.num,
                  '是否全球购': item.offshore_goods == 1 ? '是' : '否',
                  '身份证': item.idcard ? item.idcard : '',
                  '订单备注': item.remark || '',
                  '平台服务费': item.merchant_price || '',
                  // '退款流水号': item.sn,
                  // '退款相关订单号': item.order_sn,
                  // '退款方式': item.refund_way,
                  // '店铺名称': item.seller_name,
                  // '收款人': item.member_name,
                  // '退款状态': item.refund_status,
                  // '创建时间': item.create_time ? Foundation.unixToDate(item.create_time) : '',
                  // '退款金额': Foundation.formatPrice(item.refund_price),
                  // '退款时间': item.refund_time ? Foundation.unixToDate(item.refund_time) : ''
                }))
              }
              this.MixinExportJosnToExcel(json, '订单列表')
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

