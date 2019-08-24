<template>
  <div>
    <en-table-layout
      ref="child"
      :tableData="tableData.data"
      :loading="loading"
      
    >
      <!-- 搜索条目 -->
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <div class="conditions">
          </div>
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
          >
          <!-- 高级搜索 -->
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="商品名称">
                  <el-input size="medium" v-model="advancedForm.goods_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品编号">
                  <el-input size="medium" v-model="advancedForm.goods_sn" clearable></el-input>
                </el-form-item>
                <el-form-item label="店铺名称">
                  <el-input size="medium" v-model="advancedForm.shop_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品类别">
                  <en-category-picker @changed="categoryChanged"/>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
      <!-- 商品列表 -->
      <template slot="table-columns">
        <el-table-column prop="id" label="商品ID" width="120"/>>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img style="width: 50px;height:50rpx;" :src="scope.row.main_img_url" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"/>
        <el-table-column prop="categoryname[0].name" label="所属分类"/>
        <el-table-column prop="price" label="商品价格"/>
        <el-table-column prop="stock" label="商品库存"/>
        <el-table-column label="销售状态">
           <template slot-scope="scope">
          <el-button v-show="scope.row.sale_status == 0" type="primary" round>下架</el-button>
          <el-button v-show="scope.row.sale_status != 0" type="success" round>上架</el-button>
               </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="showGoodsInfo(scope.row.id)">预览</el-button>
          </template>
        </el-table-column>
      </template>
      <!-- 底部页脚 -->
      <el-pagination
        v-if="tableData"
        slot="pagination"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="tableData.page_no"
        :page-sizes="[10,15, 20]"
        :page-size="tableData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total">
      </el-pagination>
    </en-table-layout>
  </div>
</template>

<script>
  import * as API_goods from '@/api/goods'

  export default {
    name: 'goodsAudit',
    data() {
      return {
        noMsgForm:{
          message:''
        },
        // 列表loading状态
        loading: false,
        // 列表参数
        params: {
          page_no: 1,
          page_size: 10
        },
        // 商品数据
        tableData: '',
        // 商品参数
        goodsRuleForm: {},
        unDialogGoodsAuditVisible:false,
        // 审核商品 dialog
        dialogGoodsAuditVisible: false,
        // 商品参数 dialog
        dialogGoodsRuleVisible: false,
        // 审核商品 dialogTitle
        dialogGoodsAuditTitle: '审核商品',
        // 高级搜索数据
        advancedForm: {
          goods_name: '',
          goods_sn: '',
          shop_name: '',
          category_path: ''
        },
        // 商品数据
        goodsInfo:{},
        // 商品预览弹窗
        goodsDetailVisible:false,
        /** 批量审核选中 */
        multipleSelection: [],
        /** 批量选中的店铺 */
        multipleSelectionShop:[],
      }
    },
    mounted() {
      this.getGoodsList()
    },
    watch: {
      
    },
    methods: {
      readExcel(file,fileList){
        console.log(file,fileList,456456)
        const fileReader = new FileReader();

        // fileReader.readAsText(fileList[0], "UTF-8")

        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result;
            console.log(data,123456)
            const workbook = XLSX.read(data, {
              type:'binary'
            });
            
          } catch (e) {
            this.$message.warning('文件类型不正确！');
            return false
          }
        };
        fileReader.readAsBinaryString(file.raw);
      },
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.getGoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.getGoodsList()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
    
      },

      /** 高级搜索中 分类选择组件值发生改变 */
      categoryChanged(data) {
     
      },

      submitGoodsRuleForm() {
       
      },

      getGoodsList() {
        this.loading = true
        API_goods.getGoodsList(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => (this.loading = false))
      },

      /** 商品预览 */
      showGoodsInfo(id){
        console.log("-------to---------",id)
      //  this.$router.push({name:'goodsDetail',});
       this.$router.push({name:'goodsDetail',query:{id:id}}); 
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
  .goods_name {
    color: #4183c4;
    &:hover {
      color: #f42424;
    }
  }
  /deep/ .goodsIntro img{
    max-width: 80% !important;
  }
</style>
