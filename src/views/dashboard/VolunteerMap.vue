<template>
  <div class="amap-wrapper" id="home-map">
    <div class="text">在线志愿者位置信息：</div>
    <el-amap
      class="amap-box"
      :vid="'amap-vue'"
      :center="center"
      :zoom="zoom">
      <el-amap-marker v-for="point in markers"
        :position="point[0].position"
        :key="point[0].id">

      </el-amap-marker>
    </el-amap>

  </div>
</template>

<script>
import {getLocations} from "../../api/volunteer";

export default {
  name: "VolunteerMap",
  data() {
    let self = this
    return {
      markers: [],
      zoom: 11,
      center: [120.186128, 30.273835],

    }
  },
  activated() {
    this.InitData()
  },
  methods: {
    InitData() {
      var that = this
      getLocations().then(({data}) => {
        let markers=[]
        if (data && data.code === 10000) {
          this.center = data.data[0]
          data.data.forEach((item, index) => {
            var point = []
            point.push({
              position: [item[0], item[1]],
              id: index
            })
            markers.push(point)
          })
        }
        this.markers = markers
      })
    }
  }
}
</script>

<style scoped>
.amap-wrapper {
  width: 100%;
  height: 360px;
}

.text {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.45);
}
</style>
