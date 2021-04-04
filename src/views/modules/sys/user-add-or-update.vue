<template>
  <el-dialog
    title= '修改'
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="OpenId" prop="openId">
        <div>{{dataForm.openId}}</div>
      </el-form-item>
      <el-form-item label="SessionKey" prop="sessionKey">
        <div>{{dataForm.sessionKey}}</div>
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-radio-group v-model="dataForm.userType">
          <el-radio :label="1">家属</el-radio>
          <el-radio :label="2">志愿者</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户Id"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getUserInfo} from "../../../api/user-info";

export default {
  name: 'user-add-or-update',
  data() {
    return {
      visible: false,
      dataForm: {
        openId:'',
        sessionKey:'',
        userType:'',
        userId:''
      },
      dataRule: {

      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          getUserInfo(this.dataForm.id).then(({data}) => {
            console.log(data)
            if (data && data.code === 10000) {
              this.dataForm.openId = data.data.openId
              this.dataForm.sessionKey = data.data.sessionKey
              this.dataForm.userType = data.data.userType
              this.dataForm.userId = data.data.userId
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/sys/config/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'paramKey': this.dataForm.paramKey,
              'paramValue': this.dataForm.paramValue,
              'remark': this.dataForm.remark
            })
          }).then(({data}) => {
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
