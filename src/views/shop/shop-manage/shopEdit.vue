<template>
  <div v-loading="loading">
    <el-form :model="shopForm" :rules="shopRules" ref="shopForm" inline label-width="130px">
      <el-tabs type="border-card" v-model="tableName" ref="tabs">
        <el-tab-pane label="基本信息" name="base">
          <el-form-item label="公司名称" prop="company_name">
            <el-input v-model="shopForm.company_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="company_address">
            <el-input v-model="shopForm.company_address" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="公司电话" prop="company_phone">
            <el-input v-model="shopForm.company_phone" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="员工总数" prop="employee_num">
            <el-input-number v-model="shopForm.employee_num" :min="1" :max="99999999"/>
          </el-form-item>
          <el-form-item label="注册资金" prop="reg_money">
            <el-input v-model="shopForm.reg_money">
              <template slot="append">万</template>
            </el-input>
          </el-form-item>
          <el-form-item label="联系姓名" prop="link_name">
            <el-input v-model="shopForm.link_name" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="link_phone">
            <el-input v-model="shopForm.link_phone" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="company_email">
            <el-input v-model="shopForm.company_email" :maxlength="50"></el-input>
          </el-form-item>
          <!-- <el-form-item label="自营店铺" prop="self_operated">
            <el-radio-group v-model="shopForm.self_operated">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item> -->
        </el-tab-pane>
        <el-tab-pane label="营业执照信息" name="legal">
          <el-form-item label="法人姓名" prop="legal_name">
            <el-input v-model="shopForm.legal_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="法人身份证号" prop="legal_id">
            <el-input v-model="shopForm.legal_id" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="营业执照号" prop="license_num">
            <el-input v-model="shopForm.license_num" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="法定经营范围" prop="scope">
            <el-input v-model="shopForm.scope" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="营业执照所在地" prop="license_region">
            <en-region-picker :api="MixinRegionApi" :default="defaultRegionLicense" @changed="(object) => { shopForm.license_region = object.last_id }"/>
          </el-form-item>
          <el-form-item label="营业执照详细地址 " prop="license_add">
            <el-input v-model="shopForm.license_add" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="成立日期" prop="establish_date">
            <el-date-picker
              class="license-date"
              v-model="shopForm.establish_date"
              type="date"
              align="center"
              :editable="false"
              value-format="timestamp"
              :picker-options="{ disabledDate(time) { return time.getTime() > Date.now() } }">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="营业执照有效期" prop="licence_start">
            <el-date-picker
              class="license-date"
              v-model="shopForm.licence_start"
              type="date"
              align="center"
              :editable="false"
              value-format="timestamp"
              :picker-options="{ disabledDate(time) { return time.getTime() > Date.now() } }">
            </el-date-picker>
            <el-date-picker
              class="license-date"
              v-model="shopForm.licence_end"
              type="date"
              align="center"
              :editable="false"
              value-format="timestamp"
              :picker-options="{ disabledDate(time) { return time.getTime() > Date.now() } }">
            </el-date-picker>
          </el-form-item>
          <br>
          <el-form-item label="身份证正面" prop="legal_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinUploadApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.legal_img = res.url }">
              <img v-if="shopForm.legal_img" :src="shopForm.legal_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <a v-if="shopForm.legal_img" :href="shopForm.legal_img" target="_blank" class="see-original">查看原图</a>
          </el-form-item>
          <br>
          <el-form-item label="营业执照" prop="licence_img">
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
        <el-tab-pane label="统一社会信用代码" name="organization">
          <el-form-item label="统一社会信用代码" prop="organization_code">
            <el-input v-model="shopForm.organization_code" :maxlength="50"></el-input>
          </el-form-item>
          <!-- <br>
          <el-form-item label="组织机构代码证件" prop="code_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinUploadApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.code_img = res.url }">
              <img v-if="shopForm.code_img" :src="shopForm.code_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <a v-if="shopForm.code_img" :href="shopForm.code_img" target="_blank" class="see-original">查看原图</a> -->
          <!-- </el-form-item> -->
        </el-tab-pane>
        <el-tab-pane label="开户行银行许可证" name="bank">
          <el-form-item label="银行开户名" prop="bank_account_name">
            <el-input v-model="shopForm.bank_account_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="公司银行账号" prop="bank_number">
            <el-input v-model="shopForm.bank_number" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="开户银行支行名称" prop="bank_name">
            <el-input v-model="shopForm.bank_name" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="开户行所在地" prop="bank_region">
            <en-region-picker :api="MixinRegionApi" :default="defaultRegionBank" @changed="(object) => { shopForm.bank_region = object.last_id }"/>
          </el-form-item>
          <br>
          <!-- <el-form-item label="开户行许可证" prop="bank_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinUploadApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.bank_img = res.url }">
              <img v-if="shopForm.bank_img" :src="shopForm.bank_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <a v-if="shopForm.bank_img" :href="shopForm.bank_img" target="_blank" class="see-original">查看原图</a>
          </el-form-item> -->
        </el-tab-pane>
        <el-tab-pane label="税务登记证" name="taxes">
          <el-form-item label="税务登记证号" prop="taxes_certificate_num">
            <el-input v-model="shopForm.taxes_certificate_num" :maxlength="50"></el-input>
          </el-form-item>
          <!-- <el-form-item label="纳税人识别号" prop="taxes_distinguish_num">
            <el-input v-model="shopForm.taxes_distinguish_num" :maxlength="50"></el-input>
          </el-form-item>
          <br> -->
          <!-- <el-form-item label="一般纳税人证明" prop="taxes_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinUploadApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.taxes_img = res.url }">
              <img v-if="shopForm.taxes_img" :src="shopForm.taxes_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <a v-if="shopForm.taxes_img" :href="shopForm.taxes_img" target="_blank" class="see-original">查看原图</a>
          </el-form-item>
          <br> -->
          <!-- <el-form-item label="税务登记证" prop="taxes_certificate_img">
            <el-upload
              class="avatar-uploader"
              :action="MixinUploadApi"
              :show-file-list="false"
              :on-success="(res) => { shopForm.taxes_certificate_img = res.url }">
              <img v-if="shopForm.taxes_certificate_img" :src="shopForm.taxes_certificate_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <a v-if="shopForm.taxes_certificate_img" :href="shopForm.taxes_certificate_img" target="_blank" class="see-original">查看原图</a>
          </el-form-item> -->
        </el-tab-pane>
        <el-tab-pane label="店铺信息" name="shop">
          <el-form-item label="店铺名称" prop="shop_name">
            <el-input v-model="shopForm.shop_name" :maxlength="12"></el-input>
          </el-form-item>
          <el-form-item label="店铺所在地" prop="shop_region">
            <en-region-picker :api="MixinRegionApi" :default="defaultRegionShop" @changed="(object) => { shopForm.shop_region = object.last_id }" />
          </el-form-item>
          <el-form-item label="佣金比例" prop="shop_commission">
            <el-input v-model="shopForm.shop_commission" :maxlength="50">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="经营类目" name="category">
          <el-form-item label="经营类目" prop="goods_management_category" class="form-item-cat">
            <el-checkbox :indeterminate="isIndeterminateCat" v-model="checkAllCat" @change="handleCheckAllCatChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="shopForm.goods_management_category" @change="handleCheckedCatsChange">
              <el-checkbox v-for="cat in categorys" :label="cat.id" :key="cat.id">{{ cat.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="店铺预设" name="store">
          <el-form-item label="门店类型" prop="store_flag" class="bbc-shopEdit" style="width:100%;">
            <el-radio v-model="shopForm.store_flag" label="1">平台自营</el-radio>
            <el-radio v-model="shopForm.store_flag" label="2">商户自营</el-radio>
            <el-radio v-model="shopForm.store_flag" label="3">普通门店</el-radio>
            <el-radio v-model="shopForm.store_flag" label="4">C米商城</el-radio>
            <el-radio v-model="shopForm.store_flag" label="5">俱乐部商城</el-radio>
          </el-form-item>
          <el-form-item label="商品展示" prop="store_flag" class="bbc-shopEdit">
            <!-- <el-checkbox-group v-model="shopForm.value">goods_show_management -->
            <el-checkbox-group  v-model="goods_show_managements" >
              <el-checkbox  v-for="item in shopshows" :key="item.id" :label="item.id" >{{item.name}}</el-checkbox>
              <!-- <el-checkbox label="1">商城</el-checkbox> -->
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="店铺保证金" name="cash">
          <el-form-item label="保证金金额" prop="margin_trade" class="bbc-shopEdit">
            <!-- {{shopForm.margin_trade == null ? 0 : shopForm.margin_trade}} 元 -->
            <el-input placeholder="保证金金额" prop="margin_trade" v-model="shopForm.margin_trade">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="保证金支付方式" prop="cash_deposit" class="bbc-shopEdit">
            <el-radio v-model="cash_deposit" label="0">线下</el-radio>
            <el-radio v-model="cash_deposit" label="1">线上</el-radio>
          </el-form-item>
          <el-form-item label="保证金支付完成" prop="cash_deposit_freeze" class="bbc-shopEdit">
            <el-radio v-model="cash_deposit_freeze" label="0">否</el-radio>
            <el-radio v-model="cash_deposit_freeze" label="1">是</el-radio>
          </el-form-item>
          <el-form-item label="保证金是否冻结" class="bbc-shopEdit">
            <el-radio v-model="shopForm.cash_deposit_freeze" label="0">未冻结</el-radio>
            <el-radio v-model="shopForm.cash_deposit_freeze" label="1">冻结</el-radio>
          </el-form-item>
          <el-form-item label="是否发现好店" prop="label_good_shop" class="bbc-shopEdit">
            <el-radio v-model="shopForm.label_good_shop" label=0>否</el-radio>
            <el-radio v-model="shopForm.label_good_shop" label=1>是</el-radio>
          </el-form-item>
        </el-tab-pane>
        <!-- 资质审核 -->
        <!-- :on-success="(res) => { shopForm.legal_img = res.url;}" -->
        <el-tab-pane label="资质审核" name="qualification">
          <!-- 商标注册证 -->
          <el-form-item label="商标注册证" prop="trademark" class="imgDataS"  v-if="shopForm.trademark">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.trademark"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.trademark.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.trademark = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 产品检测报告 -->
          <el-form-item label="产品检测报告" prop="product_test_report" class="imgDataS"  v-if="shopForm.product_test_report">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.product_test_report"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.product_test_report.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.product_test_report = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 代理品牌授权委托书 -->
          <el-form-item label="代理品牌授权委托书" prop="agent_brand" class="imgDataS"  v-if="shopForm.agent_brand">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.agent_brand"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.agent_brand.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.agent_brand = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 一年内中华人民共和国海关进口货物报关单复印件 -->
          <el-form-item label="一年内中国海关进口货物报关单复印件" prop="year_customs_copy" class="imgDataS"  v-if="shopForm.year_customs_copy">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.year_customs_copy"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.year_customs_copy.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.year_customs_copy = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 化妆品卫生许可证 -->
          <el-form-item label="化妆品卫生许可证" prop="cosmetic_hygiene_permit" class="imgDataS"  v-if="shopForm.cosmetic_hygiene_permit">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.cosmetic_hygiene_permit"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.cosmetic_hygiene_permit.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.cosmetic_hygiene_permit = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 化妆品生产许可证 -->
          <el-form-item label="化妆品生产许可证" prop="cosmetics_production_license" class="imgDataS"  v-if="shopForm.cosmetics_production_license">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.cosmetics_production_license"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.cosmetics_production_license.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.cosmetics_production_license = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 特殊用途化妆品卫生许可批件复印件 -->
          <el-form-item label="特殊用途化妆品卫生许可批件复印件" prop="special_cosmetics" class="imgDataS"  v-if="shopForm.special_cosmetics">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.special_cosmetics"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.special_cosmetics.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.special_cosmetics = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 近两年内中华人民共和国海关进口货物报关单复印件 -->
          <el-form-item label="近两年内中华人民共和国海关进口货物报关单复印件" prop="two_years_customs_import" class="imgDataS"  v-if="shopForm.two_years_customs_import">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.two_years_customs_import"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.two_years_customs_import.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.two_years_customs_import = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 近两年内的商品出入境检验检疫卫生证书复印件 -->
          <el-form-item label="近两年内的商品出入境检验检疫卫生证书复印件" prop="two_years_immigration_inspection" class="imgDataS"  v-if="shopForm.two_years_immigration_inspection">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.two_years_immigration_inspection"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.two_years_immigration_inspection.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.two_years_immigration_inspection = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 中华人民共和国进口非特殊用途化妆品备案凭证复印件 -->
          <el-form-item label="近两年内的商品出入境检验检疫卫生证书复印件" prop="import_non_special" class="imgDataS"  v-if="shopForm.import_non_special">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.import_non_special"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.import_non_special.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.import_non_special = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 中华人民共和国进口特殊用途化妆品许可批件 -->
          <el-form-item label="中华人民共和国进口特殊用途化妆品许可批件" prop="special_purpose_cosmetics" class="imgDataS"  v-if="shopForm.special_purpose_cosmetics">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.special_purpose_cosmetics"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.special_purpose_cosmetics.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.special_purpose_cosmetics = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 食品生产许可证 -->
          <el-form-item label="食品生产许可证" prop="food_production_licence" class="imgDataS"  v-if="shopForm.food_production_licence">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.food_production_licence"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.food_production_licence.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.food_production_licence = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 食品流通许可证 -->
          <el-form-item label="食品生产许可证" prop="food_circulation_permit" class="imgDataS"  v-if="shopForm.food_circulation_permit">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.food_circulation_permit"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.food_circulation_permit.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.food_circulation_permit = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 产品对应的3C认证书 -->
          <el-form-item label="产品3C认证书" prop="hs_mark_3c" class="imgDataS"  v-if="shopForm.hs_mark_3c">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.hs_mark_3c"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.hs_mark_3c.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.hs_mark_3c = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 机构服务资质 -->
          <el-form-item label="机构服务资质" prop="service_qualification" class="imgDataS"  v-if="shopForm.service_qualification">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.service_qualification"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.service_qualification.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.service_qualification = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <!-- 卫生许可证 -->
          <el-form-item label="卫生许可证" prop="hygienic_license" class="imgDataS"  v-if="shopForm.hygienic_license">
            <el-upload
              :action="MixinUploadApi"
              list-type="picture-card"
              :file-list = "shopForm.hygienic_license"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-success="(response, file, fileList) => { this.shopForm.hygienic_license.push({url:response.url}) }"
              :on-remove="(file,fileList) => {this.shopForm.hygienic_license = fileList}">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

        </el-tab-pane>
      </el-tabs>

      <div class="save-btn-box">
        <el-button type="primary" @click="handleSaveEdit">{{ isAudit ? '通过并保存' : '保存修改'}}</el-button>
        <el-button v-if="isAudit" type="danger" @click="handleRefusePass">拒绝通过</el-button>
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
          company_name: [this.MixinRequired('公司名称不能为空！')],
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
          link_name: [this.MixinRequired('联系姓名不能为空！')],
          link_phone: [this.MixinRequired('联系电话不能为空！')],
          company_email: [this.MixinRequired('公司电子邮箱不能为空！')],
          legal_name: [this.MixinRequired('法人姓名不能为空！')],
          legal_id: [this.MixinRequired('身份证正面不能为空！')],
          license_num: [this.MixinRequired('营业执照不能为空！')],
          scope: [this.MixinRequired('法定经营范围不能为空！')],
          license_region: [this.MixinRequired('请选择营业执照所在地！')],
          license_add: [this.MixinRequired('营业执照详细地址不能为空！')],
          establish_date: [this.MixinRequired('请选择公司成立日期！')],
          licence_start: [this.MixinRequired('请选择营业执照有效期开始时间！')],
          licence_end: [this.MixinRequired('请选择营业执照有效期结束时间！')],
          legal_img: [this.MixinRequired('请上传身份证正面！')],
          licence_img: [this.MixinRequired('请上传营业执照！')],
          bank_account_name: [this.MixinRequired('银行开户名不能为空！')],
          bank_number: [this.MixinRequired('公司银行账号不能为空！')],
          bank_name: [this.MixinRequired('开户银行支行名称不能为空！')],
          bank_region: [this.MixinRequired('请选择开户行所在地！')],
          // bank_img: [this.MixinRequired('请上传开户行许可证！')],
          // taxes_certificate_num: [this.MixinRequired('税务登记证号不能为空！')],
          // taxes_distinguish_num: [this.MixinRequired('纳税人识别号不能为空！')],
          taxes_certificate_img: [this.MixinRequired('请选择税务登记证！')],
          shop_name: [this.MixinRequired('店铺名称不能为空！')],
          shop_region: [this.MixinRequired('请选择店铺所在地！')],
          shop_commission: [this.MixinRequired('店铺佣金比例不能为空！')],
          goods_management_category: [this.MixinRequired('请选择店铺经营类目！')],
          store_flag: [this.MixinRequired('请选择门店类型！')]
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
      /** 保存修改 */
      handleSaveEdit() {
        this.$refs['shopForm'].validate((valid, error) => {
          if (valid) {
            const params = this.MixinClone(this.shopForm)
            params.cash_deposit = this.cash_deposit + ':' + this.cash_deposit_freeze
            if (this.isAudit) {
              params.pass = 1
            }
            params.licence_start /= 1000
            params.licence_end /= 1000
            params.establish_date /= 1000
            // 处理资质审核数据
            if(params.trademark instanceof Array && params.trademark.length > 0){
              let newDataArray = this.shopForm.trademark.map((item)=>{return item.url})
              params.trademark = newDataArray.join(',')
              console.log(params.trademark,123)
              // return
            }

            if(params.product_test_report instanceof Array && params.product_test_report.length > 0){
              let newDataArray = this.shopForm.product_test_report.map((item)=>{return item.url})
              params.product_test_report = newDataArray.join(',')
            }

            if(params.agent_brand instanceof Array && params.agent_brand.length > 0){
              let newDataArray = this.shopForm.agent_brand.map((item)=>{return item.url})
              params.agent_brand = newDataArray.join(',')
            }

            if(params.year_customs_copy instanceof Array && params.year_customs_copy.length > 0){
              let newDataArray = this.shopForm.year_customs_copy.map((item)=>{return item.url})
              params.year_customs_copy = newDataArray.join(',')
            }

            if(params.cosmetic_hygiene_permit instanceof Array && params.cosmetic_hygiene_permit.length > 0){
              let newDataArray = this.shopForm.cosmetic_hygiene_permit.map((item)=>{return item.url})
              params.cosmetic_hygiene_permit = newDataArray.join(',')
            }

            if(params.cosmetics_production_license instanceof Array && params.cosmetics_production_license.length > 0){
              let newDataArray = this.shopForm.cosmetics_production_license.map((item)=>{return item.url})
              params.cosmetics_production_license = newDataArray.join(',')
            }

            if(params.special_cosmetics instanceof Array && params.special_cosmetics.length > 0){
              let newDataArray = this.shopForm.special_cosmetics.map((item)=>{return item.url})
              params.special_cosmetics = newDataArray.join(',')
            }

            if(params.two_years_customs_import instanceof Array && params.two_years_customs_import.length > 0){
              let newDataArray = this.shopForm.two_years_customs_import.map((item)=>{return item.url})
              params.two_years_customs_import = newDataArray.join(',')
            }

            if(params.two_years_immigration_inspection instanceof Array && params.two_years_immigration_inspection.length > 0){
              let newDataArray = this.shopForm.two_years_immigration_inspection.map((item)=>{return item.url})
              params.two_years_immigration_inspection = newDataArray.join(',')
            }

            if(params.import_non_special instanceof Array && params.import_non_special.length > 0){
              let newDataArray = this.shopForm.import_non_special.map((item)=>{return item.url})
              params.import_non_special = newDataArray.join(',')
            }

            if(params.special_purpose_cosmetics instanceof Array && params.special_purpose_cosmetics.length > 0){
              let newDataArray = this.shopForm.special_purpose_cosmetics.map((item)=>{return item.url})
              params.special_purpose_cosmetics = newDataArray.join(',')
            }

            if(params.food_production_licence instanceof Array && params.food_production_licence.length > 0){
              let newDataArray = this.shopForm.food_production_licence.map((item)=>{return item.url})
              params.food_production_licence = newDataArray.join(',')
            }

            if(params.food_circulation_permit instanceof Array && params.food_circulation_permit.length > 0){
              let newDataArray = this.shopForm.food_circulation_permit.map((item)=>{return item.url})
              params.food_circulation_permit = newDataArray.join(',')
            }

            if(params.hs_mark_3c instanceof Array && params.hs_mark_3c.length > 0){
              let newDataArray = this.shopForm.hs_mark_3c.map((item)=>{return item.url})
              params.hs_mark_3c = newDataArray.join(',')
            }

            if(params.service_qualification instanceof Array && params.service_qualification.length > 0){
              let newDataArray = this.shopForm.service_qualification.map((item)=>{return item.url})
              params.service_qualification = newDataArray.join(',')
            }

            if(params.hygienic_license instanceof Array && params.hygienic_license.length > 0){
              let newDataArray = this.shopForm.hygienic_license.map((item)=>{return item.url})
              params.hygienic_license = newDataArray.join(',')
            }
            params.goods_show_management = this.goods_show_managements.join(',')
            // debugger
            console.log(params,741)
            API_Shop.editAuthShop(this.shop_id, params).then(response => {
              // debugger
              if (this.isAudit) {
                this.$message.success('审核通过！')
                this.isAudit = false
              } else {
                this.$message.success('修改成功！')
              }
              const { callback } = this.$route.params
              typeof callback === 'function' && callback()
              this.$store.dispatch('delCurrentViews', {
                view: this.$route,
                $router: this.$router
              })
            })
          } else {
            this.$message.error('表单填写有误，请核对！')
            // 找到出错的第一个tab
            // 再将tab切换过去
            const firstError = Object.keys(error)[0]
            let tabChildren = this.$refs['tabs'].$children
            for (let i = 0; i < tabChildren.length; i++) {
              const item = tabChildren[i]
              let finded = false
              for (let j = 0; j < item.$children.length; j++) {
                if (item.$children[j].prop === firstError) {
                  this.tableName = item.name
                  finded = true
                  break
                }
              }
              if (finded) break
            }
            return false
          }
        })
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
    width: 180px;
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
    background-color: #fff;
    padding: 10px 0;
    border: 1px solid #dcdfe6;
    border-top: 0;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
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
