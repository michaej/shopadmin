<template>
  <div>
    <en-table-layout
      :tableData="tableData.data"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" @click="createShopDialog" style="margin-left: 5px">导入俱乐部信息</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
            advancedWidth="465"
            placeholder="请输入店铺名称"
          >
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="店铺名称">
                  <el-input size="medium" v-model="advancedForm.shop_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="店主身份">
                  <el-input size="medium" v-model="advancedForm.member_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="店铺状态">
                  <el-select v-model="advancedForm.shop_disable" placeholder="请选择" clearable>
                    <el-option label="全部" value="ALL"/>
                    <el-option label="已开启" value="OPEN"/>
                    <el-option label="已关闭" value="CLOSED"/>
                    <el-option label="待审核" value="APPLY"/>
                    <el-option label="审核未通过" value="REFUSED"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="注册日期">
                  <el-date-picker
                    v-model="advancedForm.shop_time_range"
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
      </div>
      <template slot="table-columns">
        <!--店铺ID-->
        <el-table-column prop="shop_id" label="店铺ID"/>
        <!--店铺名称-->
        <el-table-column prop="shop_name" label="店铺名称"/>
        <!--店主身份-->
        <el-table-column prop="member_name" label="店主身份"/>
        <!--店铺分类-->
        <el-table-column prop="category_name" label="店铺分类"/>
        <!--店长名称-->
        <el-table-column prop="member_name" label="店长名称"/>
        <!--手机号-->
        <el-table-column prop="member_name" label="手机号"/>
        <!-- <el-table-column prop="cash_deposit_freeze" label="保证金是否冻结">
          <template slot-scope="scope">
            {{scope.row.cash_deposit_freeze== 0 ? '否' : '是'}}
          </template>
        </el-table-column> -->
        <!--创建时间-->
        <el-table-column prop="shop_createtime" :formatter="MixinUnixToDate" label="创建时间"/>
        <!--店铺状态-->
        <el-table-column label="店铺状态">
          <template slot-scope="scope">{{ scope.row.shop_disable | statusFilter }}</template>
        </el-table-column>
        <!--佣金比例-->
        <!-- <el-table-column label="佣金比例（%）">
          <template slot-scope="scope">{{ scope.row.shop_commission || 0 }}</template>
        </el-table-column> -->

        <!--操作-->
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.shop_disable !== 'APPLY'"
              size="mini"
              type="primary"
              @click="handleEditShop(scope.$index, scope.row)">修改</el-button>
            <el-button
              v-if="scope.row.shop_disable === 'APPLY'"
              size="mini"
              type="primary"
              @click="$router.push({ path: `/shop/shop-manage/edit/${scope.row.shop_id}?audit=1` })">审核</el-button>
            <el-button
              v-if="scope.row.shop_disable === 'OPEN'"
              size="mini"
              type="danger"
              @click="handleCloseShop(scope.$index, scope.row)">关闭</el-button>
            <el-button
              v-if="scope.row.shop_disable === 'CLOSED'"
              size="mini"
              type="success"
              @click="handleOpenShop(scope.$index, scope.row)">开启</el-button>
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


    <!-- 一键开店 -->
    <el-dialog :title="dialogTitle" :visible.sync="createShopShow" :width="dialogWidth">
      <div align="center">
        <el-form label-position="right">
          <el-form-item  prop="shop_name">
             <el-input placeholder="请输入店铺名称" v-model="shop_name" >
                <template slot="prepend">店铺名称</template>
             </el-input>
          </el-form-item>
          <el-form-item  prop="login_name">
             <el-input placeholder="请输入登录账号" v-model="login_name" >
                <template slot="prepend">登录账号</template>
             </el-input>
             <font color='red'>登录时请加后缀@meibbc.com登录</font><br>
             <font color='red'>填写123，则登录账号为123@meibbc.com</font>
          </el-form-item>
          <el-form-item  prop="password">
             <el-input placeholder="不填写默认 meibbc123456" v-model="password" >
                <template slot="prepend">登录密码</template>
             </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCreateShop">取 消</el-button>
        <el-button type="primary" @click="quickCreateShop">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Shop from '@/api/shop'

  export default {
    name: 'shopList',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 一键开店界面展示 */
        createShopShow: false,

        /** 弹框标题 */
        dialogTitle: '一键开店',

        /** 弹框宽度 */
        dialogWidth: '25%',

        shop_name : '',

        login_name : '',

        password : '',

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10,
          shop_disable: 'OPEN'
        },
        /** 列表数据 */
        tableData: '',
        /** 高级搜索数据 */
        advancedForm: {}
      }
    },
    mounted() {
      this.GET_ShopList()
    },
    filters: {
      statusFilter(val) {
        switch (val) {
          case 'REFUSED': return '审核未通过'
          case 'APPLY': return '待审核'
          case 'OPEN': return '开启中'
          case 'CLOSED': return '已关闭'
          default: return '未知状态'
        }
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ShopList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ShopList()
      },

      /** 快速创建店铺*/
      createShopDialog() {
        this.createShopShow = true
        this.dialogTitle = '一键开店'
        this.dialogWidth = '20%'
        this.shop_name = ''
        this.login_name = ''
        this.password = ''
      },

      /** 取消快速创建店铺 */
      cancelCreateShop() {
        this.createShopShow = false
        this.loading = false
      },

      /** 快速创建店铺 */
      quickCreateShop() {
        this.createShopShow = false

        if (!this.shop_name) {
           this.$message.error('请填写店铺名称')
           return false
        }

        if (!this.login_name) {
           this.$message.error('请填写登录账号')
           return false
        }

        const _params = {
           shop_name: this.shop_name,
           login_name: this.login_name,
           password: this.password
        }
        API_Shop.quickCreateShop(_params).then(response => {
          if(response.code == 0){
             this.$message.success('开店成功')
             this.shop_name = ''
             this.login_name = ''
             this.password = ''
             this.GET_ShopList()
          } else {
            this.$message.error(response.message)
          }
        })
      },


      /** 编辑店铺 */
      handleEditShop(index, row) {
        this.$router.push({ name: 'shopEdit', params: { id: row.shop_id, callback: this.GET_ShopList }})
      },
      /** 关闭店铺 */
      handleCloseShop(index, row) {
        this.$confirm('确定要关闭这个店铺吗？', '提示', { type: 'warning' }).then(() => {
          API_Shop.closeShop(row.shop_id).then(response => {
            this.$message.success('关闭成功！')
            this.GET_ShopList()
          })
        }).catch(() => {})
      },

      /** 开启店铺 */
      handleOpenShop(index, row) {
        this.$confirm('确定要开启这个店铺吗？', '提示', { type: 'warning' }).then(() => {
          API_Shop.recoverShop(row.shop_id).then(response => {
            this.$message.success('开启成功！')
            this.GET_ShopList()
          })
        }).catch(() => {})
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.params.page_no = 1
        this.GET_ShopList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.start_time
        delete this.params.end_time
        const { shop_time_range } = this.advancedForm
        if (shop_time_range) {
          this.params.start_time = parseInt(shop_time_range[0] /= 1000)
          this.params.end_time = parseInt(shop_time_range[1] /= 1000)
        }
        delete this.params.keyword
        delete this.params.shop_time_range
        this.params.page_no = 1
        this.GET_ShopList()
      },

      /** 获取店铺列表 */
      GET_ShopList() {
        this.loading = true
        API_Shop.getShopList(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>
