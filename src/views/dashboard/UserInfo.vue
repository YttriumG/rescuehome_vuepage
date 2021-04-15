<template>
  <el-card class="user-card">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div style="position:relative;">
      <pan-thumb :image=image class="panThumb"/>
      <mallki class-name="mallki-text" :text=userName />
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}">
            <div style="padding-top:35px;" class="progress-item">
              <span>上次登录时间：</span>
              <div>{{ this.$root.lastLoginTime }}</div>
            </div>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}">
            <div style="padding-top:35px;" class="progress-item">
              <span>电子邮箱：</span>
              <div>{{ this.$root.email }}</div>
            </div>
          </el-col>
        </el-row>

    </div>
  </el-card>
</template>

<script>
import Mallki from '@/components/TextHoverEffect/Mallki'
import PanThumb from '@/components/PanThumb'

export default {
  name: "UserInfo",
  components: {
    Mallki,
    PanThumb
  },
  data() {
    return {
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      userName: this.$root.userName
    }
  },
  methods: {

  },
  created() {
  }
}
</script>

<style lang="scss">
.user-card {
  .el-card__header {
    padding: 0px !important;
  }
}
</style>

<style lang="scss" scoped>
.user-card {
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;

      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .mallki-text {
    position: absolute;
    top: 0px;
    left: 100px;
    font-size: 20px;
    font-weight: bold;
  }

  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;

    ::v-deep .pan-info {
      box-shadow: none !important;
    }
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
    right: 0;
  }

  @media only screen and (max-width: 1510px) {
    .mallki-text {
    }
  }
}
</style>
