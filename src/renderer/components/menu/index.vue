<template>
  <div class="menu-box">
    <p class="title">{{datas.title}}</p>
    <div>
      <Item v-for="item in datas.options" :label="item.label" :value="item.value" :active="item.active" @onClick="onClickItem"></Item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import Item from './item.vue'

const props = defineProps({
  datas: Object
})

const emit = defineEmits(['change'])

function onClickItem(value) {
  emit('change', value)
}
</script>

<style lang="less" scoped>
.menu-box {
  .title {
    padding: 10px 0;
  }

  .menu-item {
    padding: 8px 5px;
    margin-bottom: 3px;
    cursor: pointer;

    &:hover, &.active {
      color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
    }
  }
}
</style>