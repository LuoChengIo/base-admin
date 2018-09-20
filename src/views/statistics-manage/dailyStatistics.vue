<!-- 每日统计 -->
<template>
  <div>
    <el-form :inline="true" :model="searchFrom" size="small" class="form-inline search-from">
      <el-form-item label="添加时间">
        <el-date-picker 
          v-model="searchFrom.time"
          type="daterange"
          @change="getRegTime"
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
      <br>
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
          label="放款日期"
          align="center"
          width="100"
          >
          <template slot-scope="scope">{{ scope.row.loanDate | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
        <el-table-column
          label="放款笔数"
          align="center"
          >
          <template slot-scope="scope">{{ scope.row.loanCount}}</template>
        </el-table-column>
        <el-table-column
          label="放款金额"
          align="center"
          >
          <template slot-scope="scope">{{ scope.row.loanAmount }}</template>
        </el-table-column>
        <el-table-column
          label="应还利息"
          align="center"
          >
          <template slot-scope="scope">{{ scope.row.interest }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已还笔数"
          >
          <template slot-scope="scope">{{ scope.row.repaymentedCount }}</template>
        </el-table-column>
        <el-table-column
          prop="repaymentedAmount"
          label="已还总额"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="repaymentedInterest"
          align="center"
          label="已还利息">
        </el-table-column>
        <el-table-column
          prop="repaymentAmount"
          align="center"
          label="到期应还金额">
        </el-table-column>
        <el-table-column
          prop="overdueCount"
          align="center"
          label="逾期笔数">
        </el-table-column>
        <el-table-column
          prop="overdueAmount"
          label="逾期金额">
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
import { getDailyInfo, inputInfo, delAllData } from '@/api/statistics'
export default {
  name: 'userApply',
  data() {
    return {
      searchFrom: {
        time: [],
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 5
      },
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
    getRegTime(val) { // 获取申请时间段
      this.searchFrom.startTime = ''
      this.searchFrom.endTime = ''
      if (val) {
        this.searchFrom.startTime = parseInt(new Date(val[0]).getTime() / 1000)
        this.searchFrom.endTime = parseInt(new Date(val[1]).getTime() / 1000)
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
      formData.append('dailyInfoFile', event.target.files[0])
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