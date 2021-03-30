<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
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
      <el-form-item label="人员状态" prop="missing_state">
        <el-radio-group v-model="dataForm.missing_state">
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
import {getMissingPeopleById, updateMissingPeople} from "../../../api/missingPeople";

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
      },
      dataRule: {
        missing_person_name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        missing_person_age: [
          {required: true, message: '年龄信息不能为空', trigger: 'blur'}
        ],
        missing_person_height: [
          {required: true, message: '身高信息不能为空', trigger: 'blur'}
        ],
        missing_date: [
          {required: true, message: '失踪时间不能为空', trigger: 'blur'}
        ],
        missing_place: [
          {required: true, message: '申报地点不能为空', trigger: 'blur'}
        ],
        missing_level: [
          {required: true, message: '戒备等级不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.missing_id = id || 0
      this.$http({
        url: this.$http.adornUrl('/sys/role/select'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({data}) => {
        this.roleList = data && data.code === 10000 ? data.list : []
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      }).then(() => {
        if (this.dataForm.missing_id) {
          getMissingPeopleById(this.dataForm.missing_id).then(({data}) => {
            if (data && data.code === 10000) {
              var person = data.data
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
            }else{
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
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
        }
      })
    }
  }
}
</script>
