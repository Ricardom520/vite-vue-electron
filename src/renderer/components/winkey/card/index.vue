<template>
  <div class="winkey-card">
    <p class="winkey-card-title">{{ title }}</p>
    <div class="winkey-card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps({
    title: String
  })
</script>

<style lang="less">
  .winkey-card {
    &-title {
      color: #C9D6D5;
      font-size: 16px;
    }

    &-content {
      padding: 10px 0;
    }
  }
</style>
