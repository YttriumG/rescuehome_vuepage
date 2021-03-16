<template>
  <div class="mod-home">
    <h3>归家行动后台管理系统简介</h3>

    <p>
      &#8195;&#8195; 本系统基于SpringBoot和Vue实现。
    </p>
    <h3>主要技术</h3>
    <ul>前端
      <li>技术栈：Vue2.0 、element-ui、Bootstrap、Jquary</li>
      <li>网络请求：axios</li>
      <li>Router：动态添加</li>
      <li>报表统计：echarts</li>
      <li>地图展示：高德地图(Vue-aMap)，支持定位、搜索、展示搜索文本卡窗</li>
      <li>其他：本地测试通过mock配置对接口数据／mock模拟数据进行切换</li>
    </ul>
    <ul>后台
      <li>技术栈：  SpringBoot、MyBatisPlus</li>
      <li>权限控制： Shiro</li>
      <li>跨域： 基于Token验证和Cors配置</li>
    </ul>
  </div>
</template>

<script>
  export default {
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
</style>

