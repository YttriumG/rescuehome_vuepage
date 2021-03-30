<template>
  <el-dialog
    title="提示"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div slot="title" class="el-header">
      <span class="title"> {{ dataForm.familyName }}的详细资料   </span>
    </div>
    <el-form v-model="dataForm" ref="dataForm" label-width="150px">
      <el-form-item label="姓名" prop="familyName">
        <div>{{ dataForm.familyName }}</div>
      </el-form-item>
      <el-form-item label="性别" prop="familySex">
        <template slot-scope="scope">
          <div v-if="dataForm.familySex">男</div>
          <div v-else size="small">女</div>
        </template>
      </el-form-item>
      <el-form-item label="寻找对象" prop="missingName">
        <div>{{ dataForm.missingName }}</div>
      </el-form-item>
      <el-form-item label="联系电话" prop="familyPhone">
        <div>{{ dataForm.familyPhone }}</div>
      </el-form-item>
      <el-form-item label="家庭住址" prop="familyPlace">
        <div>{{ dataForm.familyPlace }}</div>
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script>
import {getFamilyById} from "../../../api/family";
import {getMissingPeopleById} from "../../../api/missingPeople";

export default {
  name: "family-info",
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
      }
    }
  },
  methods: {
    init(id) {
      var that = this
      this.dataForm.familyId = id
      getFamilyById(id).then(({data}) => {
        if (data && data.code === 10000) {
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
            getMissingPeopleById(family.missingId).then(({data}) =>{
              console.log(data)
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
    }
  }
}
</script>

<style scoped>

</style>
