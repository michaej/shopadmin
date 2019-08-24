<template>
  <div v-loading="loading">
    <!--步骤2-->
    <div class="content-goods-publish">
      <!--商品详情-->
      <el-form
        :model="baseInfoForm"
        status-icon
        :rules="baseInfoFormRule"
        label-position="right"
        ref="baseInfoForm"
        label-width="120px"
        class="demo-ruleForm">
        <!--商品信息-->
        <div class="base-info-item">
          <!-- <h4>商品信息</h4> -->
          <div>
            <el-form-item label="门店名称">
              <el-input disabled v-model="this.tableData.shop_name" maxlength="60" minlength="3" placeholder="门店名称"></el-input>
            </el-form-item>
            <el-form-item label="问题描述">
              <el-input disabled v-model="this.tableData.description" maxlength="60" minlength="3" placeholder="问题描述"></el-input>
            </el-form-item>
          </div>
        </div>

        <el-table
          :data="limitList"
          border
          v-if="false"
          style="width: 100%">
          <el-table-column
            v-for="(item, index) in limitTableHead"
            v-if="item !== 'spec_value_id'"
            :key="item"
            :label="labeltxt(item)"
            align="center"
          >
            <template slot-scope="scope">
          <span v-if="checkFixed(item)">
            <span v-if="item === 'price'"> {{ scope.row[item] | unitPrice('￥')}}</span>
            <span v-else> {{ scope.row[item] }}</span>
          </span>
              <div v-else class="input-error-model">
                <el-input
                  :disabled="isEditModel === 1 && item==='quantity'"
                  v-model="scope.row[item]"
                  @input="updateSkuTable(index, scope, item)"
                  @blur="updateSkuTable(index, scope, item)"
                  :maxlength="30">
                </el-input>
                <span
                  class="input-error"
                  v-show="isValidate(index, scope)">{{ validatatxt }}
            </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="base-info-item">
          <!-- <h4>商品详情</h4> -->
        </div>
        <div class="content-goods-publish">
          <el-form-item class="goods-intro" label="回复：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 4}"
              placeholder="请输入内容"
              v-model="tableData.reply_content">
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--底部-->
    <div class="footer">
      <el-button-group>
        <el-button type="primary" @click="aboveGoods">确认回复</el-button>
        <!-- <el-button v-if="currentStatus!=1" type="primary" @click="saveDraft">保存草稿</el-button> -->
        <!--<el-button type="primary" @click="saveDraft">保存草稿</el-button>-->
      </el-button-group>
    </div>

  </div>
</template>

