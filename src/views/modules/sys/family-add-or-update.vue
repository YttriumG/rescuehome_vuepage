<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="150px">
      <el-form-item label="姓名" prop="familyName">
        <div> {{ dataForm.familyName }}</div>
      </el-form-item>
      <el-form-item label="性别" prop="familySex">
        <el-radio-group v-model="dataForm.familySex">
          <el-radio :label="true">男</el-radio>
          <el-radio :label="false">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="寻找对象" prop="missingName">
        <div v-if="dataForm.missingId != null">{{ dataForm.missingName }}</div>
        <div v-else>暂无申报人员</div>
      </el-form-item>
      <el-form-item label="联系电话" prop="familyPhone">
        <el-input v-model="dataForm.familyPhone"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址" prop="familyPlace">
        <el-input v-model="dataForm.familyPlace"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getFamilyById, updateFamily} from "../../../api/family";
import {getMissingPeopleById} from "../../../api/missingPeople";

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        familyId: 0,
        familyName: '',
        familyPhone: '',
        familyPlace: '',
        familySex: '',
        missingId: 0,
        missingName: ''
      },
      dataRule: {
        familyPhone: [
          {required: true, message: '联系电话不能为空', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    init(id) {
      var that = this
      this.dataForm.id = id || 0
      getFamilyById(id).then(({data}) => {
        if (data && data.code === 10000) {
          console.log(data)
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            const family = data.data
            this.dataForm.familyId = family.familyId
            this.dataForm.familyName = family.familyName
            this.dataForm.familyPhone = family.familyPhone
            this.dataForm.familyPlace = family.familyPlace
            this.dataForm.familySex = family.familySex
            this.dataForm.missingId = family.missingId
            if (family.missingId != null) {
              getMissingPeopleById(family.missingId).then(({data}) => {
                if (data && data.code === 10000) {
                  this.$nextTick(() => {
                    this.dataForm.missingName = data.data.missing_person_name
                  })
                } else {
                  that.$message.error({
                    message: `请求走失人员错误！错误码：${data.code},${data.msg}`,
                    type: 'warning'
                  })
                }
              }, function (data) {
                that.$message.error({
                  message: `服务器请求错误`
                })
              })
            }
          })
        } else {
          that.$message.error({
            message: `请求家属信息出错！错误码：${data.code},${data.msg}`,
            type: 'warning'
          })
        }
      }, function (data) {
        that.$message.error({
          message: `服务器请求错误`
        })
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.dataForm)
          updateFamily(this.dataForm).then(({data}) => {
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
              this.$message.error(`错误码：${data.code}，信息：${data.msg}`)
            }
          })
        }
      })
    }
  }
}
</script>
