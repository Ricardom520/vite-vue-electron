<template>
  <div class="play-column">
    <div class="play-column-info--box">
      <img class="thumb" :src="music.detail?.coverImage"/>
      <div class="desc">
        <p class="title">{{ music.detail?.title }}</p>
        <p class="author">{{ music.detail?.name }}</p>
      </div>

      <img class="like-icon" src="@renderer/images/like.png" />
    </div>

    <Control />

    <Tools />
  </div>
</template>

<script lang="ts" setup>
  import Control from './control.vue'
  import Tools from './tools.vue'
  import { musicStore } from '@renderer/stores/music'

  const music = musicStore()

  console.log('detail:', music.detail)
</script>

<style lang="less">
  .play-column {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid #204640;
    background: #0A342D;

    &-info--box {
      display: flex;
      align-items: center;

      .thumb {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        margin-right: 5px;
      }
    }

    .like-icon, .word-icon {
      width: 20px;
    }
  }
</style>