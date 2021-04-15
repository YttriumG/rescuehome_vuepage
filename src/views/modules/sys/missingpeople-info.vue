<template>
  <el-dialog
    title="提示"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div slot="title" class="el-header">
      <span class="title"> {{ dataForm.missingPersonName }}的详细资料   </span>
      <el-tag v-if="timeQuantum(dataForm.missingDate) <= 24" size="small" type="danger">一级走失状态</el-tag>
      <el-tag v-else-if="timeQuantum(dataForm.missingDate) <= 48" size="small" type="warning">二级走失状态</el-tag>
      <el-tag v-else-if="timeQuantum(dataForm.missingDate) <= 72" size="small" type="warning">三级走失状态</el-tag>
      <el-tag v-else size="small" type="info">四级走失状态</el-tag>
    </div>
    <el-form :model="dataForm" ref="dataForm" label-width="150px">
      <el-form-item label="姓名" prop="missing_person_name">
        <div>{{ dataForm.missingPersonName }}</div>
      </el-form-item>
      <el-form-item label="面部特征" prop="missingPersonFace">
        <img class="people-face" v-if="dataForm.missingPersonFace !=null" :src="dataForm.missingPersonFace"
             :alt="dataForm.missingPersonName">
        <div v-else>暂未上传人脸照片！</div>
      </el-form-item>
      <el-form-item label="性别" prop="missingPersonSex">
        <template slot-scope="scope">
          <div v-if="dataForm.missingPersonSex">男</div>
          <div v-else size="small">女</div>
        </template>
      </el-form-item>
      <el-form-item label="年龄" prop="missingPersonAge">
        <div>{{ dataForm.missingPersonAge }}</div>
      </el-form-item>
      <el-form-item label="身高" prop="missing_person_height">
        <div>{{ dataForm.missingPersonHeight }}</div>
      </el-form-item>
      <el-form-item label="体型" prop="missingPersonShape">
        <div>{{ dataForm.missingPersonShape }}</div>
      </el-form-item>
      <el-form-item label="衣着" prop="missingPersonClothes">
        <div>{{ dataForm.missingPersonClothes }}</div>
      </el-form-item>

      <el-form-item label="既往病史" prop="missingPersonMedicalHistory">
        <div>{{ dataForm.missingPersonMedicalHistory }}</div>
      </el-form-item>
      <el-form-item label="失踪日期" prop="missingDate">
        <div>{{ dataForm.missingDate }}</div>
      </el-form-item>
      <el-form-item label="申报地点" prop="missing_place" style="height: auto">
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
      <el-form-item label="走失范围" prop="missingWhereabouts">
        <div>{{ dataForm.missingWhereabouts }}</div>
      </el-form-item>
      <el-form-item label="人员状态" prop="missingState">
        <el-tag v-if="dataForm.missingState === 1" type="danger" size="small">走失中</el-tag>
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
      this.dataForm.missing_id = id
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
            this.dataForm.missingPlaceLongitude = person.missingPlaceLongitude
            this.dataForm.missingPlaceLatitude = person.missingPlaceLatitude
            this.dataForm.missingWhereabouts = person.missingWhereabouts
            this.dataForm.missingLevel = person.missingLevel
            this.dataForm.missingState = person.missingState
            position.push({
              point: [this.dataForm.missingPlaceLongitude, this.dataForm.missingPlaceLatitude]
            })
            this.position = position
            console.log(this.position)
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
    }
  }
}
</script>

<style scoped>
.amap-wrapper {
  width: 100%;
  height: 200px;
}
.people-face{
  width: 80%;
  height: auto;
}
</style>
