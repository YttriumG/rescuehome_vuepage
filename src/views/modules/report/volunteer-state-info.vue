<template>
  <div class="mod-volunteer-state-info">
    <el-dialog
      title="提示"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <div slot="title" class="el-header">
        <span class="title"> {{ dataForm.volunteerName }}的详细资料   </span>
      </div>
      <el-form :model="dataForm" ref="dataForm" label-width="150px">
        <el-form-item label="姓名" prop="missing_person_name">
          <div>{{ dataForm.volunteerName }}</div>
        </el-form-item>
        <el-form-item
          prop="reportIf"
          label="搜救状态">
          <template slot-scope="scope">
            <el-tag v-if="dataForm.reportIf" size="small">正在搜寻</el-tag>
            <el-tag v-else size="small">未搜寻</el-tag>
          </template>
        </el-form-item>
        <el-form-item label="搜寻交通方式" prop="reportTransportation">
          <div>{{ dataForm.reportTransportation }}</div>
        </el-form-item>
        <el-form-item label="装备齐全状态" prop="reportEquipment">
          <el-tag v-if="dataForm.reportEquipment" size="small" type="success">装备齐全</el-tag>
          <el-tag v-else size="small" type="danger">装备缺失</el-tag>
        </el-form-item>
        <el-form-item label="装备缺失信息" v-if="!dataForm.reportEquipment" prop="reportEquipmentLoss">
          <div>{{ dataForm.reportEquipmentLoss }}</div>
        </el-form-item>
        <el-form-item label="位置信息" prop="reportLongitude">
          <div class="amap-wrapper">
            <el-amap
              class="amap-box"
              :vid="'amap-vue'"
              :center="this.position[0].point"
              :zoom="zoom">
              <el-amap-marker :position="position[0].point"/>
            </el-amap>
          </div>
        </el-form-item>
        <el-form-item label="位置更新时间" prop="reportPositionUpdateTime">
          <div>{{ dataForm.reportPositionUpdateTime }}</div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getReport, getVolunteerById} from "../../../api/volunteer";

export default {
  name: "volunteer-state-info",
  data() {
    return {
      visible: false,
      dataForm: {
        volunteerId: 0,
        volunteerName: "",
        reportIf: false,
        reportTransportation: "",
        reportEquipment: "",
        reportEquipmentLoss: "",
        reportLongitude: "",
        reportLatitude: "",
        reportPositionUpdateTime: ""
      },
      center:[],
      zoom:15, // 放大比列
      position: [],
    }
  },
  methods: {
    init(id) {
      this.dataForm.volunteerId = id
      getReport(id).then(({data}) => {
        this.$nextTick(() => {
          if (this.$refs.dataForm !== undefined) {
            this.$refs.dataForm.resetFields()
          }
          if (data && data.code === 10000) {
            let position = []
            this.visible = true
            this.dataForm.volunteerId = data.data.volunteerId
            this.dataForm.reportIf = data.data.reportIf
            this.dataForm.reportTransportation = data.data.reportTransportation
            this.dataForm.reportEquipment = data.data.reportEquipment
            this.dataForm.reportEquipmentLoss = data.data.reportEquipmentLoss
            this.center.push(data.data.reportLongitude,data.data.reportLatitude)
            position.push({
              point :[data.data.reportLongitude,data.data.reportLatitude]
            })
            this.position = position
            this.dataForm.reportPositionUpdateTime = data.data.reportPositionUpdateTime
          }
        })
      })
      getVolunteerById(id).then(({data}) => {
        this.$nextTick(() => {
          if (data && data.code === 10000) {
            this.visible = true
            this.dataForm.volunteerName = data.data.volunteer.volunteerName
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.amap-wrapper {
  width: 100%;
  height: 200px;
}
</style>
