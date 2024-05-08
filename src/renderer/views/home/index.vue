<template>
  <div class="electron-main">
    <div class="electron-main--content">
      <div class="left">
        <MenuBox />
      </div>
      <div class="right">
        <div class="electron-title"></div>
        <div class="electron-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <PlayColumn />
  </div>
</template>

<script lang="ts" setup>
import MenuBox from '@renderer/components/menu-box/index.vue'
import PlayColumn from '@renderer/components/play-column/index.vue'
</script>

<style lang="less">
.electron-main {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-size: 14px;
  color: #94B8A7;

  &--content {
    display: flex;
    flex: 1;
  }

  .left {
    width: 200px;
    padding: 20px 15px;
    background: linear-gradient(to bottom, #387778, 30%, #0B3730);
  }

  .right {
    flex: 1;
    background-color: #0A342D;

    .electron-title {
      width: 100%;
      height: 32px;
      // electron 拖拽
      -webkit-app-region: drag;
      background-color: #fff;
    }

    .electron-content {
      padding: 15px 25px;
    }
  }
}
</style>