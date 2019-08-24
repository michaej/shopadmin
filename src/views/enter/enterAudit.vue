<template>
  <div v-loading="loading">
    <el-form :model="shopForm" :rules="shopRules" ref="shopForm" inline label-width="130px">
      <el-tabs v-model="tableName" ref="tabs">
        <el-tab-pane label="门店信息" name="base">
          <el-form-item label="门店名称" prop="shop_name">
            <el-input disabled v-model="shopForm.shop_name" :maxlength="50"></el-input>
          </el-form-item><br />
          <el-form-item label="联系人姓名" prop="link_name">
            <el-input disabled v-model="shopForm.link_name" :maxlength="20"></el-input>
          </el-form-item><br />
          <el-form-item label="联系电话" prop="link_phone">
            <el-input disabled v-model="shopForm.link_phone" :maxlength="11"></el-input>
          </el-form-item><br />
          <el-form-item label="门店分类" prop="scope">
            <el-input disabled v-model="shopForm.shop_category_name" :maxlength="11"></el-input>
          </el-form-item><br />
          <el-form-item label="城市" prop="license_region">
            <el-input disabled v-model="shopForm.shop_province" :maxlength="11"></el-input>
            <el-input disabled v-model="shopForm.shop_city" :maxlength="11"></el-input>
            <el-input disabled v-model="shopForm.shop_county" :maxlength="11"></el-input>
          </el-form-item><br />
          <el-form-item label="门店地址" prop="shop_add">
            <el-input disabled v-model="shopForm.shop_add" :maxlength="11"></el-input>
          </el-form-item><br />
          <el-form-item label="有效证件" prop="licence_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinUploadApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.licence_img = res.url }">
              <img v-if="shopForm.licence_img" :src="shopForm.licence_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <a v-if="shopForm.licence_img" :href="shopForm.licence_img" target="_blank" class="see-original">查看原图</a>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="店主信息" name="legal">
          <el-form-item label="真实姓名" prop="link_name">
            <el-input v-model="shopForm.link_name" :maxlength="50"></el-input>
          </el-form-item><br />
          <el-form-item label="手机号码" prop="link_phone">
            <el-input v-model="shopForm.link_phone" :maxlength="50"></el-input>
          </el-form-item><br />
          <el-form-item label="证件号码" prop="legal_id">
            <el-input v-model="shopForm.legal_id" :maxlength="50"></el-input>
          </el-form-item><br />
          <br>
          <el-form-item label="证件照片" prop="legal_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinUploadApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.legal_img = res.url }">
              <img v-if="shopForm.legal_img" :src="shopForm.legal_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload
              class="avatar-uploader"
              :action="MixinUploadApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.legal_black_image = res.url }">
              <img v-if="shopForm.legal_black_image" :src="shopForm.legal_black_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <a v-if="shopForm.legal_img" :href="shopForm.legal_img" target="_blank" class="see-original">查看原图</a>
          </el-form-item>
        </el-tab-pane>
        <el-form :model="shopForm" :rules="goodsAuditRules" ref="shopForm" label-width="100px">
          <!--是否通过=-->
          <el-form-item label="审核" prop="agent_disable">
            <el-radio-group v-model="shopForm.agent_disable">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="0">不通过</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="原因" prop="audit_reason">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 8}"
              placeholder=""
              :maxlength="120"
              v-model="shopForm.audit_reason">
            </el-input>
          </el-form-item>
        </el-form>
      </el-tabs>

      <div class="save-btn-box">
        <el-button type="primary" @click="handleSaveEdit">{{ isAudit ? '通过并保存' : '确认审核'}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import * as API_Shop from '@/api/shop'
  import * as API_Category from '@/api/category'
  import { RegExp } from '~/ui-utils'

  export default {
    name: 'shopEdit',
    data() {
      return {
        tableName: 'base',
        shopshows: [],
        goods_show_managements: [],
        shop_id: this.$route.params.id,
        isAudit: !!this.$route.query.audit,
        loading: false,
        shopForm: { },
        cash_deposit: '0',
        cash_deposit_freeze: '0',
        shopRules: {
          audit_reason: [this.MixinRequired('公司名称不能为空！')],
          company_address: [this.MixinRequired('公司地址不能为空！')],
          // company_phone: [
          //   this.MixinRequired('公司电话不能为空！'),
          //   { validator: (rule, value, callback) => {
          //     if (!RegExp.TEL.test(value)) {
          //       callback(new Error('格式应为：010-8888888'))
          //     } else {
          //       callback()
          //     }
          //   },
          //   trigger: 'blur'
          //   }
          // ],
          employee_num: [this.MixinRequired('公司员工数不能为空！')],
          reg_money: [
            this.MixinRequired('注册资金不能为空！'),
            { validator: (rule, value, callback) => {
              if (!RegExp.money.test(value)) {
                callback(new Error('注册资金格式有误！'))
              } else {
                callback()
              }
            } }
          ],
          link_phone: [this.MixinRequired('联系电话不能为空！')],
          company_email: [this.MixinRequired('公司电子邮箱不能为空！')]
        },
        isIndeterminateCat: false,
        checkAllCat: false,
        categorys: [],
        defaultRegionLicense: null,
        defaultRegionBank: null,
        defaultRegionShop: null,
        // 资质审核
        dialogImageUrl: '',
        dialogVisible: false,
        hahaha:[
          {
            url:'http://oss.meibbc.com/bbcshop_oos/file/20190128/goods/534AC8DAA5B449F0B2E6E7E1BEEE8553.png',
          },
          {
            url:'http://oss.meibbc.com/bbcshop_oos/file/20190128/goods/A1E1F3B7376446D986056A343905F1BA.png',
          },
          {
            url:'http://oss.meibbc.com/bbcshop_oos/file/20190128/goods/534AC8DAA5B449F0B2E6E7E1BEEE8553.png',
          },
          {
            url:'http://oss.meibbc.com/bbcshop_oos/file/20190128/goods/A1E1F3B7376446D986056A343905F1BA.png',
          },
        ]
      }
    },
    mounted() {
      this.initMemberInfo()
      //  查询店铺商品显示类型列表
      this.GET_ShopsGoodsShow()
    },
    beforeRouteUpdate(to, from, next) {
      this.shop_id = to.params.id
      next()
    },
    activated() {
      this.shop_id = this.$route.params.id
    },
    watch: {
      shop_id: function() {
        this.initMemberInfo()
        this.shopForm = {},
        this.shopList = []
      }
    },
    methods: {
      /** 经营类目全选 */
      handleCheckAllCatChange(val) {
        this.shopForm.goods_management_category = val ? this.categorys.map(item => item.id) : []
        this.isIndeterminateCat = false
      },

      /** 经营类目选择 */
      handleCheckedCatsChange(value) {
        let checkedCount = value.length
        this.checkAllCat = checkedCount === this.categorys.length
        this.isIndeterminateCat = checkedCount > 0 && checkedCount < this.categorys.length
      },
      /** 确认审核 */
      handleSaveEdit() {
        if(this.shopForm.agent_disable == 0){
          if(this.shopForm.audit_reason){
            let params = {
              shop_id : this.shopForm.shop_id,
              pass : this.shopForm.agent_disable,
              audit_reason : this.shopForm.audit_reason
            }
            API_Shop.editAuditShop(params).then(response => {
              this.$message.success('审核通过！')
            })
          }else{
              this.$message.error('审核原因不能为空！')
          }
        }
        if(this.shopForm.agent_disable == 1){
          let params = {
            shop_id : this.shopForm.shop_id,
            pass : this.shopForm.agent_disable,
            audit_reason : this.shopForm.audit_reason
          }
          API_Shop.editAuditShop(params).then(response => {
            this.$message.success('审核通过！')
          })
        }
        
        
      },
      /** 拒绝通过 */
      handleRefusePass() {
        this.$confirm('确定该店铺拒绝通过吗？', '提示', { type: 'warning' }).then(() => {
          const params = this.MixinClone(this.shopForm)
          params.pass = 0
          
          let newDataArray = this.shopForm.trademark.map((item)=>{return item.url})
          params.trademark = newDataArray.join(',')
          console.log(params,789)

          API_Shop.editAuthShop(this.shop_id, params).then(response => {
            this.$message.success('已拒绝该店铺！')
            const { callback } = this.$route.params
            typeof callback === 'function' && callback()
            this.$store.dispatch('delCurrentViews', {
              view: this.$route,
              $router: this.$router
            })
          })
        }).catch(() => {})
      },
      /** 初始化会员信息 */
      initMemberInfo() {
        Promise.all([
          API_Shop.getShopDetail(this.shop_id),
          API_Category.getCategoryChildren()
        ]).then(responses => {
          console.log('-------------初始化----------')
          console.log(responses)
          const shopInfo = responses[0]
          const categorys = responses[1]
          if (shopInfo.goods_show_management != null && shopInfo.goods_show_management !== '') {
            let list = shopInfo.goods_show_management.split(',')
            list.forEach((item, index) => {
              this.goods_show_managements.push(parseInt(item))
            })
          }
          if (shopInfo.cash_deposit != null && shopInfo.cash_deposit !== '') {
            let cash_depositLength = shopInfo.cash_deposit.indexOf(':')
            this.cash_deposit = shopInfo.cash_deposit.substring(0, cash_depositLength)
            this.cash_deposit_freeze = shopInfo.cash_deposit.substring(cash_depositLength + 1, cash_depositLength.length)
          }
          // 设置店铺信息
          this.shopForm = this.MixinClone(shopInfo)
          this.shopForm.store_flag = String(shopInfo.store_flag)
          console.log(this.shopForm)
          console.log(typeof this.shopForm.label_good_shop.toString())
          // this.shopForm.licence_start /= 1000
          // this.shopForm.licence_end /= 1000
          // this.shopForm.establish_date /= 1000
          this.shopForm.licence_start *= 1000
          this.shopForm.licence_end *= 1000
          this.shopForm.establish_date *= 1000
          if(this.shopForm.cash_deposit_freeze != null){
            this.shopForm.cash_deposit_freeze = this.shopForm.cash_deposit_freeze.toString()
          }
          this.shopForm.label_good_shop = this.shopForm.label_good_shop.toString()
          console.log(this.shopForm.label_good_shop)
          const {
            license_province_id, license_city_id, license_county_id, license_town_id,
            bank_province_id, bank_city_id, bank_county_id, bank_town_id,
            shop_province_id, shop_city_id, shop_county_id, shop_town_id
          } = shopInfo
          this.defaultRegionLicense = [license_province_id, license_city_id, license_county_id, license_town_id]
          this.defaultRegionBank = [bank_province_id, bank_city_id, bank_county_id, bank_town_id]
          this.defaultRegionShop = [shop_province_id, shop_city_id, shop_county_id, shop_town_id]
          this.shopForm.goods_management_category = []

          if (shopInfo.goods_management_category) {
            const _categorys = shopInfo.goods_management_category.split(',')
            this.shopForm.goods_management_category = _categorys
            if (_categorys.length !== 0) {
              if (_categorys.length < categorys.length) {
                this.isIndeterminateCat = true
              } else if (_categorys.length === categorys.length) {
                this.checkAllCat = true
              }
            }
          }
          // 设置经营类目
          this.categorys = categorys.map(item => ({
            id: String(item.category_id),
            name: item.name
          }))
          // 设置资质审核
          if(this.shopForm.product_test_report && this.shopForm.product_test_report !== '' && this.shopForm.product_test_report !== null){
            let datas = this.shopForm.product_test_report.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.product_test_report = newDataList
            console.log('-------')
            console.log(this.shopForm)
            console.log('-------')
          }
          
          if(this.shopForm.agent_brand && this.shopForm.agent_brand !== '' && this.shopForm.agent_brand !== null){
            let datas = this.shopForm.agent_brand.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.agent_brand = newDataList
          }
          
          if(this.shopForm.trademark && this.shopForm.trademark !== '' && this.shopForm.trademark !== null){
            let datas = this.shopForm.trademark.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.trademark = newDataList
            console.log(this.shopForm.trademark,456)
            // return
          }

          if(this.shopForm.cosmetic_hygiene_permit && this.shopForm.cosmetic_hygiene_permit !== '' && this.shopForm.cosmetic_hygiene_permit !== null){
            let datas = this.shopForm.cosmetic_hygiene_permit.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.cosmetic_hygiene_permit = newDataList
          }

          if(this.shopForm.year_customs_copy && this.shopForm.year_customs_copy !== '' && this.shopForm.year_customs_copy !== null){
            let datas = this.shopForm.year_customs_copy.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.year_customs_copy = newDataList
          }

          if(this.shopForm.cosmetics_production_license && this.shopForm.cosmetics_production_license !== '' && this.shopForm.cosmetics_production_license !== null){
            let datas = this.shopForm.cosmetics_production_license.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.cosmetics_production_license = newDataList
          }

          if(this.shopForm.special_cosmetics && this.shopForm.special_cosmetics !== '' && this.shopForm.special_cosmetics !== null){
            let datas = this.shopForm.special_cosmetics.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.special_cosmetics = newDataList
          }

          if(this.shopForm.two_years_customs_import && this.shopForm.two_years_customs_import !== '' && this.shopForm.two_years_customs_import !== null){
            let datas = this.shopForm.two_years_customs_import.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.two_years_customs_import = newDataList
          }

          if(this.shopForm.two_years_immigration_inspection && this.shopForm.two_years_immigration_inspection !== '' && this.shopForm.two_years_immigration_inspection !== null){
            let datas = this.shopForm.two_years_immigration_inspection.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.two_years_immigration_inspection = newDataList
          }

          if(this.shopForm.import_non_special && this.shopForm.import_non_special !== '' && this.shopForm.import_non_special !== null){
            let datas = this.shopForm.import_non_special.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.import_non_special = newDataList
          }

          if(this.shopForm.special_purpose_cosmetics && this.shopForm.special_purpose_cosmetics !== '' && this.shopForm.special_purpose_cosmetics !== null){
            let datas = this.shopForm.special_purpose_cosmetics.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.special_purpose_cosmetics = newDataList
          }

          if(this.shopForm.food_production_licence && this.shopForm.food_production_licence !== '' && this.shopForm.food_production_licence !== null){
            let datas = this.shopForm.food_production_licence.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.food_production_licence = newDataList
          }

          if(this.shopForm.food_circulation_permit && this.shopForm.food_circulation_permit !== '' && this.shopForm.food_circulation_permit !== null){
            let datas = this.shopForm.food_circulation_permit.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.food_circulation_permit = newDataList
          }

          if(this.shopForm.hs_mark_3c && this.shopForm.hs_mark_3c !== '' && this.shopForm.hs_mark_3c !== null){
            let datas = this.shopForm.hs_mark_3c.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.hs_mark_3c = newDataList
          }

          if(this.shopForm.service_qualification && this.shopForm.service_qualification !== '' && this.shopForm.service_qualification !== null){
            let datas = this.shopForm.service_qualification.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.service_qualification = newDataList
          }

          if(this.shopForm.hygienic_license && this.shopForm.hygienic_license !== '' && this.shopForm.hygienic_license !== null){
            let datas = this.shopForm.hygienic_license.split(',')
            let newDataList = []
            for(let i = 0;i<datas.length;i++){
              newDataList.push({url:datas[i]})
            }
            this.shopForm.hygienic_license = newDataList
          }

          console.log(this.shopForm,456456)
        })
      },
      /** 点击大图预览 */
      handlePictureCardPreview(file){
        console.log()
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      /** 点击图片删除按钮 */
      // handleRemove(file, fileList){
      //  this.shopForm.product_test_report = fileList
      //  console.log(this.shopForm)
      // },
      /** 上传成功 */
      // handleSuccess(response, file, fileList){
      //   this.shopForm.product_test_report.push({
      //     url:response.url
      //   })
      //   console.log(this.shopForm.product_test_report)
      // }
      GET_ShopsGoodsShow() {
        API_Shop.getShopsGoodsShow({}).then(res => {
          console.log('获取信息---------')
          console.log(res)
          this.shopshows = res
          let arr = []
          for(let i = 0; i < this.shopshows.lenght; i++) {
            // debugger
            arr.push(this.shopshows[i].name)
          }
          this.shopList = arr
        })
      }
      
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-form-item--small .el-form-item__content {
    width: 400px;
  }

  /deep/ .el-form {
    width: 60%;
  }

  /deep/ .imgDataS {
    width: calc(100% - 150px);
  }

  /deep/ .imgDataS .el-form-item__content {
    width: calc(100% - 150px);
  }

  /deep/ .proImgBox{
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    &:hover {
      border-color: #409eff
    }
  }

  /deep/ .avatar-uploader {
    width: 180px;
    height: 180px;
    img { width: 100%; height: 100% }
  }
  /deep/ .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  /deep/ .el-tabs__content {
    overflow: inherit;
  }

  .save-btn-box {
    text-align: center;
    // background-color: #fff;
    padding: 10px 0;
    // border: 1px solid #dcdfe6;
    border-top: 0;
    // box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  /deep/ .form-item-cat .el-form-item__content { width: auto }
  .see-original {
    font-size: 12px;
    color: #006db7;
    &:hover { color: #F00 }
  }
  .license-date {
    width: 180px;
  }
  /deep/ .bbc-shopEdit .el-form-item__content{
    width: 600px!important;
  }
  // 去掉证件删除按钮
  /deep/ .el-upload-list__item-delete{
    display: none !important;
  }
</style>
