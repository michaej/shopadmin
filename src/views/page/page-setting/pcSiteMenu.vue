<template>
  <div>
    <en-table-layout
      :stripe="false"
      :tableData="tableData.data"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddSiteMenu">添加</el-button>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column prop="navigation_name" label="名称"/>
        <el-table-column prop="url" label="URL"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSiteMenu(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteSiteMenu(scope.$index, scope.row)">删除</el-button>
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

    <el-dialog
      :title="(siteMenuForm.id ? '编辑' : '添加') + '导航菜单'"
      :visible.sync="dialogVisible" width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="siteMenuForm" :rules="siteMenuRules" ref="siteMenuForm" label-width="110px">
        <el-form-item label="导航菜单名称" prop="navigation_name">
          <el-input v-model="siteMenuForm.navigation_name" clearable :maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="导航菜单链接" prop="url">
          <el-input v-model="siteMenuForm.url" clearable :maxlength="225"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSiteMenuForm('siteMenuForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_SiteMenu from '@/api/siteMenu'

  export default {
    name: 'pcSiteMenu',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10,
          client_type: 'PC'
        },

        /** 列表数据 */
        tableData: '',

        /** 添加、编辑导航菜单 dialog */
        dialogVisible: false,

        /** 添加、编辑导航菜单 表单 */
        siteMenuForm: {},

        /** 添加、编辑导航菜单 表单规则 */
        siteMenuRules: {
          navigation_name: [this.MixinRequired('请输入导航菜单名称！')],
          url: [this.MixinRequired('请输入导航菜单链接！')]
        }
      }
    },
    mounted() {
      this.GET_SiteMenuList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_SiteMenuList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_SiteMenuList()
      },

      /** 添加导航菜单 */
      handleAddSiteMenu() {
        this.siteMenuForm = {}
        this.dialogVisible = true
      },

      /** 编辑导航菜单 */
      handleEditSiteMenu(index, row) {
        this.siteMenuForm = this.MixinClone(row)
        this.dialogVisible = true
      },

      /** 删除导航菜单 */
      handleDeleteSiteMenu(index, row) {
        this.$confirm('确定要删除这个导航菜单吗？', '提示', { type: 'warning' }).then(() => {
          API_SiteMenu.deleteSiteMenu(row.navigation_id).then(response => {
            this.$message.success('删除成功！')
            this.GET_SiteMenuList()
          })
        }).catch(() => {})
      },

      /** 添加、编辑导航菜单 提交表单 */
      submitSiteMenuForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { navigation_id } = this.siteMenuForm
            if (navigation_id) {
              API_SiteMenu.editSiteMenu(navigation_id, this.siteMenuForm).then(response => {
                this.dialogVisible = false
                this.$message.success('保存成功！')
                this.MixinSetTableData(this.tableData, 'navigation_id', navigation_id, response)
              })
            } else {
              API_SiteMenu.addSiteMenu(this.params.client_type, this.siteMenuForm).then(response => {
                this.dialogVisible = false
                this.$message.success('添加成功！')
                this.GET_SiteMenuList()
              })
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取导航菜单列表 */
      GET_SiteMenuList() {
        this.loading = true
        API_SiteMenu.getSiteMenuList(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>
