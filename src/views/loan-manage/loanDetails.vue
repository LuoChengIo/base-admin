<!-- 放款明细 -->
<template>
  <div >
    <el-form :inline="true" :model="searchFrom" size="small" class="form-inline search-from">
      <el-form-item label="借款订单号">
        <el-input v-model.number="searchFrom.assetOrderId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchFrom.realname" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="searchFrom.idNumber" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="借款时间">
        <el-date-picker 
          v-model="orderTime"
          type="daterange"
          @change="getOrderTime"
          range-separator="至"
          start-placeholder="起始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="放款时间">
        <el-date-picker 
          v-model="verifyTrialTime"
          type="daterange"
          @change="getActualPayTime"
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
          align="center"
          width="60">
          <template slot-scope="scope">{{ scope.row.rn }}</template>
        </el-table-column>
        <el-table-column
          label="借款订单号"
          align="center">
          <template slot-scope="scope">{{ scope.row.assetOrderId }}</template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center">
          <template slot-scope="scope">{{ scope.row.realname }}</template>
        </el-table-column>
        <el-table-column
          label="身份证号"
          align="center"
          width="180">
          <template slot-scope="scope">{{ scope.row.idNumber }}</template>
        </el-table-column>
        <el-table-column
          label="借款金额"
          width="100"
          align="center">
          <template slot-scope="scope">{{ scope.row.moneyAmount }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          width="60"
          label="期数">
          <template slot-scope="scope">{{ scope.row.period }}</template>
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="借款时间"
          width="180"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="verifyTrialTime"
          align="center"
          label="审核通过时间">
        </el-table-column>
        <el-table-column
          prop="intoMoney"
          align="center"
          label="放款金额">
        </el-table-column>
        <el-table-column
          prop="loanTime"
          width="180"
          align="center"
          label="放款时间">
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
import { getDailyInfo, inputInfo, delAllData } from '@/api/loan'
export default {
  name: 'userApply',
  data() {
    return {
      searchFrom: {
        assetOrderId: '', // 借款订单号
        realname: '', // 用户真实姓名
        idNumber: '', // 用户身份证号码
        payNo: '', // 还款订单号
        orderTimeStart: '',
        orderTimeEnd: '',
        verifyTrialTimeStart: '',
        verifyTrialTimeEnd: '',
        pageNum: 1,
        pageSize: 5
      },
      orderTime: [],
      verifyTrialTime: [],
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
    getOrderTime(val) { // 借款时间
      this.searchFrom.orderTimeStart = ''
      this.searchFrom.orderTimeEnd = ''
      if (val) {
        this.searchFrom.orderTimeStart = parseInt(new Date(val[0]).getTime() / 1000)
        this.searchFrom.orderTimeEnd = parseInt(new Date(val[1]).getTime() / 1000)
      }
    },
    getActualPayTime(val) { // 放款时间
      this.searchFrom.verifyTrialTimeStart = ''
      this.searchFrom.verifyTrialTimeEnd = ''
      if (val) {
        this.searchFrom.verifyTrialTimeStart = parseInt(new Date(val[0]).getTime() / 1000)
        this.searchFrom.verifyTrialTimeEnd = parseInt(new Date(val[1]).getTime() / 1000)
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
      formData.append('reportLoanInfoFile', event.target.files[0])
      formData.append('accessToken', getToken())
      inputInfo(formData).then(data => {
        this.inputLoading = false
        this.$message({
          message: '导入成功',
          type: 'success'
        })
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