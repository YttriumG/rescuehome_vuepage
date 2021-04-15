<template>
  <div class="mod-home">
    <h3 class="component-item">
      <mallki class-name="mallki-text" text="归家行动后台管理系统"/>
    </h3>

    <el-row :gutter="20">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 8}" :lg="{span: 8}" :xl="{span: 8}"
              style="margin-bottom:30px;" id="user-card">
        <user-info/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 14}" :lg="{span: 16}" :xl="{span: 16}"
              style="margin-bottom:30px;" id="basic-info">
        <panel-group @handleSetLineChartData="handleSetLineChartData"/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 16}" :lg="{span: 8}" :xl="{span: 8}"
              style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 16}" :lg="{span: 16}" :xl="{span: 16}"
              style="margin-bottom:30px;">
        <volunteer-map />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <guide/>
    </el-row>

  </div>
</template>

<script>
import UserInfo from "../dashboard/UserInfo";
import PanelGroup from "../dashboard/PanelGroup";
import Mallki from '../../components/TextHoverEffect/Mallki';
import Guide from "../dashboard/Guide";
import Calender from "../dashboard/Calender";
import TodoList from "../dashboard/TodoList";
import VolunteerMap from "../dashboard/VolunteerMap";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  components: {
    TodoList,
    Calender,
    Guide,
    UserInfo,
    PanelGroup,
    Mallki,
    VolunteerMap
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style>
.mod-home {
  line-height: 1.5;
}
.amap-wrapper {
  width: 100%;
  height: 360px;
}
</style>

