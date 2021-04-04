<template>
  <div class="mod-missing-people">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="走失人员姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('sys:ms:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('sys:ms:delete')" type="danger" @click="deleteHandle()"
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
        width="150"
        label="失踪日期">
      </el-table-column>
      <el-table-column
        prop="familyId"
        header-align="center"
        align="center"
        label="家属信息">
        <template slot-scope="scope">
          <el-button type="text" size="small"
                     @click="familyInfo(scope.row.familyId)">
            {{scope.row.familyId}}
          </el-button>
        </template>
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
          <el-tag v-if="scope.row.missingState === 1" type="danger" size="small">走失中</el-tag>
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
                     @click="moreInfo(scope.row.missingId)">
            详情
          </el-button>
          <el-button type="text" size="small"
                     @click="addOrUpdateHandle(scope.row.missingId)">修改
          </el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.missingId)">
            删除
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
    <family-info v-if="familyInfoVisible" ref="FamilyInfo"></family-info>
  </div>
</template>

<script>
import AddOrUpdate from './missingpeople-add-or-update'
import MoreInfo from './missingpeople-info'
import FamilyInfo from './family-info'
import {deleteMissingPeople, getMissingPeopleList} from "../../../api/missingPeople";
import {getFamilyById} from "../../../api/family";

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
      moreInfoVisible: false,
      familyInfoVisible: false
    }
  },
  components: {
    AddOrUpdate,
    MoreInfo,
    FamilyInfo
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
        return hours
      }
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getMissingPeopleList(this.pageIndex, this.pageSize, this.dataForm.name)
        .then(({data}) => {
          if (data && data.code === 10000) {
            this.dataList = data.data.list
            this.totalPage = data.data.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          console.log(this.dataList)
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
    //个人信息
    moreInfo(id) {
      this.moreInfoVisible = true
      this.$nextTick(() => {
        this.$refs.MoreInfo.init(id)
      })
    },
    //家属信息
    familyInfo(id){
      this.familyInfoVisible = true
      this.$nextTick(() =>{
        this.$refs.FamilyInfo.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      var userIds = id ? [id] : this.dataListSelections.map(item => {
        return item.missingId
      })
      this.$confirm(`确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(userIds)
        deleteMissingPeople(userIds).then(({data}) => {
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
