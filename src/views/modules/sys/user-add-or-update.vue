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
      <el-form-item label="性别" prop="missing_person_sex" :class="{ 'is-required': !dataForm.missing_id }">
        <el-radio-group v-model="dataForm.missing_person_sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="missing_person_age" :class="{ 'is-required': !dataForm.missing_id }">
        <el-input v-model="dataForm.missing_person_age" type="password" placeholder="填入年龄或年龄段"></el-input>
      </el-form-item>
      <el-form-item label="身高" prop="missing_person_height">
        <el-input v-model="dataForm.missing_person_height" placeholder="大致身高"></el-input>
      </el-form-item>
      <el-form-item label="体型" prop="missing_person_shape">
        <el-input v-model="dataForm.missing_person_shape" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{
              role.roleName
            }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
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
import {isEmail, isMobile} from '@/utils/validate'
import {updateMissingPeople} from "../../../api/missingPeople";

export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    var validateComfirmPassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('确认密码不能为空'))
      } else if (this.dataForm.password !== value) {
        callback(new Error('确认密码与密码输入不一致'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    var validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
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
        missing_person_sex: [
          {validator: validatePassword, trigger: 'blur'}
        ],
        comfirmPassword: [
          {validator: validateComfirmPassword, trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {validator: validateEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {validator: validateMobile, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.$http({
        url: this.$http.adornUrl('/sys/role/select'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({data}) => {
        this.roleList = data && data.code === 0 ? data.list : []
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      }).then(() => {
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/sys/user/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.userName = data.user.username
              this.dataForm.salt = data.user.salt
              this.dataForm.email = data.user.email
              this.dataForm.mobile = data.user.mobile
              this.dataForm.roleIdList = data.user.roleIdList
              this.dataForm.status = data.user.status
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
            if (data && data.code === 0) {
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
