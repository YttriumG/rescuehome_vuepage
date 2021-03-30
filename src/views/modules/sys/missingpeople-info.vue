<template>
  <el-dialog
    title="提示"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div slot="title" class="el-header">
      <span class="title"> {{ dataForm.missing_person_name }}的详细资料   </span>
      <el-tag v-if="timeQuantum(dataForm.missing_date) <= 24" size="small" type="danger">一级走失状态</el-tag>
      <el-tag v-else-if="timeQuantum(dataForm.missing_date) <= 48" size="small" type="warning">二级走失状态</el-tag>
      <el-tag v-else-if="timeQuantum(dataForm.missing_date) <= 72" size="small" type="warning">三级走失状态</el-tag>
      <el-tag v-else size="small" type="info">四级走失状态</el-tag>
    </div>
    <el-form v-model="dataForm" ref="dataForm" label-width="150px">
      <el-form-item label="姓名" prop="missing_person_name">
        <div>{{ dataForm.missing_person_name }}</div>
      </el-form-item>
      <el-form-item label="性别" prop="missing_person_sex">
        <template slot-scope="scope">
          <div v-if="dataForm.missing_person_sex">男</div>
          <div v-else size="small">女</div>
        </template>
      </el-form-item>
      <el-form-item label="年龄" prop="missing_person_age">
        <div>{{ dataForm.missing_person_age }}</div>
      </el-form-item>
      <el-form-item label="身高" prop="missing_person_height">
        <div>{{ dataForm.missing_person_height }}</div>
      </el-form-item>
      <el-form-item label="体型" prop="missing_person_shape">
        <div>{{ dataForm.missing_person_shape }}</div>
      </el-form-item>
      <el-form-item label="衣着" prop="missing_person_clothes">
        <div>{{ dataForm.missing_person_clothes }}</div>
      </el-form-item>
      <el-form-item label="面部特征" prop="missing_person_face">
        <div>{{ dataForm.missing_person_face }}</div>
      </el-form-item>
      <el-form-item label="既往病史" prop="missing_person_medical_history">
        <div>{{ dataForm.missing_person_medical_history }}</div>
      </el-form-item>
      <el-form-item label="失踪日期" prop="missing_date">
        <div>{{ dataForm.missing_date }}</div>
      </el-form-item>
      <el-form-item label="申报地点" prop="missing_place">
        <div>{{ dataForm.missing_place }}</div>
      </el-form-item>
      <el-form-item label="人员状态" prop="missing_state">
        <el-tag v-if="dataForm.missing_state === 1" type="danger" size="small">走失中</el-tag>
        <el-tag v-else size="small" type="success">已找到</el-tag>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {getMissingPeopleById} from "../../../api/missingPeople";

export default {
  name: "user-info",
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
        console.log(hours)
        return hours
      }
    }
  }
}
</script>

<style scoped>

</style>
