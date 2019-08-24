<template>
  <div v-loading="loading" class="refund-detail-container">
    <el-card v-if="refund">
      <div slot="header" class="clearfix">
        <span>{{ refund.refuse_type_text }}单</span>
      </div>
      <el-row :gutter="0">
        <el-col :span="4">{{ refund.refuse_type_text }}单号</el-col>
        <el-col :span="8">{{ refund.sn }}</el-col>
        <el-col :span="4">申请时间</el-col>
        <el-col :span="8">{{ refund.create_time | unixToDate }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">{{ refund.refuse_type_text }}原因</el-col>
        <el-col :span="8">{{ refund.refund_reason }}</el-col>
        <el-col :span="4">申请退款金额</el-col>
        <el-col :span="8">{{ refund.refund_price | unitPrice('￥') }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">退款方式</el-col>
        <!-- <el-col :span="8">{{ refund.refund_way === 'ORIGINAL' ? '原路退回' : (refund.account_type_text || '无') }}</el-col> -->
        <el-col :span="8">{{refund.account_type_text || '无' }}</el-col>
        <el-col :span="4">售后状态</el-col>
        <el-col :span="8">
          {{ refund.refund_status_text || '无' }}
          <el-button type="primary" v-if="refund.refund_status === 'REFUSE'" size="mini" @click="editRefundStatus(1)" class="refund-btn">调整售后状态为“通过”</el-button>
          <el-button type="danger" v-if="refund.refund_status === 'PASS'" size="mini" @click="editRefundStatus(0)" class="refund-btn">调整售后状态为“拒绝”</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">购买人手机号</el-col>
        <!-- <el-col :span="8">{{ refund.refund_way === 'ORIGINAL' ? '原路退回' : (refund.account_type_text || '无') }}</el-col> -->
        <el-col :span="8">{{ paramsA.user_mobile || '无' }}</el-col>
        <el-col :span="4">收货人姓名</el-col>
        <el-col :span="8">{{ paramsA.ship_name || '无' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">收货人手机</el-col>
        <!-- <el-col :span="8">{{ refund.refund_way === 'ORIGINAL' ? '原路退回' : (refund.account_type_text || '无') }}</el-col> -->
        <el-col :span="8">{{ paramsA.ship_mobile || '无' }}</el-col>
        <el-col :span="4">收货地址</el-col>
        <el-col :span="8">{{ paramsA.ship_address || '无' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">支付方式交易号</el-col>
        <el-col :span="8">{{ refund.pay_order_no || '无' }}</el-col>
      </el-row>
      <template v-if="refund.account_type === 'BANKTRANSFER'">
        <el-row :gutter="0">
          <el-col :span="4">银行名称</el-col>
          <el-col :span="20">{{ refund.bank_name }}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">银行开户行</el-col>
          <el-col :span="20">{{ refund.bank_deposit_name }}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">银行开户名</el-col>
          <el-col :span="20">{{ refund.bank_account_name }}</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4">银行账号</el-col>
          <el-col :span="20">{{ refund.bank_account_number }}</el-col>
        </el-row>
      </template>
      <el-row v-else :gutter="0">
        <el-col :span="4">退款账户</el-col>
        <el-col :span="20">{{ refund.return_account || '无' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">客户备注</el-col>
        <el-col :span="20">{{ refund.customer_remark || '&nbsp;' }}</el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">退回C米</el-col>
        <el-col :span="20">
          <el-input placeholder="请输入内容" size="small" v-model="refund_cm_point" style="width: 150px;"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">审核操作</el-col>
        <el-col :span="20">
          <el-input placeholder="请输入内容" size="small" v-model="refundPrice" style="width: 150px;">
            <template slot="prepend">￥</template>
          </el-input>
          <el-button v-if="refund.after_sale_operate_allowable.allow_admin_refund" @click="handleRefundMoney" class="refund-btn">退款</el-button>
          <p v-if="refund.payment_type === 'COD'" class="refund-tip">货到付款订单只能由商家退款</p>
        </el-col>
      </el-row>
      <!--商品信息-->
        <en-table-layout :tableData="refundDatas1" class="pop-table">
          <template slot="table-columns">
            <el-table-column  prop="exp_name" label="商品图片">
              <template slot-scope="scope">
                <img :src="scope.row.goods_image" alt="" width="70">
              </template>
            </el-table-column>
            <el-table-column  prop="goods_name" label="商品名称"/>
            <el-table-column  prop="price" label="单价"/>
            <el-table-column  prop="ship_num" label="购买数量"/>
            <el-table-column  prop="return_num" label="退货数量"/>
            <el-table-column label="小计">
              <template slot-scope="scope">
                <span>{{ scope.row.price * scope.row.ship_num }}</span>
              </template>
            </el-table-column>
          </template>
        </en-table-layout>
      <!--退货信息-->
        <en-table-layout :tableData="refundDatas" class="pop-table">
          <template slot="table-columns">
            <el-table-column  prop="exp_name" label="物流公司"/>
            <el-table-column label="物流单号">
              <template slot-scope="scope">
                <span @click="looklogistics(scope.row)">{{ scope.row.ship_no }}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="contact" label="联系人"/>
            <el-table-column  prop="mobile" label="电话号码"/>
          </template>
        </en-table-layout>
    </el-card>
    <!--查看物流信息-->
    <el-dialog :visible.sync="logisticsShow" width="800px" align="center">
      <div slot="title">
        <h3 style="margin: 10px 0;">物流信息</h3>
        <div class="logistics-base">
          <span>物流公司：{{ name }}</span>&nbsp;&nbsp;&nbsp;
          <span>快递单号：{{ courier_num }}</span>
        </div>
      </div>
      <div class="logistics-info">
        <div v-if="logisticsInfoList">
          <el-steps direction="vertical" :active="1" align-center space="100px">
            <el-step
              v-for="(row, index) in logisticsInfoList"
              :title="row.time"
              :key="index"
              :status="index === 0 ? 'success' : 'wait'"
              :description="row.status"/>
          </el-steps>
        </div>
        <div v-else>暂无物流信息，请您耐心等待！</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Refund from '@/api/refund'
  import * as API_order from '@/api/order'
  export default {
    name: 'refundDetail',
    data() {
      return {
        paramsA:'',
        name:'',
        courier_num:'',
        /** 发货物流信息 */
        logisticsInfoList: [],
        logisticsShow:false,
        /** 列表loading状态 */
        loading: false,
        // 退款（货）单详情
        refund: '',
        /** 订单sn */
        sn: this.$route.params.sn,
        /** 商品 */
        goods: '',
        /** 审核退款金额 */
        refundPrice: 0,
        /** 退回C米数量 */
        refund_cm_point:0,
        refundDatas: [],
        refundDatas1: [],
        /** 订单详情数据 */
        orderDetail: null,
      }
    },
    mounted() {
      this.GET_RefundDetail()
    },
    beforeRouteUpdate(to, from, next) {
      this.sn = to.params.sn
      next()
    },
    activated() {
      this.sn = this.$route.params.sn
    },
    watch: {
      sn: 'GET_RefundDetail'
    },
    methods: {
      /** 退款操作 */
      handleRefundMoney() {
        this.$prompt('请输入退款备注！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请填写退款备注！'
        }).then(({ value }) => {
          API_Refund.refundMoney(this.sn, {
            refund_price: this.refundPrice,
            remark: value,
            refund_cm_point: this.refund_cm_point
          }).then(response => {
            this.$message.success('操作成功！')
            this.$route.params.callback()
            this.GET_RefundDetail()
          })
        }).catch(() => {})
      },

      /** 平台调整售后状态 */
      editRefundStatus(agree) {
        const _tip = agree === 1 ? '卖家同意退款' : '卖家拒绝退款'
        this.$prompt('是否确定调整售后状态为"'+_tip+'"，该操作将不可回滚！', '确认信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
           if(value === '' || value === null ){
               this.$message.error('请填写调整原因！')
               return;
           }

           const _params = {
               agree: agree,
               remark: value,
           }

           API_Refund.editRefundStatus(this.sn, _params.agree, _params).then(() => {
                 this.$message.success('操作成功！')
                 this.$route.params.callback()
                 this.GET_RefundDetail()
             }).catch(() => {
                console.log("失败");
             })
        }).catch((e) => {
          console.log(e)
        })
      },

      /** 查看物流信息*/
      looklogistics(row) {
        this.logisticsShow = false
        const _params = {
          id: row.id,
          num: row.ship_no
        }
        this.loading = true
        API_order.getLogisticsInfo(_params).then(response => {
          this.logisticsShow = true
          this.loading = false
          this.logisticsInfoList = response.data
          this.name = response.name
          this.courier_num = response.courier_num
        })
      },
      /** 获取售后订单详情 */
      GET_RefundDetail() {
        this.loading = true
        API_Refund.getRefundDetail(this.sn).then(response => {
          this.loading = false
          this.refund = response.refund
          this.paramsA = response
          if (response.refund) {
            this.refundDatas[0] = response.refund
          }
          if (response.refund_goods) {
            this.refundDatas1 = response.refund_goods
          }
          this.goods = response.goods
          this.refundPrice = JSON.parse(JSON.stringify(response.refund.refund_price))
          this.refund_cm_point = JSON.parse(JSON.stringify(response.refund.refund_cm_point))
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .refund-detail-container {
    padding: 10px;
    background-color: #fff;
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
</style>

