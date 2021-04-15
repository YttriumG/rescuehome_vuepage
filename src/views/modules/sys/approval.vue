<template>
  <div class="mod-approval">
    <el-form :inline="true" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button @click="getDataList()">刷新</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        prop="missingId"
        header-align="center"
        align="center"
        width="60"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="missingPersonName"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="missingPersonSex"
        header-align="center"
        align="center"
        label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.missingPersonSex" size="small">男</el-tag>
          <el-tag v-else size="small">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="missingPersonAge"
        header-align="center"
        align="center"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="missingDate"
        header-align="center"
        align="center"
        width="180"
        label="失踪日期">
      </el-table-column>
      <el-table-column
        prop="missingLevel"
        header-align="center"
        align="center"
        label="戒备等级">
        <template slot-scope="scope">
          <el-tag v-if="timeQuantum(scope.row.missingDate) <= 24" size="small" type="danger">一级</el-tag>
          <el-tag v-else-if="timeQuantum(scope.row.missingDate) <= 48" size="small" type="warning">二级</el-tag>
          <el-tag v-else-if="timeQuantum(scope.row.missingDate) <= 72" size="small" type="warning">三级</el-tag>
          <el-tag v-else size="small" type="info">四级</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="missingState"
        header-align="center"
        align="center"
        label="当前状态">
        <template slot-scope="scope">
          <el-tag size="small">待审批</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small"
                     @click="info(scope.row.missingId)">
            审批
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <approval-info v-if="infoVisible" ref="Info" @refreshDataList="getDataList"></approval-info>
  </div>
</template>

<script>
import {getMissingPeopleApproval} from "../../../api/missingPeople";
import ApprovalInfo from "./approval-info";

export default {
  name: "approval",
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      infoVisible: false
    }
  },
  activated() {
    this.getDataList()
  },
  components:{
    ApprovalInfo
  },
  methods:{
    getDataList() {
      this.dataListLoading = true
      getMissingPeopleApproval(this.pageIndex, this.pageSize)
        .then(({data}) => {
          if (data && data.code === 10000) {
            this.dataList = data.data.list
            this.totalPage = data.data.totalCount

          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    timeQuantum(time) {
      time = new Date(time);//获取传入时间 并将其转化为date型
      var nowTime = new Date();//获取当前时间
      var timeDifference = nowTime.getTime() - time.getTime();//时间差的毫秒数
      if (timeDifference < 0) {
        return '超过规定处理时间';
      } else {
        var days = Math.floor(timeDifference / (24 * 3600 * 1000));//计算出相差天数
        var leave1 = timeDifference % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000)) + days * 24; //计算出小时数
        return hours
      }
    },
    info(id){
      this.infoVisible = true
      this.$nextTick(()=>{
        this.$refs.Info.init(id)
      })
    }
  }
}
</script>

<style scoped>
  .breadcrumb{
    margin-bottom: 30px;
  }
</style>