<script>
  // 接口地址文件新复制一份做活动用，现在的是原商城的地址
  import * as API_goods from '@/api/goods'
  import * as API_goodsCategory from '@/api/goodsCategory'
  import * as API_goodClassify from "@/api/activityGoodsClassify";
  import {CategoryPicker, SkuSelector, SkuActivity, UE} from '@/components'
  import {RegExp} from '~/ui-utils'
  import Sortable from 'sortablejs'
  import ElInput from 'element-ui/packages/input/src/input'
  import EnSkuSelector from "../../components/SkuSelector/src/main";


  export default {
    name: 'goodsPublish',
    components: {
      EnSkuSelector,
      ElInput,
      [CategoryPicker.name]: CategoryPicker,
      [SkuSelector.name]: SkuSelector,
      [SkuActivity.name]: SkuActivity,
      [UE.name]: UE
    },
    props: {
      /** 表头信息 */
      limitTableHead: {
        type: Array,
        default: () => []
      }
    },

    data() {
      const checkSn = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品编号不能为空'))
        }
        setTimeout(() => {
          if (!/^[a-zA-Z0-9_\\-]+$/g.test(value)) {
            callback(new Error('请输入数字、字母、下划线或者中划线'))
          } else {
            callback()
          }
        }, 1000)
      }
      const checkSupplier = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('供应商名称不能为空'))
        }
        setTimeout(() => {
          if (value.length < 3 || value.length > 60) {
            callback(new Error('请输入字符应在3-60个范围内'))
          } else {
            callback()
          }
        }, 1000)
      }
      const checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品名称不能为空'))
        }
        setTimeout(() => {
          if (value.length < 3 || value.length > 60) {
            callback(new Error('请输入字符应在3-60个范围内'))
          } else {
            callback()
          }
        }, 1000)
      }

      const checkMarket = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('市场价格不能为空'))
        }
        if (value <= 0) {
          return callback(new Error('市场价格不能小于或者为0'))
        }
        setTimeout(() => {
          if (!RegExp.money.test(value)) {
            callback(new Error('请输入正整数或者两位小数'))
          } else {
            if (parseFloat(value) < parseFloat(this.baseInfoForm.cost)) {
              callback(new Error('市场价格必须大于等于成本价格'))
            } else {
              callback()
            }
          }
        }, 1000)
      }

      const checkPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品价格不能为空'))
        }
        if (value < 0) {
          return callback(new Error('商品价格不能小于0'))
        }
        setTimeout(() => {
          if (!RegExp.money.test(value)) {
            callback(new Error('请输入正整数或者两位小数'))
          } else {
            callback()
          }
        }, 1000)
      }
      const checkTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择时间'))
        }
        setTimeout(() => {
          if (value <= (new Date().getTime())) {
            callback(new Error('选择时间必须大于当前时间'))
          } else {
            callback()
          }
        }, 1000)
      }

      const checkbuy_limit = (rule, value, callback) => {
        if (value === null || value === '') {
          return callback(new Error('请选择是否限购'))
        }

        setTimeout(() => {
          if (value === 1) {
            if (!this.baseInfoForm.limit_num) {
              return callback(new Error('请填写限购数量'))
            }

            if (this.baseInfoForm.limit_num <= 0) {
              return callback(new Error('限购数不能小于等于0'))
            }

            callback()
          } else {
            callback()
          }
        }, 1000)
      }

      const checkWeight = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('重量不能为空'))
        }
        setTimeout(() => {
          if (!RegExp.money.test(value)) {
            callback(new Error('请输入正整数或者两位小数'))
          } else {
            callback()
          }
        }, 1000)
      }

      const checkTplId = (rule, value, callback) => {
        if (this.baseInfoForm.goods_transfee_charge === 0 && !value) {
          return callback(new Error('请选择一种模板'))
        } else {
          callback()
        }
      }

      const checkExchangePoint = (rule, value, callback) => {
        if (this.baseInfoForm.exchange.enable_exchange && !this.baseInfoForm.exchange.exchange_point) {
          return callback(new Error('积分值不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(this.baseInfoForm.exchange.exchange_point)) {
            callback(new Error('请输入数字值'))
          } else {
            if (this.baseInfoForm.exchange.exchange_point <= 0) {
              callback(new Error('请输入大于0的积分值'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
        // 验证团购价格
      const checkGroupName =  (rule, value, callback) => {

      }
      const checkGroupPeople =  (rule, value, callback) => {

      }

      return {
        categoryId:'',
        cate1:'',
        cate2:'',
        cate3:'',
        options1:'',
        options2:'',
        options3:'',
        chioseCategoryList: [],
        categoryRadio: '',
        categoryDialogVisible: false,
        indexH: 1000,
        tableData: [],
        /** 店铺信息 */
        shopInfo: this.$store.getters.shopInfo,

        /** 加载中。。。 */
        loading: false,

        /** 当前状态/模式 默认发布商品0 编辑商品1 编辑草稿箱商品2 */
        currentStatus: 0,

        /** 当前点击的1级分类索引*/
        activeCategoryIndex1: -1,

        /** 当前点击的2级分类索引*/
        activeCategoryIndex2: -1,

        /** 当前点击的3级分类索引*/
        activeCategoryIndex3: -1,

        /** 当前商品分类名称1*/
        activeCategoryName1: '',

        /** 当前商品分类名称2*/
        activeCategoryName2: '',

        /** 当前商品分类名称3*/
        activeCategoryName3: '',

        /** 当前商品id*/
        activeGoodsId: '',
        activeSellerId: '',

        /** 当前点击的C米1级分类索引 */
        activeCMiIndex1: -1,

        /** 当前点击的C米2级分类索引 */
        activeCMiIndex2: -1,

        /** 当前点击的C米3级分类索引 */
        activeCMiIndex3: -1,

        /** 当前Cmi分类名称1 */
        cMiName1: '',

        /** 当前Cmi分类名称2 */
        cMiName2: '',

        /** 当前Cmi分类名称3 */
        cMiName3: '',

        /** 1级分类列表*/
        categoryListLevel1: [],

        /** 2级分类列表*/
        categoryListLevel2: [],

        /** 3级分类列表*/
        categoryListLevel3: [],

        /** 1级C米分类列表 */
        cMListLevel1: [],

        /** 2级C米分类列表 */
        cMListLevel2: [],

        /** 3级C米分类列表 */
        cMListLevel3: [],

        /** 商品详情信息提交表单 */
        baseInfoForm: {
          /** 品牌id */
          brand_id: '',

          /** 标签id */
          choose_labels: [],

          /** 商城分类id */
          category_id: 0,

          /** 商城分类 名称 */
          category_name: '',

          /** 供应商名称 */
          supplier: '',

          /** 商品名称 */
          goods_name: '',

          /** 商品编号 sn*/
          sn: '',

          /** 商品价格 */
          price: '',

          /** 市场价格 */
          mktprice: '',

          /** 成本价格 */
          cost: '',

          /** 交易方式 */
          trade_mode: 0,

          /** 是否支持退款 */
          can_refund: 0,

          /** 运费 */
          freight_price: '',

          /** 商品相册列表 */
          goods_gallery_list: [],

          /** 用来校验的商品相册 */
          goods_gallery: '',

          /** 团购价格列表 */
          group: [],

          /** 商品总库存 */
          quantity: 0,

          /** 卖家承担运费1 买家承担运费0 */
          goods_transfee_charge: 1,

          /** sku数据变化或者组合变化判断 0:没变化，1：变化 */
          has_changed: 0,

          /** 是否上架，1上架 0下架 */
          market_enable: 1,

          /** 模板运费id */
          template_id: '',

          /** 积分兑换 */
          exchange: {
            /** 积分兑换所属一级分类 */
            category_id: '',

            /** 是否允许积分兑换  1是 0否*/
            enable_exchange: 1,

            /** 兑换所需金额 */
            exchange_money: 0,

            /** 积分兑换使用的积分 */
            exchange_point: 0,

            /** 商品排序 */
            sort: 0
          },

          /** 店铺分组id*/
          shop_cat_id: 0,

          /** seo描述 */
          meta_description: '',

          /** seo关键字 */
          meta_keywords: '',

          /** seo标题 */
          page_title: '',

          /** 商品参数列表 */
          goods_params_list: [],

          /** sku列表 */
          sku_list: [],

          /** 商品描述 详情 */
          intro: '',

          /** 是否分次支付 */
          split_pay: 0
        },
        /** 是否包税 选项 */
        including_taxList: [
          {
            value: '7',
            label: '7'
          }, {
            value: '11.2',
            label: '11.2'
          }, {
            value: '20.222',
            label: '20.222'
          }, {
            value: '25.529',
            label: '25.529'
          }, {
            value: '31.5',
            label: '31.5'
          }
        ],
        /** 临时存储商品相册信息 */
        goodsGalleryList: [],

        /** 用来向组件中传递的数据 */
        skuList: [],

        /** 用来向组件中传递的数据 */
        limitList: [],

        /** 团购表头*/
        // limitTableHead: [],

        /** 是否自动生成货号 */
        productSn: false,

        /** 请求的商品参数组列表 */
        goodsParams: [
          {
            group_id: '',
            group_name: '',
            params: [
              {
                param_id: 0,
                param_name: '',
                param_type: 1,
                param_value: '',
                required: 0,
                option_list: [
                  {value: 1, label: ''},
                  {value: 2, label: ''}
                ]
              }
            ]
          }
        ],

        /** */
        collapseVal: [],

        /** 品牌列表 */
        brandList: [],

        /** 运费模板列表 */
        tplList: [],

        /** 积分商品列表 */
        exchangeGoodsCatrgoryList: [],

        /** 商品图片放大地址 */
        dialogImageUrl: '',

        /** 是否显示放大图片弹框 */
        dialogImage: false,

        /** 是否显示积分配置*/
        isShowExchangeConfig: true,

        /** 商品详情的校验规则 */
        baseInfoFormRule: {
          supplier: [
            {required: true, message: '请输入问题分类', trigger: 'blur'},
            {validator: checkSupplier, trigger: 'blur'}
          ],
          goods_name: [
            {required: true, message: '请输入问题描述', trigger: 'blur'},
            {validator: checkName, trigger: 'blur'}
          ],
          // sn: [
          //   {required: true, message: '请输入商品编号', trigger: 'blur'},
          //   {validator: checkSn, trigger: 'blur'}
          // ],
          // mktprice: [
          //   {required: true, message: '请输入市场价格', trigger: 'blur'},
          //   {validator: checkMarket, trigger: 'blur'}
          // ],
          // price: [
          //   {required: true, message: '请输入商品价格', trigger: 'blur'},
          //   {validator: checkPrice, trigger: 'blur'}
          // ],
          // cost: [
          //   {required: true, message: '请输入商品供货价', trigger: 'blur'},
          //   {validator: checkPrice, trigger: 'blur'}
          // ],
          // freight_price: [
          //   {required: true, message: '请输入运费', trigger: 'blur'},
          //   {validator: checkPrice, trigger: 'blur'}
          // ],
          // begin_time: [
          //   {required: true, message: '请输入团购开始时间', trigger: 'blur'},
          //   {validator: checkTime, trigger: 'blur'}
          // ],
          // end_time: [
          //   {required: true, message: '请输入团购结束时间', trigger: 'blur'},
          //   {validator: checkTime, trigger: 'blur'}
          // ],
          // buy_limit: [
          //   {required: true, message: '请输入是否限购', trigger: 'blur'},
          //   {validator: checkbuy_limit, trigger: 'blur'}
          // ],
          // goods_gallery: [
          //   {required: true, message: '请选择商品相册', trigger: 'change'}
          // ],
          // quantity: [
          //   {required: true, message: '请填写总库存', trigger: 'blur'}
          // ],
          // template_id: [
          //   {validator: checkTplId, trigger: 'blur'}
          // ],
          // exchange_point: [
          //   {validator: checkExchangePoint, trigger: 'blur'}
          // ],
        },
        /** 商品规格存在   商品价格不可输入 */
        goodsPriceStatus: false,
        // 编辑关联标签 dialog
        dialogTagVisible: false,
        // 待选列表,
        waitSelectList: [],
        // 保存原列表
        constSelectList: [],
        // 已选列表
        selectedList: [],
        // 已选列表 中文
        selectedListText: '',
        // 搜索关键字
        searchKey: '',
        addStatus: ''
      }
    },
    beforeRouteUpdate(to, from, next) {
      // debugger

      next()
    },
    created(){
      this.activeSellerId = this.$route.query.sellerid;
      if (this.$route.query && this.$route.query.goodsid ) {
        console.log('this.$route.query.isdraft',this.$route.query.isdraft)
        this.currentStatus = parseInt(this.$route.querys.isdraft) || 0
        this.activeGoodsId = this.$route.query.goodsid
        this.activeSellerId = this.$route.query.sellerid
        this.addStatus = this.$route.query.market_enable
        if (this.currentStatus === 1 && this.$route.query.goodsid ) {
          this.GET_GoodData()
        } else if (this.currentStatus === 2 && this.$route.query.goodsid ) {
          console.log('123456')
          this.GET_GoodDraftData(this.$route.query.goodsid)
        }
      }
    },
    /** computed */
    computed: {
      includingTax() {
        return this.baseInfoForm.including_tax
      },

    },
    /** watch */
    watch: {
      includingTax(val) {
        if (val == 0) {
          if (this.baseInfoForm.tax_rate == 0 || this.baseInfoForm.tax_rate == undefined) {
            this.baseInfoForm.tax_rate = 11.2
          }
        }
      },
      skuList(val) {
        if (val.length > 0 && val[0] != undefined && this.baseInfoForm.goods_id) {
          this.goodsPriceStatus = true
        } else {
          this.goodsPriceStatus = false
        }
        console.log('skuList',val)
      },
      cate1(v,n){
        if(v){
          this.GET_Category(v,{},'options2');
          this.cate3 = ''
          this.cate2 = ''
        }
      },
      cate2(v,n){
        if(v){
          this.GET_Category(v,{},'options3');
          this.cate3 = ''
        }
      },
      cate3(v,n){
        if(v){
          this.getGoodsSku(v)
        }
      },
    },
    mounted() {
      this.GET_OrderList()
      this.GET_Category(0,{},'options1')
      if (this.$route.query && this.$route.query.goodsid) {
        // debugger
        console.log('this.$route.query.isdraft',this.$route.query.isdraft)
        this.currentStatus = parseInt(this.$route.query.isdraft) || 0
        this.addStatus = this.$route.params.market_enable
        this.activeGoodsId = this.$route.query.goodsid
        this.activeSellerId = this.$route.query.sellerid
        if (this.currentStatus === 1 && this.$route.query.goodsid) {
          this.GET_GoodData()
        } else if (this.currentStatus === 2 && this.$route.query.goodsid ) {
          this.GET_GoodDraftData(this.$route.query.goodsid)
        }
      }
      this.chioseCategoryList = []
      // API_goodClassify.getClassifyList().then(res => {
      //   this.chioseCategoryList = res.data
      // });
        
    },
    methods: {
      /** 查询规格*/
      getGoodsSku(id){
        API_goods.getGoodsSku(id,{}).then(res=>{
          this.skuList = res;
        })
      },
      handleChange1(e){
        console.log(e);
      },
      GET_Category( id, params, which ){
        API_goodsCategory.getGoodsCategoryLevelList(id,params).then(res=>{
          var data = res
          if (data.length) {
            data.forEach(item=>{
              item.label = item.name;
              item.value = item.category_id;
            })
            this[which] = data;
          }
        })
      },
      // 获取草稿箱
      GET_GoodDraftData(id){
        API_goods.getDraftGoods(id).then(response => {
          this.baseInfoForm = response
          this.baseInfoForm.goods_gallery = this.baseInfoForm.goods_gallery_list.toString()
          this.goodsGalleryList = this.baseInfoForm.goods_gallery_list
          this.goodsGalleryList.forEach(item => {
            item.url = item.original
          })
          /** 查询商品sku信息 */
          /** 构造临时规格数据 */
          var obj = {}
          this.skuList = res.map(key => {
            var spec_weight = key.weight;
            var spec_sn = key.sn;
            if (key && key.spec_list && Array.isArray(key.spec_list)) {
              const spec_list = key.spec_list.map(item => {
                let { spec_id, spec_image, spec_type, spec_value, spec_value_id, spec_name } = item
                return { spec_sn ,spec_weight, spec_id, spec_image, spec_type, spec_value, spec_value_id, spec_name }
              })

              let { sn, weight, cost, quantity, price, market_price } = key
              return { sn, weight, cost, quantity, price, market_price, spec_list }
            }
          })

        })
      },
      /** 查询单个商品信息*/
      GET_GoodData() {
        API_goods.getGoodData(this.activeGoodsId, {}).then((response) => {
          this.categoryRadio = response.category_id
          /** 此处完成商品信息赋值 进行判断如果有值的话 */
          this.baseInfoForm = {
            ...response
          }
          var cates = response.category_name.split('>');
          this.cate1 = response.category_name;
          this.categoryId = response.category_id;
          console.log('categoryId',this.categoryId)
          this.goodsGalleryList = [response.goods_gallery_list[0].original];
          this.baseInfoForm.goods_gallery = response.goods_gallery_list[0].original;
          // this.cate2 = cates[1];
          // this.cate3 = cates[2];
          /** 商品标签 */
          if(this.baseInfoForm.goods_labels){
            this.selectedListText = this.baseInfoForm.goods_labels.join(',')
          }

          /** 判断贵宾及铂金折扣有没有值 有值就保留两位小数 */
          if (this.baseInfoForm.platinum_discount != null) {
            this.baseInfoForm.platinum_discount = this.baseInfoForm.platinum_discount * 100
          }else if(this.baseInfoForm.platinum_discount == null){
            this.baseInfoForm.platinum_discount = 100
          }

          if (this.baseInfoForm.vip_discount != null) {
            this.baseInfoForm.vip_discount = this.baseInfoForm.vip_discount * 100
          }else{
            this.baseInfoForm.vip_discount = 100
          }
          // this.baseInfoForm.group.forEach(item => {
          //   item.group_id = item.id
          // })

          /** 商品相册校验属性 */
          this.baseInfoForm.goods_gallery_list.forEach(key => {
            this.$set(key, 'url', key.original)
          })
          this.$nextTick(() => { this.setSort() })
          this.baseInfoForm.goods_gallery = this.baseInfoForm.goods_gallery_list.toString()
          this.goodsGalleryList = JSON.parse(JSON.stringify(this.baseInfoForm.goods_gallery_list))
          /** 商品规格校验属性  */
          if (!this.baseInfoForm.sku_list || !Array.isArray(this.baseInfoForm.sku_list)) {
            this.baseInfoForm.sku_list = []
          }

          this.baseInfoForm.supplier = response.seller_name

          this.baseInfoForm.trade_mode = 0
          this.baseInfoForm.begin_time = response.begin_time * 1000
          this.baseInfoForm.end_time = response.end_time * 1000

          /** 默认设置分次支付参数 */
          if (this.baseInfoForm.split_pay == null) {
            this.baseInfoForm.split_pay = 0
          }

          API_goods.getGoodsSkuByGoodId(response.goods_id).then(res=>{
            /** 查询商品sku信息 */
            /** 构造临时规格数据 */
            console.log('res',res);
            this.skuList = res.map(key => {
              var spec_weight = key.weight;
              var spec_sn = key.sn;
              if (key && key.spec_list && Array.isArray(key.spec_list)) {
                const spec_list = key.spec_list.map(item => {
                  let { spec_id, spec_image, spec_type, spec_value, spec_value_id, spec_name } = item
                  return { spec_sn ,spec_weight, spec_id, spec_image, spec_type, spec_value, spec_value_id, spec_name }
                })

                let { sn, weight, cost, quantity, price, market_price } = key
                return { sn, weight, cost, quantity, price, market_price, spec_list }
              }
            })
          })





        })
      },
      categoryConfirm() {
        this.categoryRadio
        this.chioseCategoryList.forEach(item => {
          if (item.label_id == this.categoryRadio) {
            this.activeCategoryName1 = item.label_name
          }
        })
        this.categoryDialogVisible = false
      },
      changeCategory() {
        this.categoryDialogVisible = true
      },
      /** 保存草稿 */
      saveDraft() {
        const _params = this.generateFormData(this.baseInfoForm)
        /** 规格校验 */
        if (!this.skuFormVali(true)) {
          return
        }
        if (this.activeGoodsId) {
          this.activeGoodsId = this.activeGoodsId || 1
          /** 修改草稿箱商品 */
          // API_goods.editDraftGoods(this.activeGoodsId, _params).then(() => {
          //   this.$message.success('修改草稿箱商品成功')
          //   this.$router.push({path: '/goods/draft-list'})
          //   this.$route.params.callback()
          // })
        } else {
          /** 保存草稿操作 */
          _params.category_id = this.cate3||this.cate2;
          _params.category_name = '分类1';
          API_goods.saveDraft(_params).then(() => {
            this.$message.success('保存草稿成功')
            this.$route.params.callback()
            this.$router.push({path: '/goods/draft-list'})
          })
        }
      },
      /** 确认回复  */
      aboveGoods() {
        let params = {
            id: this.$route.params.id,
            reply_content: this.tableData.reply_content
        }
        API_goodsCategory.getCustomReply(params).then(response => {
          this.$message.success('回复成功！')
        }).catch(() => { this.loading = false })
      },

      /** 选择商城商品分类 */
      handleSelectCategory(row, index, level) {
        this.activeCategoryName1 = row.label_name
        this.activeCategoryIndex1 = index

// 设置当前商城分类ID
        this.baseInfoForm.category_id = row.label_id
      },

      /** 商品分组组件 改变时触发 */
      changeGoodsCateGory(val) {
        this.baseInfoForm.shop_cat_id = val[val.length - 1]
      },

      /** 商品品牌 改变时触发 */
      changeGoodsBrand(val) {
        this.baseInfoForm.brand_id = val
      },


      /** 选中值卖家运费/买家运费时出发 */
      changeTplItem(val) {
        if (val) {
          this.baseInfoForm.template_id = ''
        }
      },

      /** 运费模板改变时触发 */
      changeTpl(val) {
        this.baseInfoForm.template_id = this.baseInfoForm.goods_transfee_charge === 0 ? val : ''
      },

      /** 文件列表移除文件时的钩子  图片删除校验*/
      handleRemove(file, fileList) {
        this.baseInfoForm.goods_gallery_list.forEach((key, index) => {
          if (key.img_id !== -1) {
            if (key.img_id === file.img_id) {
              this.baseInfoForm.goods_gallery_list.splice(index, 1)
            }
          } else {
            if (key.name === file.name) {
              this.baseInfoForm.goods_gallery_list.splice(index, 1)
            }
          }
        })
        if (fileList.length <= 0) {
          this.baseInfoForm.goods_gallery_list = []
          this.baseInfoForm.goods_gallery = this.baseInfoForm.goods_gallery_list.toString()
        }
        this.$refs.baseInfoForm.validateField('goods_gallery')
      },

      /** 文件列表上传成功时的钩子  上传成功校验 */
      handleSuccess(response, file, fileList) {
        this.baseInfoForm.goods_gallery_list.push({
          img_id: -1,

          original: response.url,

          url: response.url,

          sort: 0,

          name: response.name,

          scale: response.scale
        })
        this.baseInfoForm.goods_gallery = this.baseInfoForm.goods_gallery_list.toString()
        this.$refs['baseInfoForm'].validateField('goods_gallery')
        this.$nextTick(() => {
          this.setSort()
        })
      },

      /** 点击已上传的文件链接时的钩子 放大 */
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogImage = true
      },

      /** 拖拽改变图片顺序 */
      setSort() {
        const el = document.querySelectorAll('div.avatar-uploader > ul.el-upload-list--picture-card')[0]
        this.sortable = Sortable.create(el, {
          ghostClass: 'sortable-ghost',
          setData: function (dataTransfer) {
          },
          onEnd: evt => {
            let temp = this.baseInfoForm.goods_gallery_list[evt.oldIndex]
            this.baseInfoForm.goods_gallery_list[evt.oldIndex] = this.baseInfoForm.goods_gallery_list[evt.newIndex]
            this.baseInfoForm.goods_gallery_list[evt.newIndex] = temp
          }
        })
      },

      /** 图片上传之前的校验  */
      beforeAvatarUpload(file) {
        const isType = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isType) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传商品相册图片大小不能超过 1MB!')
        }

        /** 重复校验*/
        const isExit = this.baseInfoForm.goods_gallery_list.some(key => {
          return file.name === key.name
        })
        if (isExit) {
          this.$message.error('图片已存在')
        }

        return isType && isLt1M && !isExit
      },

      /** 规格选择器规格数据改变时触发 */
      finalSku(val) {
        /** 动态修改总库存 每次设置为0  此处每次进行循环计算 存在性能浪费 */
        this.baseInfoForm.quantity = 0
        val.forEach(key => {
          if (key.quantity) {
            this.baseInfoForm.quantity += parseInt(key.quantity)
          }
        })
        /** 删除 因为对象浅拷贝造成的字段冗余（不必要的字段）*/
        val.forEach(key => {
          key.spec_list.forEach(item => {
            delete item.cost
            delete item.price
            delete item.quantity
            delete item.market_price
          })
        })
        this.baseInfoForm.sku_list = val
        /** 规格数据是否存在变化 */
        this.baseInfoForm.has_changed = 1
        /** 触发规格商品信息 */
        if (val.length == 0) {
          this.goodsPriceStatus = false
        } else {
          this.goodsPriceStatus = true
        }
      },

      /** 构造表单数据 */
      generateFormData(data) {
        let _params = {
          ...data
        }
        // 删除不必要的表单数据
        delete _params.original
        delete _params.exchange_category_id
        delete _params.exchange_point
        delete _params.gallery_list
        delete _params.goods_gallery
        if (_params.goods_gallery_list) {
          _params.goods_gallery_list.forEach(key => {
            delete key.name
            delete key.big
            delete key.goods_id
            delete key.isdefault
            delete key.small
            delete key.status
            delete key.thumbnail
            delete key.tiny
            delete key.uid
            delete key.url
          })
        }
        /** 积分商品数据 */
        if (!this.isShowExchangeConfig) {
          _params.exchange.enable_exchange = 0
        } else {
        }
        /** 运费模板 */
        _params.template_id = _params.template_id || 0
        /** 处理UE的信息 */
        _params.intro = this.$refs['ue'].getUEContent();
        return _params
      },

      /** 商品规格选择器校验 */
      skuFormVali(isDraft) {
        /** 如果并未选择规格 */
        if (Array.isArray(this.baseInfoForm.sku_list) && this.baseInfoForm.sku_list.length === 0) {
          return true
        }
        this.productSn = false
        /** 是否自动生成货号校验 检测是否所有的货号都存在*/
        const _sn = this.baseInfoForm.sku_list.some(key => {
          return key.sn === ''
        })
        if (_sn) {
          this.$confirm('确认自动生成货号, 是否继续?', '提示').then(() => {
            this.productSn = true
          })
          return false
        }
        if (isDraft) {
          this.productSn = true
          return true
        }
        /** 规格值空校验 */
        let _result = false
        this.baseInfoForm.sku_list.forEach(key => {
          Object.values(key).forEach(item => {
            if (!item && item !== 0) {
              _result = true
            }
          })
        })
        if (_result) {
          this.$message.error('存在未填写的规格值')
          return false
        }
        return true
      },
      /** 检查团购信息 */
      checkGroup(){
        if(this.baseInfoForm.group.length == 0){
          this.$message.error('请添加团购信息')
          return false
        }
        let _result = false
        this.baseInfoForm.group.forEach(key => {
          Object.values(key).forEach(item => {
            if (!item && item !== 0) {
              _result = true
            }
          })
        })
        if (_result) {
          this.$message.error('存在未填写的团购信息')
          return false
        }
        return true
      },
      /** 已选标签关闭 */
      handleClose(item, index) {
        this.selectedList.splice(index, 1);
        this.waitSelectList.push(item)
        this.constSelectList.push(item)

      },
      /** 待选标签选中加入到已选标签列表 */
      enterTag(item, index) {
        let numIndex1 = ''
        let numIndex2 = ''
        for (var i = 0; i < this.waitSelectList.length; i++) {
          if (this.waitSelectList[i].id == item.id) {
            numIndex1 = i
          }
        }
        for (var i = 0; i < this.constSelectList.length; i++) {
          if (this.constSelectList[i].id == item.id) {
            numIndex2 = i
          }
        }
        this.waitSelectList.splice(numIndex1, 1);
        this.constSelectList.splice(numIndex2, 1);
        this.selectedList.push(item)
      },
      /** 查询列表 */
      searchList(keyWord) {
        if (keyWord != '') {
          // 在待选数据中搜索
          let reg = new RegExp(keyWord)
          let newArr = []
          for (var i = 0; i < this.constSelectList.length; i++) {
            if (reg.test(this.constSelectList[i].text)) {
              newArr.push(this.constSelectList[i]);
            }
          }
          if (newArr.length > 0) {
            this.waitSelectList = this.MixinClone(newArr)
          } else {
            this.$message.error('查询结果为空！')
          }
        } else {
          this.waitSelectList = this.MixinClone(this.constSelectList)
        }

      },
      /** 发送标签表单 */
      submitTagForm() {
        this.baseInfoForm.choose_labels = this.selectedList.map((item) => {
          return item.id
        })
        this.selectedListText = this.selectedList.map((item) => {
          return item.text
        }).join(',')
        this.dialogTagVisible = false
      },
      guid() {
        return (((1+Math.random())*0x10000)|0)+""+(((1+Math.random())*0x1000)|0);
      },
      /** add团购价格表格-最多四项 */
      addGroup(_list) {
        if(_list.length>=4)
          this.$message({
              message: '团购项目不能超出四条！',
              type: 'warning'
          });
        else {
          _list.push({
            group_id:this.guid(),
            name:'',
            user_num:null,
            prescription:null,
            groupbuy_price:null
          });
          // 团购参数添加到规格明细
          // this.add
        }
        
      },
      /** 获取问题详情 */
      GET_OrderList() {
        let params = {
            id: this.$route.params.id
        }
        API_goodsCategory.getCustomList(params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      },
      /** 确认回复 */
      // GET_CustomReply() {
      //   let params = {
      //       id: this.$route.params.id,
      //       reply_content: this.tableData.reply_content
      //   }
      //   API_goodsCategory.getCustomReply(params).then(response => {
      //     this.$message.success('回复成功！')
      //   }).catch(() => { this.loading = false })
      // },
    }

  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*选择商品品类*/
  .content-goods-publish {
    padding: 15px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ddd;
    background: none repeat 0 0 #fff;

    /*商品品类*/
    .goods-category {
      text-align: left;
      padding: 10px;
      background: #fafafa;
      border: 1px solid #e6e6e6;
      ul {
        padding: 8px 4px 8px 8px;
        list-style: none;
        width: 300px;
        background: none repeat 0 0 #fff;
        border: 1px solid #e6e6e6;
        display: inline-block;
        letter-spacing: normal;
        margin-right: 15px;
        vertical-align: top;
        word-spacing: normal;
        li {
          line-height: 20px;
          padding: 5px;
          cursor: pointer;
          color: #333;
          font-size: 12px;
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    /** 当前品类被选中的样式 */
    .activeClass {
      background-color: #d9edf7;
      border: 1px solid #bce8f1;
      color: #3a87ad;
    }

    /*!*当前选择的商品品类文字*!*/
    .current-goods-category {
      text-align: left;
      padding: 10px;
      width: 100%;
      border: 1px solid #fbeed5;
      color: #c09853;
      background-color: #fcf8e3;
      margin: 10px auto;
      padding: 8px 35px 8px 14px;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
      font-size: 12px;
      font-weight: bold;
    }
  }

  /*编辑基本信息*/
  .el-form {
    padding-bottom: 80px;
    .el-form-item {
      width: 100%;
      text-align: left;
    }
  }

  /*平铺*/
  div.base-info-item > div {
    margin-left: 5%
  }

  div.base-info-item {
    h4 {
      margin-bottom: 10px;
      padding: 0 10px;
      border: 1px solid #ddd;
      background-color: #f8f8f8;
      font-weight: bold;
      color: #333;
      font-size: 14px;
      line-height: 40px;
      text-align: left;
    }

    /** 审核信息-拒绝原因 */
    .auth-info {
      color: red;
    }

    .el-form-item {
      width: 50%;
      min-width: 300px;
    }
    .goods-name-width {
      width: 50%;
      min-width: 300px;
    }
    .el-form-item__content {
      margin-left: 120px;
      text-align: left;
    }
    p.goods-group-manager {
      padding-left: 7.5%;
      text-align: left;
      color: #999;
      font-size: 13px;
    }

    /*!*积分提示*!*/
    p.exchange-tip {
      width: 40%;
      margin: 0 0 10px 38px;
      padding: 5px;
      padding-left: 5%;
      text-align: left;
      font-size: 13px;
      color: #8a6d3b;
      background: #fcf8e3;
      border: 1px solid #faebcc;
    }

    /*teatarea*/
    /deep/ .el-textarea {
      width: 150%;
    }
    .seo-text {
      width: 150%;
    }
  }

  /*折叠面板*/
  .el-collapse-item {
    /deep/ .el-collapse-item__header {
      text-align: left;
      background-color: #f8f8f8;
      padding: 0 10px;
      font-weight: bold;
      color: #333;
      font-size: 14px;
    }
    .el-form-item {
      margin-left: 5%;
      width: 25%;
    }
    /deep/ .el-form-item__content {
      margin-left: 120px;
      text-align: left;
    }
    p.goods-group-manager {
      padding-left: 12%;
      text-align: left;
      color: #999;
    }
    /*积分提示*/
    p.exchange-tip {
      margin: 0;
      padding: 10px;
      padding-left: 12%;
      text-align: left;
      color: #8a6d3b;
      background: #fcf8e3;
      border: 1px solid #faebcc;
    }
    /deep/ .el-collapse-item__content {
      padding: 10px 0;
      text-align: left;
    }
  }

  /*商品描述*/
  .goods-intro {
    line-height: 40;
  }

  /** 底部步骤 */
  .footer {
    width: 88.7%;
    padding: 10px;
    // background-color: #ffc;
    // position: fixed;
    // bottom: 0px;
    // left: 10%;
    text-align: center;
    z-index: 9999;
  }

  /*图片上传组件第一张图设置封面*/
  .goods-images {
    /deep/ li.el-upload-list__item:first-child {
      position: relative;
    }
    /deep/ li.el-upload-list__item:first-child:after {
      content: "封";
      color: #fff;
      font-weight: bold;
      font-size: 12px;
      position: absolute;
      left: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      padding-top: 6px;
      background: #13ce66;
      text-align: center;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      -webkit-box-shadow: 0 0 1pc 1px rgba(0, 0, 0, .2);
      box-shadow: 0 0 1pc 1px rgba(0, 0, 0, .2);
    }
  }

  .tagsList {
    width: 381px;
    // min-height: 140px;
    height: 160px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    /deep/ .el-tag {
      margin-left: 6px;
    }
    /deep/ .waitTag {
      cursor: pointer;
      background-color: rgba(64, 158, 255, .1);
      font-size: 12px;
      color: #409EFF;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid rgba(64, 158, 255, .2);
      white-space: nowrap;
      height: 24px;
      padding: 0 8px;
      line-height: 22px;
      display: inline-block;
      margin-left: 8px;
    }
  }

  .el-radio + .el-radio {
    margin-right: 30px;
    margin-left: 0;
    margin-bottom: 20px;
  }

  .el-radio {
    margin-right: 30px;
  }

  .addGroup{
      margin-left:10px;padding-left:20px;padding-right:20px;background-color: rgba(22, 155, 213, 1);border-radius: 5px;
  }
  /deep/ .groupPrice label::before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
</style>
