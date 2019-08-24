<template>
  <div class="rowContent">
    <div class="detailN">
      <el-card>
        <div slot="header" class="clearfix">
          <!-- 结算单详细信息&nbsp;&nbsp;<el-button type="primary" @click="getExcel">导出结算单</el-button>&nbsp; -->
          <el-button @click="getAudit" type="primary" v-if="detailData.auditor_status != 1  && detailData.withdraw_status != 0">审核</el-button>
          <!-- <el-button disabled type="info" v-if="detailData.auditor_status == 1">已通过</el-button>
          <el-button disabled type="info" v-if="detailData.auditor_status == 2">已拒绝</el-button><span class="hongse" v-if="detailData.refuse_reason && detailData.auditor_status != 1">原因：{{detailData.refuse_reason}}</span>
          <el-button  style="float:right;" v-if="detailData.auditor_status == 1" type="primary" @click="moneyConfrimAction">出纳审核</el-button>
          <el-button style="float:right;" v-if="(detailData.status !== 'COMPLETE') && (detailData.cashier_audit_status == 1)" type="primary" @click="confrimPayAction">平台确认付款</el-button> -->
        </div>
        <el-row :gutter="0">
          <el-col :span="4">提现编号</el-col>
          <el-col :span="8">{{detailData.draw_sn}}</el-col>
          <!-- <el-col :span="4">起止日期</el-col>
          <el-col :span="8">{{detailData.start_time | unixToDate }} - {{detailData.end_time | unixToDate }}</el-col> -->
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">提现时间</el-col>
          <el-col :span="8">{{detailData.create_time | unixToDate }}</el-col>
          <!-- <el-col :span="4">结算状态</el-col>
          <el-col :span="8">{{ detailData.settlement_status == 0 ? '未出账':'已出账'}}</el-col> -->
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">店铺名称</el-col>
          <el-col :span="20">{{detailData.seller_name}}</el-col>
        </el-row>
        <el-row :gutter="0">
          <!-- <el-col :span="4">银行开户名</el-col>
          <el-col :span="8">{{detailData.bank_account_name }}</el-col> -->
          <el-col :span="4">银行名称</el-col>
          <el-col :span="8">{{detailData.bank_name }}</el-col>
          <!-- <el-col :span="4">银行卡号</el-col>
          <el-col :span="8">{{detailData.bank_account_number }}</el-col> -->
        </el-row>
        <el-row :gutter="0">
          <!-- <el-col :span="4">银行开户名</el-col>
          <el-col :span="8">{{detailData.bank_account_name }}</el-col> -->
          <!-- <el-col :span="4">银行名称</el-col>
          <el-col :span="8">{{detailData.bank_name }}</el-col> -->
          <el-col :span="4">银行卡号</el-col>
          <el-col :span="8">{{detailData.bank_no }}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">持卡人</el-col>
          <el-col :span="8">{{detailData.bank_username }}</el-col>
          <!-- <el-col :span="4">支行联行号</el-col>
          <el-col :span="8">{{detailData.bank_code }}</el-col> -->
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">手机号</el-col>
          <el-col :span="20">{{detailData.bank_user_mobile}}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">提现金额</el-col>
          <el-col :span="20">{{detailData.draw_price | unitPrice('￥')}}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">是否提供发票</el-col>
          <el-col :span="20">{{detailData.provide_receipt == 0 ? "否" : (detailData.provide_receipt == 1 ? "是" : "")}}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">快递公司</el-col>
          <el-col :span="20">{{detailData.exp_name }}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">快递单号</el-col>
          <el-col :span="20">{{detailData.ship_no }}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">实际金额</el-col>
          <el-col :span="20">{{detailData.pay_price | unitPrice('￥')}}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">审核状态</el-col>
          <el-col :span="8">{{ detailData.auditor_status == 0 ? '未审核' : ( detailData.auditor_status == 1 ? '初审通过' : (detailData.auditor_status == 2 ? '初审拒绝' : ''))}}</el-col>
          <!-- <el-col :span="4">货到付款退款金额</el-col>
          <el-col :span="8">{{detailData.cod_refund_price | unitPrice('￥')}}</el-col> -->
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">拒绝原因</el-col>
          <el-col :span="20">{{detailData.refuse_reason}}</el-col>
        </el-row>
        <!-- <el-row :gutter="0">
          <el-col :span="4">平台应付金额</el-col>
          <el-col :span="20"><span class="luse">{{detailData.bill_price | unitPrice('￥')}} = {{detailData.price | unitPrice('￥')}}</span>(在线支付金额) <span class="hongse">-{{detailData.refund_price | unitPrice('￥')}}</span>(在线退款金额) <span class="hongse">-{{detailData.commi_price | unitPrice('￥')}}</span>(平台服务费) <span class="luse">+{{detailData.refund_commi_price | unitPrice('￥')}}</span>(退还佣金) </el-col>
        </el-row> -->

      </el-card>
    </div>
    <!-- 表单数据 -->
    <!-- <div class="detailContent">
      <el-tabs type="border-card" v-model="selectTab">
        <el-tab-pane label="订单列表"></el-tab-pane>
      </el-tabs> -->
      <!-- 数据表格 -->
      <!-- <en-table-layout
        pagination
        :tableData="tableData"
        :loading="loading">
        <template slot="table-columns">
          <el-table-column label="订单编号">
            <template slot-scope="scope">{{ scope.row.order_sn }}</template>
          </el-table-column>
          <el-table-column label="下单时间">
            <template slot-scope="scope">{{ scope.row.order_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
          </el-table-column>
          <el-table-column label="订单金额">
            <template slot-scope="scope">{{ (scope.row.price ? scope.row.price : '0.00') }}元</template>
          </el-table-column>
          <el-table-column label="平台服务费">
            <template slot-scope="scope">{{ (scope.row.commi_price ? scope.row.commi_price : '0.00')}}元</template>
          </el-table-column>
          <el-table-column label="订单类型">
            <template slot-scope="scope">{{ scope.row.item_type == 'REFUND' ? '退款' : '正常'}}</template>
          </el-table-column>
          <el-table-column label="订单状态">
              <template slot-scope="scope">{{ scope.row.order_status_text}}</template>
          </el-table-column>
          <el-table-column label="支付方式">
            <template slot-scope="scope">{{ scope.row.payment_type === 'ONLINE' ? '在线支付' : ( scope.row.payment_type === 'COD' ? '货到付款' : '' )}}</template>
          </el-table-column>
          <el-table-column label="第三方交易号">
            <template slot-scope="scope">{{ scope.row.pay_order_no }}</template>
          </el-table-column>
          <el-table-column label="供货价">
            <template slot-scope="scope">{{ (scope.row.order_cost_price ? scope.row.order_cost_price : '0.00') }}元</template>
          </el-table-column>
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
    </div> -->
    <!-- 审核弹出层 -->
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="350px">
      <div>
        <el-form ref="auditForm" :model="auditForm" >
          <el-form-item prop="withDrawal" label="是否通过：">
            <el-radio-group v-model="auditForm.auditor_status">
              <el-radio label="1">通过</el-radio>
              <el-radio label="2">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="withDrawal" label="说明：" v-if="auditForm.auditor_status == 2">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入拒绝原因"
              v-model="auditForm.refuse_reason">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postAuditData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 出纳审核弹出层 -->
    <el-dialog
      title="出纳审核"
      :visible.sync="cashierdialogVisible"
      width="350px">
      <div>
        <el-form ref="auditForm" :model="auditForm" >
          <el-form-item prop="withDrawal" label="是否通过：">
            <el-radio-group v-model="auditForm.auditor_status">
              <el-radio label="1">通过</el-radio>
              <el-radio label="2">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="withDrawal" label="说明：" v-if="auditForm.auditor_status == 2">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入拒绝原因"
              v-model="auditForm.refuse_reason">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cashierdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="moneyConfrim">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_flowQuery from '@/api/flowQuery'
  import { Foundation } from '~/ui-utils'
  export default {
    name: 'monthlyStatement',
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

        /** 账单Id */
        billId:'',

        /** 详情数据 */
        detailData:{},

        /** tab类型 */
        selectTab:'0',

        /** tab查找类型 */
        tabType:'PAYMENT',

        /** 弹出层状态 */
        dialogVisible: false,

        /** 出纳审核 弹出层状态 */
        cashierdialogVisible: false,

        /** 审核表单数据 */
        auditForm:{
          auditor_status:'1'
        },

      }
    },
    watch:{
      selectTab(val){
        if(val == 0){
          this.tabType = 'PAYMENT'
        }
        if(val == 1){
          this.tabType = 'REFUND'
        }
        this.getMonthlyDetailList()
      }
    },
    mounted() {
      console.log('03',this.$route.params.bill_id)
      this.billId = this.$route.params.bill_id
      this.getMonthlyDetail()
      this.getMonthlyDetailList()
      console.log('001',this.detailData)

    },
    activated() {
      this.billId = this.$route.params.bill_id
      this.getMonthlyDetail()
      this.getMonthlyDetailList()
    },
    beforeRouteUpdate(to, from, next) {
      this.billId = this.$route.params.bill_id
      this.getMonthlyDetail()
      this.getMonthlyDetailList()
      next()
    },
    methods: {
      moneyConfrimAction(){
        this.getCashierAudit()
      },
      confrimPayAction(){
        API_flowQuery.payAudit(this.billId).then(response => {
          if(response.code == 0){
            this.$message.success(response.message)
          }else{
             this.$message.error(response.message);
          }
        }).catch(error => {
          this.$message.error(error);
        })
      },
      moneyConfrim(){
        let params = {
          refuse_reason : this.auditForm.refuse_reason
        }
        if(this.auditForm.auditor_status == 1){
          params = {}
        }
        API_flowQuery.moneyAudit(this.billId,this.auditForm.auditor_status,params).then(response => {
          console.log(response)
          if(response.code == 0){
            this.cashierdialogVisible = false
            this.$message.success(response.message)
            this.getMonthlyDetail()
          }else{
            this.cashierdialogVisible = false
            this.$message.error(response.message)
          }
        })
      },
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.getMonthlyDetailList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.getMonthlyDetailList()
      },

      /** 请求账单详情 */
      getMonthlyDetail(){
        console.log('02',this.billId)
        API_flowQuery.getMonthlyDetail(this.billId).then(response => {
          console.log(response)
          this.detailData = response.data

        }).catch(error => {
          this.$message.error(error);
        })
      },

      /** 请求指定类型账单列表 */
      getMonthlyDetailList(){
        this.params = {
          ...this.params,
          bill_id : this.billId
        }
        API_flowQuery.getFlowQueryList(this.params).then(response => {
          console.log(response)
          this.tableData = response.data.data
          this.pageData = {
            page_no: response.data.page_no,
            page_size: response.data.page_size,
            data_total: response.data.data_total
          }
        })
      },

      /** 查看流水详情 */
      handleFlow(row){
        this.$router.push({ path: `/order/detail/${row.order_sn}` })
      },

      /** 导出账单详细信息 */
      getExcel(){
        API_flowQuery.getMonthlyExport(this.billId).then(response => {
          console.log(response)

          if(response.order_detail_list.length != 0){
            let jsonData = response.order_detail_list
            const json = {
              sheet_name: '订单列表',
              sheet_values: jsonData.map(item => ({
                '店铺名称': item.seller_name,
                '会员名称': item.member_name,
                '订单编号': item.order_sn,
                '下单时间': item.order_time ? Foundation.unixToDate(item.order_time) : '',
                '订单金额(元)': item.price,
                '平台服务费(元)': item.commi_price,
                '订单类型': item.item_type == 'REFUND' ? '退款' : '正常',
                '第三方交易号': item.pay_order_no,
                // '供货价': item.order_cost_price,  
                '商品名称':item.goods_name,            
                '购买时的成交价':item.purchase_price,
                '商品原价':item.original_price,
                '商品成本价':item.cost_price,
                '订单状态': item.order_status_text
              }))
            }
            this.MixinExportJosnToExcel(json, '订单列表')
          }

          // 账单详情
          if(response.bill){
            let jsonData = []
            jsonData[0] = response.bill
            const json = {
              sheet_name: '账单详情',
              sheet_values: jsonData.map(item => ({
                '结算单号': item.bill_sn,
                '结算开始时间': item.start_time ? Foundation.unixToDate(item.start_time) : '',
                '结算结束时间': item.end_time ? Foundation.unixToDate(item.end_time) : '',
                '出账日期': item.create_time ? Foundation.unixToDate(item.create_time) : '',
                '结算状态': item.auditor_status == 0 ? '未审核' : ( item.auditor_status == 1 ? '审核通过' : (item.auditor_status == 2 ? '审核拒绝' : '')),
                '店铺名称': item.shop_name,
                '银行开户名': item.bank_account_name,
                '公司银行账号': item.bank_account_number,
                '开户银行支行名称': item.bank_name,
                '支行联行号': item.bank_code,
                '银行地址': item.bank_address,
                '货到付款金额': item.cod_price,
                '平台应付金额': item.bill_price,
                '在线支付金额': item.price,
                '在线退款金额': item.refund_price,
                '分店分成': item.commi_price,
                '退还佣金': item.refund_commi_price,
                '分销佣金': item.distribution_rebate,
                '退还分销佣金': item.distribution_return_rebate,
              }))
            }
            this.MixinExportJosnToExcel(json, '账单详情')
          }


        })
      },

      // 点击出纳审核
      getCashierAudit(){
        this.cashierdialogVisible = true
        this.auditForm = {
          auditor_status:'1'
        }
      },

      // 点击审核
      getAudit(){
        this.dialogVisible = true
        this.auditForm = {
          auditor_status:'1'
        }
      },
      // 点击确定审核发送审核内容
      postAuditData(){
        console.log(this.auditForm)
        let params = {
          refuse_reason : this.auditForm.refuse_reason,
          id : this.billId,
          auditor_status : this.auditForm.auditor_status
        }
        if(this.auditForm.auditor_status == 1){
          params = {
            id : this.billId,
            auditor_status : this.auditForm.auditor_status
          }
        }
        API_flowQuery.enterAudit(params).then(response => {
          console.log(response)
          if(response.code == 0){
            this.dialogVisible = false
            this.$message.success(response.message)
            this.getMonthlyDetail()
          }else{
            this.dialogVisible = false
            this.$message.error(response.message)
          }
        })
      }

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ div.toolbar {
    height: 70px;
    padding: 20px 0;
  }

  /deep/ .span-right{
    text-align: right;
  }

  /deep/ .elrow.elrow1{
    font-size: 16px;
    margin-top:0;
  }

  /deep/ .elrow{
    margin: 15px 0;
    font-size: 14px
  }

  /deep/ .font-w{
    font-size: bold;
  }

  .rowContent{
    background: #F9FAFC;
    padding: 10px;

    .detailContent{
      width: 100%;
      margin-top: 15px;

      /deep/ .toolbar{
        display: none;
      }
      /deep/ .el-tabs__content{
        display: none;
        border-bottom:none;
      }
      /deep/ .el-tabs__content{
        border-bottom:none;
      }
      .el-tabs--border-card{
        border-bottom:none;
      }
      /deep/ .container{
        border:1px solid #dcdfe6;
        border-top:none;
      }
    }
  }

  .el-row {
    border-bottom: 1px solid #ebeef5;
    position: relative;
  }

  .el-col {
    padding: 10px;
    position: relative;
    &:not(:first-child)::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 100%;
      background-color: #ebeef5;
    }
  }
  /deep/ .el-card__body {
    margin: 10px;
    padding: 0;
    border: 1px solid #ebeef5;
    border-bottom: 0;
  }
  .refund-btn {
    position: relative;
    top: -1px;
    margin-left: 5px;
  }
  .refund-tip {
    color: red;
    font-size: 12px;
    margin: 5px 0 0 0;
    padding: 0;
  }
  .luse{
    color:green;
    font-weight: bold;
  }
  .hongse{
    color:red;
    font-weight: bold;
  }

  /deep/.el-dialog__body{
    padding: 10px 20px;
  }
</style>
