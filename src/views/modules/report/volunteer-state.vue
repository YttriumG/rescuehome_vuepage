<template>
  <div class="mod-volunteer-state">
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
        width="100"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="reportTransportation"
        header-align="center"
        align="center"
        label="交通方式">
      </el-table-column>
      <el-table-column
        prop="reportEquipment"
        header-align="center"
        align="center"
        label="装备齐全状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.reportEquipment" type="success" size="small">装备齐全</el-tag>
          <el-popover
            v-else
            placement="right-start"
            title="缺失信息如下："
            width="200"
            trigger="hover"
            :content="scope.row.reportEquipmentLoss">
            <el-tag slot="reference" type="danger" size="small">装备有缺失</el-tag>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="reportLongitude"
        header-align="center"
        align="center"
        width="120"
        label="位置信息经度">
      </el-table-column>
      <el-table-column
        prop="reportLatitude"
        header-align="center"
        align="center"
        width="120"
        label="位置信息纬度">
      </el-table-column>
      <el-table-column
        prop="reportPositionUpdateTime"
        header-align="center"
        align="center"
        width="150"
        label="位置信息更新时间">
      </el-table-column>
      <el-table-column
        prop="reportIf"
        header-align="center"
        align="center"
        width="120"
        label="是否正在救援">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.reportIf" type="success" size="small">正在搜寻</el-tag>
          <el-tag v-else size="small" type="info">未搜寻</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="reportPositionUpdateTime"
        header-align="center"
        align="center"
        width="180"
        label="距离上次位置更新时间">
        <template slot-scope="scope">
          <div v-if="timeQuantum(scope.row.reportPositionUpdateTime)>1">
            {{ timeQuantum(scope.row.reportPositionUpdateTime) }}小时前更新
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small"
                     @click="moreInfo(scope.row.volunteerId)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <StateInfo v-if="moreInfoVisible" ref="StateInfo"/>
  </div>
</template>

<script>
import {getOnlineVolunteer} from "../../../api/volunteer";
import StateInfo from "./volunteer-state-info"

export default {
  name: "volunteer-state",
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      moreInfoVisible: false
    }
  },
  activated() {
    this.getDataList()
  },
  components: {
    StateInfo
  },
  methods: {
    getDataList() {
      this.dataListLoading = true
      getOnlineVolunteer(this.pageIndex, this.pageSize).then(({data}) => {
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
    moreInfo(id) {
      this.moreInfoVisible = true
      this.$nextTick(() => {
        this.$refs.StateInfo.init(id)
      })
    }
  }
}
</script>

<style scoped>

</style>
