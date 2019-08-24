<template>
  <div>
    <en-table-layout
      toolbar
      pagination
      :tableData="tableData.data"
      :height="600"
      @selection-change="handleSelectionChange"
      :loading="loading">
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <!-- 日期选择 -->
          <span class="spanLabel">查询日期：</span>
          <el-date-picker
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
          <span class="spanLabel">店铺名称：</span>
          <el-input style="width:150px" v-model='params.shop_name' placeholder="输入店铺名称"></el-input>
          &nbsp;&nbsp;
          <!-- 结算编号 -->
          <!-- <span class="spanLabel">结算编号：</span>
          <el-input v-model="params.bill_sn" style="width:150px;" placeholder="输入结算编号"></el-input>
          &nbsp;&nbsp; -->
          <!--初审状态-->
          <!-- <span class="spanLabel">初审状态：</span> -->
          <div class="conditions">
            <!-- <span class="spanLabel">初审状态：</span>
            <el-select
              class="choose-machine"
              v-model="params.auditor_status"
              placeholder="请选择初审状态"
              @change="changeGoodsStatus"
              clearable>
              <el-option
                v-for="item in goodsStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select> -->
          <!--终审状态-->
          &nbsp;&nbsp;
            <span class="spanLabel">终审状态：</span>
            <el-select
              class="choose-machine"
              v-model="params.cashier_audit_status"
              placeholder="请选择终审状态"
              @change="changeGoodsStatus0"
              clearable>
              <el-option
                v-for="item in goodsStatusList0"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
            &nbsp;&nbsp;
            <el-button type="primary" @click="GET_auditList">查询</el-button>
            <el-button type="primary" @click="handleExport">导出</el-button>
            <el-button type="primary" @click="allAudit">批量审核</el-button>
          </div>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="提现编号">
          <template slot-scope="scope">{{ scope.row.draw_sn }}</template>
        </el-table-column>
        <el-table-column label="店铺名称">
          <template slot-scope="scope">{{ scope.row.seller_name }}</template>
        </el-table-column>
        <el-table-column label="提现金额">
          <template slot-scope="scope">{{ scope.row.draw_price | unitPrice('￥')}}</template>
        </el-table-column>
        <!-- <el-table-column label="平台服务费">
          <template slot-scope="scope">{{ scope.row.commi_price | unitPrice('￥')}}</template>
        </el-table-column>
        <el-table-column label="退单金额">
          <template slot-scope="scope">{{ scope.row.total_refund_price | unitPrice('￥')}}</template>
        </el-table-column>
        <el-table-column label="退还佣金">
          <template slot-scope="scope">{{ scope.row.refund_commi_price | unitPrice('￥')}}</template>
        </el-table-column>
        <el-table-column label="本期应结">
          <template slot-scope="scope">{{ scope.row.bill_price | unitPrice('￥')}}</template>
        </el-table-column>
        <el-table-column label="账单状态">
          <template slot-scope="scope">{{ scope.row.settlement_status == 0 ? '未出帐' : ( scope.row.settlement_status == 1 ? '已出帐' : '')}}</template>
        </el-table-column> -->
        <el-table-column label="银行名称">
          <template slot-scope="scope">{{ scope.row.bank_name }}</template>
        </el-table-column>
        <el-table-column label="银行卡号">
          <template slot-scope="scope">{{ scope.row.bank_no }}</template>
        </el-table-column>
        <el-table-column label="持卡人">
          <template slot-scope="scope">{{ scope.row.bank_username }}</template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="scope">{{ scope.row.bank_user_mobile }}</template>
        </el-table-column>
        <el-table-column label="审核状态">
          <template slot-scope="scope">{{ scope.row.auditor_status == 0 ? '未审核' : ( scope.row.auditor_status == 1 ? '审核通过' : (scope.row.auditor_status == 2 ? '审核拒绝' : ''))}}</template>
        </el-table-column>
        <el-table-column label="拒绝原因">
          <template slot-scope="scope">{{ scope.row.refuse_reason }}</template>
        </el-table-column>
        <!-- <el-table-column label="终审状态">
          <template slot-scope="scope">{{ scope.row.cashier_audit_status == 0 ? '未审核' : ( scope.row.cashier_audit_status == 1 ? '终审通过' : (scope.row.cashier_audit_status == 2 ? '终审拒绝' : ''))}}</template>
        </el-table-column> -->
        <!-- <el-table-column label="出账日期">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate('yyyy-MM-dd') }}</template>
        </el-table-column> -->
        <el-table-column label="提现时间">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
        </el-table-column>
        <!-- <el-table-column label="结束日期">
          <template slot-scope="scope">{{ scope.row.end_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
        </el-table-column> -->
        <el-table-column label="操作" width="300" style="text-align: left;">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleFlow(scope.row)">查看
            </el-button>
            <el-button
              size="mini"
              @click="getAudit(scope.row)"
              v-if="scope.row.auditor_status != 1  && scope.row.withdraw_status != 0"
              type="success">审核
            </el-button>
            <el-button
              size="mini"
              disabled
              v-if="!(scope.row.auditor_status != 1  && scope.row.withdraw_status != 0)"
              type="success">审核
            </el-button>
            <!-- <el-button
              size="mini"
              v-if="scope.row.auditor_status == 1"
              type="info">已审核
            </el-button>
            <el-button
              size="mini"
              v-if="scope.row.auditor_status != 1"
              type="info">未审核
            </el-button> -->
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
    <!-- 单项 审核弹出层 -->
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

    <!-- 批量 审核弹出层 -->
    <el-dialog
      title="批量审核"
      :visible.sync="alldialogVisible"
      width="350px">
      <div>
        <el-form ref="auditForm" :model="allauditForm" >
          <el-form-item prop="withDrawal" label="是否通过：">
            <el-radio-group v-model="allauditForm.auditor_status">
              <el-radio label="1">通过</el-radio>
              <el-radio label="2">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="withDrawal" label="说明：" v-if="allauditForm.auditor_status == 2">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入拒绝原因"
              v-model="allauditForm.refuse_reason">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alldialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allpostAuditData">确 定</el-button>
      </span>
    </el-dialog>

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
          { value: '0', label: '未审核' },
          { value: '1', label: '初审通过' },
          { value: '2', label: '初审拒绝' }
        ],
        goodsStatusList0: [
          { value: '0', label: '未审核' },
          { value: '1', label: '终审通过' },
          { value: '2', label: '终审拒绝' }
        ],

        /** 店铺信息 */
        shopInfo: this.$store.getters.shopInfo,

        /** 总日期 */
        advancedForm:{},

        /** 弹出层状态 单项审核 */
        dialogVisible: false,

        /** 审核表单数据 单项审核 */
        auditForm:{
          auditor_status:'1'
        },


        /** 弹出层状态 批量审核*/
        alldialogVisible: false,

        /** 审核表单数据 批量审核*/
        allauditForm:{
          auditor_status:'1'
        },

        /** 订单Id */
        billId:'',

        /** 批量审核选中 */
        multipleSelection: []
      }
    },
    mounted() {
      this.params = {
        ...this.params
      }
      this.GET_auditList()
    },
    activated() {
      delete this.params.auditor_status
      this.params = {
        ...this.params
      }
      this.GET_auditList()
    },
    beforeRouteUpdate(to, from, next) {
      delete this.params.auditor_status
      this.params = {
        ...this.params
      }
      this.GET_auditList()
      next()
    },
  //   watch: {
  // 　　pokerHistory(newValue, oldValue) {
  // 　　　　console.log(newValue)
  // 　　}
  //   },
  //   computed: {
  //     auditorStatus() {
  // 　　　　return this.params.auditor_status
  // 　　}
  //   },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_auditList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_auditList()
      },

      /** 切换订单状态*/
      changeGoodsStatus(val) {
        delete this.params.auditor_status
        if (val !== '' && val !== -1) {
          this.params = {
            ...this.params,
            auditor_status: val
          }
        }
        this.GET_auditList()
      },
      changeGoodsStatus0(val) {
        delete this.params.cashier_audit_status
        if (val !== '' && val !== -1) {
          this.params = {
            ...this.params,
            cashier_audit_status: val
          }
        }
        this.GET_auditList()
      },

      /** 搜索 */
      GET_auditList() {
        delete this.params.start_time
        delete this.params.end_time
        if (this.advancedForm.order_time_range) {
          this.params.start_time = this.advancedForm.order_time_range[0].getTime() / 1000
          this.params.end_time = this.advancedForm.order_time_range[1].getTime() / 1000
        }
        delete this.params.order_time_range
        this.loading = true
        API_flowQuery.getMonthly(this.params).then(response => {
          console.log(response)
          this.loading = false
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
          this.tableData = response.data
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
        debugger
        API_flowQuery.getMonthly(params).then(response => {
          let jsonData = response.data.data
          const json = {
            sheet_name: '提现审核单',
            sheet_values: jsonData.map(item => ({
              '提现编号': item.draw_sn,
              '店铺名称': item.seller_name,
              '提现金额': '￥' + item.draw_price,
              '银行名称': item.bank_name,
              '银行卡号': item.bank_no,
              '持卡人': item.bank_username,
              '手机号': item.bank_user_mobile,
              '审核状态': item.auditor_status == 0 ? '未审核' : ( item.auditor_status == 1 ? '审核通过' : (item.auditor_status == 2 ? '审核拒绝' : '')),
              '拒绝原因': item.refuse_reason,
              '提现时间': item.create_time ? Foundation.unixToDate(item.start_time) : '',
            }))
          }
          this.MixinExportJosnToExcel(json, '提现审核单')
        })



      },
      /** 查看流水详情 */
      handleFlow(row){
        this.$router.push({ path: `dedatils/${row.draw_record_id}` })
      },
      // 点击审核
      getAudit(row){
        this.dialogVisible = true
        this.auditForm = {
          auditor_status:'1'
        }
        this.billId = row.draw_record_id
      },
      // 点击确定审核发送审核内容	  单项审核
      postAuditData(){
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
            this.GET_auditList()
          }else{
            this.dialogVisible = false
            this.$message.error(response.message)
          }
        })
        console.log(this.auditForm)
      },
       /** 批量审核 */
      allAudit(){
        if(this.multipleSelection.length == 0){
          this.$message.error('请先选中要审核的结算单！')
          return
        }
        this.$confirm('是否进行批量审核?审核以后的结果无法修改', '批量审核', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 点击确定的回调
          this.alldialogVisible = true
        }).catch(() => {

        });
      },
      // 点击确定审核发送审核内容	  批量审核
      allpostAuditData(){

        let params = {
          refuse_reason : this.allauditForm.refuse_reason
        }
        if(this.allauditForm.auditor_status == 1){
          params = {}
        }
        API_flowQuery.batchAudit(this.multipleSelection.toString(),this.allauditForm.auditor_status,params).then(response => {
          console.log(response)
          this.$message.success(response.message)
          this.alldialogVisible = false
          // 导出审核结果
          let dataList = response.data
          let newArr = []
          let newJson = []
          for(var i=0;i<dataList.length;i++){
            newArr[i] = dataList[i].split('_')
          }
          for(var j=0;j<newArr.length;j++){
            newJson.push({
              sn:newArr[j][0],
              name:newArr[j][1],
            })
          }
          let jsonData = newJson
          const json2 = {
            sheet_name: '流水查询单',
            sheet_values: jsonData.map(item => ({
              '结算单号': item.sn,
              '审核结果': item.name
            }))
          }
          this.MixinExportJosnToExcel(json2, '批量审核结果')
        })
      },
      // 多选批量审核
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {return item.draw_record_id})
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
    font-size: 13px;
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
        font-size: 13px;
        color: #606266;
      }
    }
    .conditions {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      min-width: 22.5%;
      .choose-machine {
        width: 20%;
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
