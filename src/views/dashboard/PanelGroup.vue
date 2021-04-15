<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="24" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" @click=missingpeople >
        <div class="card-panel-icon-wrapper icon-people">
          <icon-svg name="newperson" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description" >
          <div class="card-panel-text">
            昨日新增走失人数
          </div>
          <count-to :start-val="0" :end-val=this.newMissing :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" @click=approval>
        <div class="card-panel-icon-wrapper icon-message">
          <icon-svg name="approval" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            待审批走失人员
          </div>
          <count-to :start-val="0" :end-val=this.waitApproval :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <icon-svg name="search" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            成功寻找人数
          </div>
          <count-to :start-val="0" :end-val=this.successFound :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" @click=online>
        <div class="card-panel-icon-wrapper icon-shopping">
          <icon-svg name="online" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            在线志愿者人数
          </div>
          <count-to :start-val="0" :end-val=this.onlineVolunteer :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import {getPanelData} from "../../api/home";

export default {
  components: {
    CountTo
  },
  methods: {
    InitData(){
      getPanelData().then(({data})=>{
        if (data && data.code === 10000){
          this.$nextTick(()=>{
            this.onlineVolunteer = data.data.onlineInfo
            this.waitApproval = data.data.approvalInfo
            this.newMissing = data.data.yesterdayInfo
            this.successFound = data.data.successInfo
          })
        }else {
          this.$message({
            showClose: true,
            message: `错误码:${data.code},错误信息:${data.msg}`,
            type: 'error'
          });
        }
      })
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    missingpeople(){
      this.$router.push('/sys-missing-people')
    },
    approval(){
      this.$router.push('sys-approval')
    },
    online(){
      this.$router.push('report-volunteer-state')
    }

  },
  data() {
    return {
      newMissing:10,
      successFound:10,
      waitApproval:10,
      onlineVolunteer:10
    }
  },
  activated() {
    this.InitData()
  },

}
</script>

<style lang="scss" scoped>
.panel-group {

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
        float: right;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
