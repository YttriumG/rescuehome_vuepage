<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="姓名" prop="missingPersonName">
        <el-input v-model="dataForm.missingPersonName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="面部特征" prop="missingPersonFace">
        <img v-if="dataForm.missingPersonFace !=null" :src="dataForm.missingPersonFace"
             :alt="dataForm.missingPersonName">
        <div v-else>暂未上传人脸照片！</div>
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
      <el-form-item v-if="stateVisible" label="失踪日期" prop="missing_date">
        <el-date-picker v-model="dataForm.missingDate" type="datetime" placeholder="请选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="走失地点" prop="missingPlace">
        <el-input v-model="dataForm.missingPlaceLongitude" placeholder="经度" style="width: 30%"></el-input>
        <el-input v-model="dataForm.missingPlaceLatitude" placeholder="纬度" style="width: 30%"></el-input>

      </el-form-item>
      <el-form-item v-if="stateVisible" label="人员状态" prop="missingState">
        <el-radio-group v-model="dataForm.missingState">
          <el-radio :label="0">已找到</el-radio>
          <el-radio :label="1">走失中</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {addMissingPeople, getMissingPeopleById, updateMissingPeople} from "../../../api/missingPeople";

export default {
  data() {
    // var validateAge = (rule, value, callback) => {
    //   if (!this.dataForm.missing_id && !/\S/.test(value)) {
    //     callback(new Error('年龄信息不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateComfirmPassword = (rule, value, callback) => {
    //   if (!this.dataForm.missing_id && !/\S/.test(value)) {
    //     callback(new Error('确认密码不能为空'))
    //   } else if (this.dataForm.password !== value) {
    //     callback(new Error('确认密码与密码输入不一致'))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateEmail = (rule, value, callback) => {
    //   if (!isEmail(value)) {
    //     callback(new Error('邮箱格式错误'))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateMobile = (rule, value, callback) => {
    //   if (!isMobile(value)) {
    //     callback(new Error('手机号格式错误'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      visible: false,
      options: [{
        value: '1',
        label: '一级走失状态（失踪24小时内）'
      }, {
        value: '2',
        label: '二级走失状态（失踪48小时内）'
      }, {
        value: '3',
        label: '三级走失状态（失踪72小时内）'
      }, {
        value: '4',
        label: '四级走失状态（超过72小时）'
      }],
      roleList: [],
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
      stateVisible: false,
      isAdd: true,
      dataRule: {
        missingPersonName: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        missingPersonAge: [
          {required: true, message: '年龄信息不能为空', trigger: 'blur'}
        ],
        missingPersonHeight: [
          {required: true, message: '身高信息不能为空', trigger: 'blur'}
        ],
        missingDate: [
          {required: true, message: '失踪时间不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.missingId = id || 0
      if (this.dataForm.missingId) {
        getMissingPeopleById(this.dataForm.missingId).then(({data}) => {
          this.visible = true
          this.stateVisible = true
          this.isAdd = false
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
          if (data && data.code === 10000) {
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
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.visible = true
        this.stateVisible = false
        this.isAdd = true
        this.dataForm.familyId = 0
        this.dataForm.missingPersonSex = true
      }
    },
// 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (!this.isAdd) {
            updateMissingPeople(this.dataForm).then(({data}) => {
              if (data && data.code === 10000) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          } else {
            addMissingPeople(this.dataForm).then(({data}) => {
              if (data && data.code === 10000) {
                this.$message({
                  message: '添加成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        }
      })
    }
  }
}
</script>
