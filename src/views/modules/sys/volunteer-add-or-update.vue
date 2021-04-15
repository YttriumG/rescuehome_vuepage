<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">

      <el-form-item
        label="Id"
        prop="volunteerId">
        <el-input v-model="dataForm.volunteerId" placehoder="志愿者ID"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="volunteerName">
        <el-input v-model="dataForm.volunteerName" placeholder="填入志愿者姓名"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="parentName">
        <el-radio-group v-model="dataForm.volunteerSex">
          <el-radio :label="true">男</el-radio>
          <el-radio :label="false">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="联系电话" prop="volunteerPhone">
        <el-input v-model="dataForm.volunteerPhone" placeholder="志愿者联系电话"></el-input>
      </el-form-item>

      <el-form-item label="救援次数" prop="volunteerParticipate">
        <el-input v-model="dataForm.volunteerParticipate" placeholder="参与救援次数"></el-input>
      </el-form-item>
      <el-form-item label="参与时长" prop="volunteerDuration">
        <el-input v-model="dataForm.volunteerDuration" placeholder="参与时长"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getVolunteerById, updateVolunteer} from "../../../api/volunteer";

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        volunteerId: '',
        volunteerName: '',
        volunteerSex: '',
        volunteerPhone: '',
        volunteerDuration: '',
        volunteerParticipate: ''
      },
      dataRule: {},

    }
  },
  methods: {
    init(id) {
      this.dataForm.volunteerId = id || 0
      getVolunteerById(this.dataForm.volunteerId).then(({data}) => {
        console.log(data)
        this.visible = true
        this.$nextTick(() => {
          if (this.$refs.dataForm !== undefined) {
            this.$refs.dataForm.resetFields()
          }
          if (data && data.code === 10000) {
            var volunteer = data.data.volunteer
            this.dataForm.volunteerId = volunteer.volunteerId,
              this.dataForm.volunteerName = volunteer.volunteerName,
              this.dataForm.volunteerSex = volunteer.volunteerSex,
              this.dataForm.volunteerPhone = volunteer.volunteerPhone,
              this.dataForm.volunteerDuration = volunteer.volunteerDuration,
              this.dataForm.volunteerParticipate = volunteer.volunteerParticipate
          }else{
            this.$message.error(data.msg)
          }
        })

      })
    },
// // 菜单树选中
// menuListTreeCurrentChangeHandle(data, node) {
//   this.dataForm.parentId = data.menuId
//   this.dataForm.parentName = data.name
// },
// // 菜单树设置当前选中节点
// menuListTreeSetCurrentNode() {
//   this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId)
//   this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name']
// },
// // 图标选中
// iconActiveHandle(iconName) {
//   this.dataForm.icon = iconName
// },
// 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.dataForm)
          updateVolunteer(this.dataForm).then(({data}) => {
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

<style>

</style>
