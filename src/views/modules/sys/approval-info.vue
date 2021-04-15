<template>
  <el-dialog
    title="提示"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div slot="title" class="el-header">
      <span class="title"> {{ dataForm.missingPersonName }}的基本资料   </span>
    </div>
    <el-row>
      <el-col>
        <el-form :model="dataForm" ref="dataForm" label-width="80px">

          <el-form-item label="姓名" prop="missingPersonName">
            <el-input v-model="dataForm.missingPersonName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="面部特征" prop="missingPersonFace">
            <img class="people-face" :src="dataForm.missingPersonFace" :alt="dataForm.missingPersonName">
          </el-form-item>
          <el-form-item label="性别" prop="missingPersonSex">
            <el-radio-group v-model="dataForm.missingPersonSex">
              <el-radio :label="true">男</el-radio>
              <el-radio :label="false">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="missingPersonAge" :class="{ 'is-required': !dataForm.missing_id }">
            <el-input v-model="dataForm.missingPersonAge" placeholder="填入年龄或年龄段"></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="missingPersonHeight">
            <el-input v-model="dataForm.missingPersonHeight" placeholder="大致身高"></el-input>
          </el-form-item>
          <el-form-item label="体型" prop="missingPersonShape">
            <el-input v-model="dataForm.missingPersonShape" placeholder="体型"></el-input>
          </el-form-item>
          <el-form-item label="衣着" prop="missingPersonClothes">
            <el-input v-model="dataForm.missingPersonClothes" placeholder="衣着"></el-input>
          </el-form-item>

          <el-form-item label="既往病史" prop="missingPersonMedicalHistory">
            <el-input v-model="dataForm.missingPersonMedicalHistory" placeholder="既往病史"></el-input>
          </el-form-item>
          <el-form-item label="失踪日期" prop="missingDate">
            <el-date-picker v-model="dataForm.missingDate" type="datetime" placeholder="请选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="申报地点" prop="missing_place">
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
        </el-form>
      </el-col>
    </el-row>


    <div style="text-align: center">
      <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="rejection()">驳回</el-button>
      <el-button type="primary" @click="approved()">通过</el-button>
    </span>
    </div>

  </el-dialog>
</template>

<script>
import {getMissingPeopleById, updateMissingPeople} from "../../../api/missingPeople";

export default {
  name: "approval-info",
  data() {
    return {
      visible: false,
      dataForm: {
        missingId: 0,
        familyId: 0,
        missingPersonName: '',
        missingPersonSex: '',
        missingPersonAge: '',
        missingPersonHeight: '',
        missingPersonShape: '',
        missingPersonClothes: '',
        missingPersonFace: '',
        missingPersonMedicalHistory: '',
        missingDate: '',
        missingPlaceLongitude: '',
        missingPlaceLatitude: '',
        missingWhereabouts: '',
        missingLevel: '',
        missingState: 0
      },
      position: [],
      zoom: 13
    }
  },
  methods: {
    init(id) {
      this.dataForm.missingId = id
      getMissingPeopleById(id).then(({data}) => {
        this.$nextTick(() => {
          if (this.$refs.dataForm !== undefined) {
            this.$refs.dataForm.resetFields()
          }
          if (data && data.code === 10000) {
            let position = []
            this.visible = true
            const person = data.data.missingPeople;
            this.dataForm.missingPersonName = person.missingPersonName
            this.dataForm.missingPersonSex = person.missingPersonSex
            this.dataForm.missingPersonAge = person.missingPersonAge
            this.dataForm.missingPersonHeight = person.missingPersonHeight
            this.dataForm.missingPersonShape = person.missingPersonShape
            this.dataForm.missingPersonClothes = person.missingPersonClothes
            this.dataForm.missingPersonFace = person.missingPersonFace
            this.dataForm.missingPersonMedicalHistory = person.missingPersonMedicalHistory
            this.dataForm.missingDate = person.missingDate
            this.dataForm.missingWhereabouts = person.missingWhereabouts
            this.dataForm.missingLevel = person.missingLevel
            this.dataForm.missingState = person.missingState
            position.push({
              point:[person.missingPlaceLongitude,person.missingPlaceLatitude]
            })
            this.position = position
          } else {
            this.$message.error(data.msg)
          }
        })
      })
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
    approved() {
      this.dataForm.missingState = 1
      updateMissingPeople(this.dataForm).then(({data}) => {
        if (data && data.code === 10000) {
          this.$message({
            message: '通过审批成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        } else {
          this.method.error(data.msg)
        }
      })
    },
    rejection() {
      this.dataForm.missingState = -1
      updateMissingPeople(this.dataForm).then(({data}) => {
        if (data && data.code === 10000) {
          this.$message({
            message: '驳回成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        } else {
          this.method.error(data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.people-face {
  width: 80%;
  height: auto;
}
.amap-wrapper {
  width: 100%;
  height: 200px;
}
</style>
