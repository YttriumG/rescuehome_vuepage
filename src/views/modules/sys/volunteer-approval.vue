<template>
  <div class="mod-volunteer-approval">
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
        prop="volunteerId"
        header-align="center"
        align="center"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="volunteerName"
        header-align="center"
        align="center"
        label="志愿者姓名">
      </el-table-column>
      <el-table-column
        prop="volunteerSex"
        header-align="center"
        align="center"
        label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.volunteerSex" size="small">男</el-tag>
          <el-tag v-else size="small">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="volunteerPhone"
        header-align="center"
        align="center"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="volunteerParticipate"
        header-align="center"
        align="center"
        width="120"
        label="参与次数">
      </el-table-column>
      <el-table-column
        prop="volunteerDuration"
        header-align="center"
        align="center"
        width="120"
        label="参与时长">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" plain @click="info(scope.row.volunteerId)">
            审批
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import {getApprovalVolunteer} from "../../../api/volunteer";

export default {
  name: "volunteer-approval",
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
    }
  },
  activated() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.dataListLoading = true
      getApprovalVolunteer(this.pageIndex, this.pageSize).then(({data}) => {
        if (data && data.code === 10000) {
          console.log(data)
          this.dataList = data.data.list
          this.totalPage = data.data.totalCount
          console.log(this.dataList)
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
    }
  }
}
</script>

<style scoped>

</style>
