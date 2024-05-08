<template>
  <div>
    <!---->
    <wk-card title="Hi Ricardom 今日为你推荐">
      <div>
        <MusicCard v-for="item in music.list" :key="item.id" :datas="item" />
      </div>
    </wk-card>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import MusicCard from '@renderer/components/music-card/index.vue'
  import { musicStore } from '@renderer/stores/music'

  const music = musicStore()

  onMounted(() => {
    music.fetchMusicLists()
    music.fetchMusicDetail('a144816c8ef09c4110c702aed219852b')
  })
</script>