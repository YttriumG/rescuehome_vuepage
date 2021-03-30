<template>
  <el-dialog
    title="提示"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div slot="title" class="el-header">
      <span class="title"> {{ dataForm.missing_person_name }}的初步资料   </span>
    </div>
    <el-row>
      <el-col>
        <el-form :model="dataForm" ref="dataForm" label-width="80px">

          <el-form-item label="姓名" prop="missing_person_name">
            <el-input v-model="dataForm.missing_person_name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="missing_person_sex">
            <el-radio-group v-model="dataForm.missing_person_sex">
              <el-radio :label="true">男</el-radio>
              <el-radio :label="false">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="missing_person_age" :class="{ 'is-required': !dataForm.missing_id }">
            <el-input v-model="dataForm.missing_person_age" placeholder="填入年龄或年龄段"></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="missing_person_height">
            <el-input v-model="dataForm.missing_person_height" placeholder="大致身高"></el-input>
          </el-form-item>
          <el-form-item label="体型" prop="missing_person_shape">
            <el-input v-model="dataForm.missing_person_shape" placeholder="体型"></el-input>
          </el-form-item>
          <el-form-item label="衣着" prop="missing_person_clothes">
            <el-input v-model="dataForm.missing_person_clothes" placeholder="衣着"></el-input>
          </el-form-item>
          <el-form-item label="面部特征" prop="missing_person_face">
            <el-input v-model="dataForm.missing_person_face" placeholder="面部特征"></el-input>
          </el-form-item>
          <el-form-item label="既往病史" prop="missing_person_medical_history">
            <el-input v-model="dataForm.missing_person_medical_history" placeholder="既往病史"></el-input>
          </el-form-item>
          <el-form-item label="失踪日期" prop="missing_date">
            <el-date-picker v-model="dataForm.missing_date" type="datetime" placeholder="请选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="申报地点" prop="missing_place">
            <el-input v-model="dataForm.missing_place" placeholder="申报地点"></el-input>
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
        missing_id: 0,
        missing_person_name: '',
        missing_person_sex: '',
        missing_person_age: '',
        missing_person_height: '',
        missing_person_shape: '',
        missing_person_clothes: '',
        missing_person_face: '',
        missing_person_medical_history: '',
        missing_date: '',
        missing_place: '',
        missing_whereabouts: '',
        missing_level: '',
        missing_state: 0
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.missing_id = id
      getMissingPeopleById(id).then(({data}) => {
        this.$nextTick(() => {
          if (this.$refs.dataForm !== undefined) {
            this.$refs.dataForm.resetFields()
          }
          if (data && data.code === 10000) {
            this.visible = true
            const person = data.data;
            this.dataForm.missing_person_name = person.missing_person_name
            this.dataForm.missing_person_sex = person.missing_person_sex
            this.dataForm.missing_person_age = person.missing_person_age
            this.dataForm.missing_person_height = person.missing_person_height
            this.dataForm.missing_person_shape = person.missing_person_shape
            this.dataForm.missing_person_clothes = person.missing_person_clothes
            this.dataForm.missing_person_face = person.missing_person_face
            this.dataForm.missing_person_medical_history = person.missing_person_medical_history
            this.dataForm.missing_date = person.missing_date
            this.dataForm.missing_place = person.missing_place
            this.dataForm.missing_whereabouts = person.missing_whereabouts
            this.dataForm.missing_level = person.missing_level
            this.dataForm.missing_state = person.missing_state
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
      this.dataForm.missing_state = 1
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
      this.dataForm.missing_state = -1
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

</style>
