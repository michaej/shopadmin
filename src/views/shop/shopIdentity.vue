<template>
  <div>
    <en-table-layout :tableData="catForm.data" :loading="loading">
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="handleAddGroupBuy"
          >添加</el-button>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column prop="label_name" label="店铺分类"/>
        
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditGroupBuy(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteGroupBuy(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </template>
    </en-table-layout>

    <!--添加商城服务接口 dialog-->
    <el-dialog
      title="添加分类标签"
      :visible.sync="dialogGroupBuyVisible"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close='cancelDialog'
    >
      <el-form :model="catForm" :rules="catRules" ref="catForm" label-width="120px">
        <!--分类名称-->
        <el-form-item label="店铺分类" prop="label_name">
          <el-input v-model="catForm.label_name" :maxlength="20" clearable></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="submitAddGroupBuyForm('catForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API_Promotion from "@/api/promotion";
import * as API_distribution from "@/api/distribution";
import * as API_goodServer from "@/api/goodsService";

export default {
  name: "userLevelList",
  data() {
    return {
      catForm: {},
      // 列表loading状态
      loading: false,
      // 列表数据
      tableData: "",
      // 添加团购分类 表单
      // 添加团购分类 表单规则
      catRules: {
        label_name: [
          { required: true, message: "分类标签不能为空", trigger: "blur" }
        ]
      },
      // 添加团购分类
      dialogGroupBuyVisible: false
    };
  },
  mounted() {
    this.getServeListFun();
  },
  methods: {

    /** 当选择项发生变化 */
    handleSelectionChange(val) {
      this.selectedData = val.map(item => item.id);
    },

    /** 添加团购分类 */
    handleAddGroupBuy() {
      this.catForm = {};
      this.dialogGroupBuyVisible = true;
    },

    /** 编辑服务 */
    handleEditGroupBuy(index, row) {
      this.catForm = this.MixinClone(row);
      this.dialogGroupBuyVisible = true;
    },

    /** 删除服务 */
    handleDeleteGroupBuy(index, row) {
      this.$confirm("确定要删除分类标签吗？", "提示", { type: "warning" })
        .then(() => {
          let params = {
            label_id:row.label_id
          }
          API_goodServer.deleteTagList(params).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.getServeListFun();
              this.$message.success("删除成功！");
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {});
    },

    /** 添加服务 提交表单 */
    submitAddGroupBuyForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { label_id } = this.catForm;
          this.catForm.id = label_id
          if (label_id) {
            API_goodServer.updateTagList(this.catForm).then(
              response => {
                if(response.code == -1){
                  this.$message.error(response.message);
                }else{
                  this.dialogGroupBuyVisible = false;
                  this.$message.success("编辑成功！");
                  this.getServeListFun();
                }
                
              }
            );
          } else {
            API_goodServer.addTagLabel(this.catForm).then(
              response => {
                if(response.code == -1){
                  this.$message.error(response.message);
                }else{
                  console.log(response)
                  this.dialogGroupBuyVisible = false;
                  this.$message.success("添加成功！");
                  this.getServeListFun();
                }
                
              }
            );
          }
        } else {
          this.$message.error("分类标签不能为空！");
          return false;
        }
      });
    },

    //获取服务列表
    getServeListFun() {
      API_goodServer.getCategoryList().then(res => {
        console.log(res)
        this.catForm = res;
      });
    },

    //关闭弹层
    cancelDialog() {
      this.dialogGroupBuyVisible = false
      this.getServeListFun()
    },
  }
};
</script>

<style scope>
.el-table .cell {
  align-items: center;
  display: flex;
  justify-content: center;
}
.service_img {
  width: 30px;
  height: 30px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>