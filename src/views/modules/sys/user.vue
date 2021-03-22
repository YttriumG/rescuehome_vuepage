<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="danger" @click="deleteHandle()"
                   :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="missing_id"
        header-align="center"
        align="center"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="missing_person_name"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="missing_person_sex"
        header-align="center"
        align="center"
        label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.missing_person_sex" size="small">男</el-tag>
          <el-tag v-else size="small">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="missing_person_age"
        header-align="center"
        align="center"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="missing_date"
        header-align="center"
        align="center"
        label="失踪日期">
      </el-table-column>
      <el-table-column
        prop="missing_level"
        header-align="center"
        align="center"
        label="戒备等级">
        <template slot-scope="scope">
          <el-tag v-if="timeQuantum(scope.row.missing_date) <= 24" size="small" type="danger">一级</el-tag>
          <el-tag v-else-if="timeQuantum(scope.row.missing_date) <= 48" size="small" type="warning">二级</el-tag>
          <el-tag v-else-if="timeQuantum(scope.row.missing_date) <= 72" size="small" type="warning">三级</el-tag>
          <el-tag v-else size="small" type="info">四级</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="missing_state"
        header-align="center"
        align="center"
        label="当前状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.missing_state === 1" type="danger" size="small">走失中</el-tag>
          <el-tag v-else size="small" type="success">已找到</el-tag>
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
                     @click="addOrUpdateHandle(scope.row.missing_id)">修改
          </el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.missing_id)">
            删除
          </el-button>
          <el-button type="text" size="small"
                     @click="moreInfo(scope.row.missing_id)">
            详情
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <more-info v-if="moreInfoVisible" ref="MoreInfo" @refreshDataList="getDataList"></more-info>
  </div>
</template>

<script>
import AddOrUpdate from './user-add-or-update'
import MoreInfo from './user-info'
import {deleteMissingPeople, getMissingPeopleList} from "../../../api/missingPeople";

export default {
  data() {
    return {
      dataForm: {
        name: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      moreInfoVisible: false
    }
  },
  components: {
    AddOrUpdate,
    MoreInfo
  },
  activated() {
    this.getDataList()
  },
  methods: {
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
        console.log(hours)
        return hours
      }
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getMissingPeopleList(this.pageIndex, this.pageSize, this.dataForm.name)
        .then(({data}) => {
          console.log(data)
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
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    moreInfo(id) {
      this.moreInfoVisible = true
      this.$nextTick(() => {
        this.$refs.MoreInfo.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      var userIds = id ? [id] : this.dataListSelections.map(item => {
        return item.missing_id
      })
      this.$confirm(`确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMissingPeople(id).then(({data}) => {
          if (data && data.code === 10000) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>
