<!-- 还款明细 -->
<template>
  <div >
    <el-form :inline="true" :model="searchFrom" size="small" class="form-inline search-from">
      <el-form-item label="还款订单号">
        <el-input v-model.number="searchFrom.payNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="借款订单号">
        <el-input v-model.number="searchFrom.loanNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchFrom.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="searchFrom.idCard" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="放款时间">
        <el-date-picker 
          v-model="loanTime"
          type="daterange"
          @change="getLoanTime"
          range-separator="至"
          start-placeholder="起始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否结清">
        <el-select v-model="searchFrom.settleTag" clearable placeholder="请选择">
          <el-option
            v-for="item in arrset"
            :key="item.val"
            :label="item.name"
            :value="item.val">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否逾期">
        <el-select v-model="searchFrom.overdueTag" clearable placeholder="请选择">
          <el-option
            v-for="item in arrset"
            :key="item.val"
            :label="item.name"
            :value="item.val">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实还日期">
        <el-date-picker 
          v-model="actualPayTime"
          type="daterange"
          @change="getActualPayTime"
          range-separator="至"
          start-placeholder="起始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="应还日期">
        <el-date-picker 
          v-model="expectPayTime"
          type="daterange"
          @change="getEpectPayTime"
          range-separator="至"
          start-placeholder="起始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="ml10" @click="getPageList">搜索</el-button>
        <span v-if="checkAuth()" class="import-file rel">
          <i v-if="inputLoading" class="el-icon-loading"></i>
            导入
           <input v-if="!inputLoading" type="file" name="file" @change="inputfile" id="sendPic">
        </span>
        <el-button v-if="checkAuth()" type="danger" class="ml10" @click="deleteFile">清空</el-button>
      </el-form-item>
    </el-form>
     <div class="cont-table" v-heightAuto>
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading="listLoading"
        tooltip-effect="dark"  border
        style="width: 100%"
        class="custom-table mt15">
        <el-table-column
          label="序号"
          width="60"
          align="center">
          <template slot-scope="scope">{{ scope.row.rn }}</template>
        </el-table-column>
        <el-table-column
          label="还款订单号"
          align="center">
          <template slot-scope="scope">{{ scope.row.payNo }}</template>
        </el-table-column>
        <el-table-column
          label="借款订单号"
          align="center">
          <template slot-scope="scope">{{ scope.row.loanNo }}</template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          label="身份证号"
          width="180"
          align="center">
          <template slot-scope="scope">{{ scope.row.idCard }}</template>
        </el-table-column>
        <el-table-column
          label="放款时间"
          width="180"
          align="center">
          <template slot-scope="scope">{{ scope.row.loanTime }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="应还日期">
          <template slot-scope="scope">{{ scope.row.expectPayTime | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
        <el-table-column
          label="实还日期"
          width="100"
          align="center"
          >
          <template slot-scope="scope">{{ scope.row.actualPayTime | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="是否逾期">
        <template slot-scope="scope">{{scope.row.overdueTag?'是': '否'}}</template>
          
        </el-table-column>
        <el-table-column
          prop="overDays"
          align="center"
          label="逾期天数">
        </el-table-column>
        <el-table-column
          prop="mock8"
          align="center"
          label="是否结清">
          <template slot-scope="scope">{{scope.row.settleTag?'是': '否'}}</template>
        </el-table-column>
        <el-table-column
          prop="expectPayAmount"
          align="center"
          label="应还金额">
        </el-table-column>
        <el-table-column
          prop="actualPayAmount"
          align="center"
          label="实还金额">
        </el-table-column>
        <el-table-column
          prop="payChannel"
          align="center"
          label="还款渠道">
        </el-table-column>
        <el-table-column
        align="center"
          label="还款订单流水号">
          <template slot-scope="scope">
            {{scope.row.paySerialNo}}
          </template>
        </el-table-column>
      </el-table>
      <div class="pt30 pb30 pl10">
        <el-pagination
          class="dib"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchFrom.pageNum"
          :page-sizes="[5,10, 15, 20, 30]"
          :page-size="searchFrom.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { checkAuth, getToken } from '@/utils/auth'
import { getDailyInfo, inputInfo, delAllData } from '@/api/repay'
export default {
  name: 'userApply',
  data() {
    return {
      searchFrom: {
        payNo: '', // 还款订单号
        loanNo: '', // 借款订单号
        name: '', // 姓名
        idCard: '', // 身份证号码
        overdueTag: '', // 是否逾期
        settleTag: '', // 是否结清
        loanTimeStart: '', // 放款时间
        loanTimeEnd: '',
        actualPayTimeStart: '', // 实际还款时间
        actualPayTimeEnd: '',
        expectPayTimeStart: '', // 应还时间
        expectPayTimeEnd: '',
        pageNum: 1,
        pageSize: 5
      },
      arrset: [{
        name: '是',
        val: 1
      },
      {
        name: '否',
        val: 0
      }],
      loanTime: [],
      actualPayTime: [],
      expectPayTime: [],
      total: 0,
      inputLoading: false,
      listLoading: false,
      tableData: []
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    checkAuth,
    onSubmit() { // 查询事件
      this.searchFrom.pageNum = 1
      this.getPageList()
    },
    handleSizeChange(val) { // 切换每页显示数
      this.searchFrom.pageNum = 1
      this.searchFrom.pageSize = val
      this.getPageList()
    },
    handleCurrentChange(val) { // 切换页码
      this.searchFrom.pageNum = val
      this.getPageList()
    },
    getLoanTime(val) { // 获取放款
      this.searchFrom.loanTimeStart = ''
      this.searchFrom.loanTimeEnd = ''
      if (val) {
        this.searchFrom.loanTimeStart = parseInt(new Date(val[0]).getTime() / 1000)
        this.searchFrom.loanTimeEnd = parseInt(new Date(val[1]).getTime() / 1000)
      }
    },
    getActualPayTime(val) { // 获取还款
      this.searchFrom.actualPayTimeStart = ''
      this.searchFrom.actualPayTimeEnd = ''
      if (val) {
        this.searchFrom.actualPayTimeStart = parseInt(new Date(val[0]).getTime() / 1000)
        this.searchFrom.actualPayTimeEnd = parseInt(new Date(val[1]).getTime() / 1000)
      }
    },
    getEpectPayTime(val) { // 应还日期
      this.searchFrom.expectPayTimeStart = ''
      this.searchFrom.expectPayTimeEnd = ''
      if (val) {
        this.searchFrom.expectPayTimeStart = parseInt(new Date(val[0]).getTime() / 1000)
        this.searchFrom.expectPayTimeEnd = parseInt(new Date(val[1]).getTime() / 1000)
      }
    },
    getPageList() { // 获取当前列表信息
      this.listLoading = true
      getDailyInfo(this.searchFrom).then(data => {
        this.tableData = data.data.list
        this.total = data.data.total
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.log(err)
      })
    },
    deleteFile() { // 清空数据
      this.$msgbox({
        title: '提醒',
        message: '您确定要删除该统计数据吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        delAllData().then(data => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.onSubmit()
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    inputfile(event) { // 导入文件
      if (!event.target.files[0]) {
        return
      }
      if (event.target.files[0].name.indexOf('.xls') < 0) {
        this.$message({
          message: '只支持excel表格',
          type: 'warning'
        })
        return
      }
      this.inputLoading = true
      const formData = new FormData()
      formData.append('fileName', event.target.files[0])
      formData.append('accessToken', getToken())
      inputInfo(formData).then(data => {
        this.$message({
          message: '导入成功',
          type: 'success'
        })
        this.inputLoading = false
        this.onSubmit()
      }).catch(err => {
        this.inputLoading = false
        console.log(err)
      })
    }
  }

}

</script>
<style lang='scss' scoped>

</style>