<template>
  <div class="music-card">
    <div class="music-card-thumb--box">
      <img class="music-card-thumb--url" :src="datas.coverImage" /> 
      <div class="music-card-thumb--mask"></div>
      <img class="music-card-thumb--cover-play" src="@renderer/images/cover_play.png"  />
    </div>
    <div class="music-card-desc">
      <p class="line">{{ datas.title }}</p>
      <p class="line">每日30首</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'
  import type { MusicSongInfo } from '@renderer/models/electronMusic/res'

  defineProps({
    datas: Object
  })
</script>

<style lang="less">
  .music-card {
    width: 200px;

    &-thumb {
      &--box {
        position: relative;
        width: 100%;
        aspect-ratio: 1/1;
        border-radius: 5px;
        overflow: hidden;

        &:hover {
          cursor: pointer;

          .music-card-thumb--url {
            transform: scale(1.1);
          }

          .music-card-thumb--mask, .music-card-thumb--cover-play {
            opacity: 1;
          }
        }
      }

      &--url {
        width: 100%;
        height: 100%;
        transition: all ease-in-out .3s;
      }

      &--mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        opacity: 0;
        z-index: 1;
        transition: all ease-in-out .1s;
      }

      &--cover-play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        opacity: 0;
        z-index: 2;
        transition: all ease-in-out .1s;
      }
    }

    &-desc {
      margin-top: 5px;
      .line {

      }
    }
  }
</style>