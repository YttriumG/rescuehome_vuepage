<template>
  <div class="app-container">
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
      {{ ('初次使用，请点击引导按钮') }}
    </el-button>
  </div>
</template>

<script>
import Driver from "driver.js"
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './step'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>

<style scoped>

</style>
