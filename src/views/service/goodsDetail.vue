
<template>
  <div class="goods-detail" style="padding:0px;">
    <!-- 基本信息 -->
    <div>
      <div class="title-view">
        <span>基本信息</span>
      </div>
      <div class="p-view">
        <p>
          <span class="p-view-title">*</span>商品标题：
        </p>
        <div class="p-input">
          <el-input v-model="input" placeholder="请输入内容" maxlength="100px"></el-input>
        </div>
      </div>
      <div class="p-view">
        <p>
          <span class="p-view-title">*</span>商品描述：
        </p>
        <div class="p-input">
          <el-input v-model="input" placeholder="请输入内容" maxlength="100px"></el-input>
        </div>
      </div>
      <div class="p-view">
        <p>
          <span class="p-view-title">*</span>商品分类：
        </p>
        <div class="p-input">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="p-view" style="align-items: flex-start;">
        <p>
          <span class="p-view-title">*</span>商品轮播图：
        </p>
        <div class="p-input" style="width:100%;">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
    </div>
    <!-- 价格库存 -->
    <div>
      <div class="title-view">
        <span>价格库存</span>
      </div>
      <!-- 规格明细 -->
      <div class="p-view" style="align-items: flex-start;">
        <p>
          <span class="p-view-title">*</span>商品规格：
        </p>
        <div class="mode-table-view">
          <div class="mode-table" style="width:100%;" v-for="item in 1" :key="item">
            <h3 class="group-title">
              <span class="group-title_label">规格名：</span>
              <div class="zent-popover-wrapper zent-select" style="display: inline-block;">
                <el-autocomplete
                  class="inline-input"
                  v-model="state1"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSelect"
                ></el-autocomplete>
              </div>
              <label class="zent-checkbox-wrap">
                <span class="zent-checkbox">
                  <span class="zent-checkbox-inner"></span>
                </span>
              </label>
              <span class="group-remove">×</span>
            </h3>
            <div class="group-container" style="background:#FFF;">
              <span>规格值：</span>
             
              <div class="group-container-input" v-for="item in 4" :key="item">
                <el-input v-model="input" placeholder="请输入内容" maxlength="100px"></el-input>
              </div>
            </div>
          </div>
          <h3 class="group-title">
            <div class="zent-popover-wrapper zent-select" style="display: inline-block;">
              <el-button type="info" plain>添加规格项目</el-button>
            </div>
          </h3>
        </div>
      </div>
      <!-- 规格明细 -->
      <div class="p-view" style="align-items: flex-start;">
        <p>
          <span class="p-view-title">*</span>规格明细
        </p>
        <div class="mode-table-view">
          <div class="mode-table" style="width:100%;" v-for="item in 1" :key="item">
            <h3 class="group-title">
              <div class="gc-title"> <p>
                  <span class="p-view-title">*</span>{{value}}
                </p></div>
              <div class="gc-title">
                <p>
                  <span class="p-view-title">*</span>价格
                </p>
              </div>
              <div class="gc-title">
                <p>
                  <span class="p-view-title">*</span>库存
                </p>
              </div>
              <div class="gc-title">
                <p>
                  <span class="p-view-title">*</span>图片
                </p>
              </div>
            </h3>
            <div class="group-container" style="background:#FFF;padding:10px 0;">
               <div class="group-container-input gc-title" style="padding-left:26px;"> {{value}}</div>
              <div class="group-container-input" v-for="item in 3" :key="item">
                <el-input v-model="input" placeholder="请输入内容" maxlength="100px"></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as API_goods from "@/api/goods";

export default {
  name: "goodsDetail",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style type="text/scss" lang="scss" scoped>
.goods-detail {
  padding: 0;
}
.title-view {
  width: 100%;
  height: 40px;
  background: #f8f8f8;
  line-height: 40px;
  padding: 0 20px;
  font-weight: 600;
}
.p-view {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  margin: 20px 0;
}
.p-view p {
  min-width: 130px;
}
.p-view-title {
  color: red;
  margin: 0 10px;
}
.p-input {
  width: 400px;
}
.mode-table-view {
  width: 100%;
  border: 1px solid #e5e5e5;
}
.mode-table {
  width: 100%;

  min-height: 100px;
  padding: 10px;
}
.guige-view {
  width: 100%;
  background: #f8f8f8;
}
.group-title {
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 7px 10px;
  margin: 0;
  background-color: #f8f8f8;
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
}
.group-container {
  padding: 10px 10px 0;
  display: flex;
}
.zent-checkbox {
  position: relative;
  display: inline-block;
  width: 14px;
  height: 14px;
  white-space: nowrap;
  outline: none;
  vertical-align: middle;
  line-height: 1;
  margin: 0;
  padding: 0;
}
.group-title_label{
  text-align: center;
  line-height: 32px;
}
.group-remove {
  position: absolute;
  top: 12px;
  right: 10px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  width: 18px;
  height: 18px;
  font-size: 14px;
  line-height: 18px;
  background: hsla(0, 0%, 60%, 0.6);
  border-radius: 10px;
  text-indent: 0;
}
.group-container {
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  display: flex;
}
.group-container-input {
  margin-left: 6px;
}
.gc-title {
  width: 180px;
}
.gc-title p {
  margin: 10px 0px;
}
</style>



