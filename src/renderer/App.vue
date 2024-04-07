<template>
  <div class="electron-main">
    <div class="left">
      <MenuBox />
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuBox from '@renderer/components/menu-box/index.vue'
</script>

<style lang="less">
.electron-main {
  display: flex;
  width: 100vw;
  height: 100vh;
  font-size: 14px;
  color: #94B8A7;

  .left {
    width: 200px;
    padding: 20px 15px;
    background: linear-gradient(to bottom, #387778, 30%, #0B3730);
  }

  .right {
    flex: 1;
  }
}
</style>