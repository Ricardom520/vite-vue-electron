<template>
  <div class="play-column-tools">
    <img @click="handleLyricsLayout" class="word-icon" :src="state.wordOpen ? wordActiveIcon : wordIcon" /> 
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive } from 'vue'
  import fetchers from '@renderer/services'
  import { musicStore } from '@renderer/stores/music'
  import wordIcon from '@renderer/images/word.png'
  import wordActiveIcon from '@renderer/images/word-active.png'

  const music = musicStore()

  const state = reactive({
    wordOpen: false
  })


  let { ipcRenderer } = window

  if (!ipcRenderer) {
    ipcRenderer = {} as any
    ipcRenderer.on = ipcRenderer.invoke = ipcRenderer.removeListener = (...args: any): any => console.log('not electron')
  }

  const handleLyricsLayout = async () => {
    if (!music.word.length) {
      await music.fetchMusicWordInfo(music.detail.id)
    }

    if (state.wordOpen) {
      ipcRenderer.invoke('close-win', {
        id: 'lyrics-window',
      })
    } else {
      ipcRenderer.invoke('open-win', {
        url: `/lyrics/tool?songId=${music.detail.id}`,
        width: 500,
        height: 100,
        transparent: true,
        alwaysOnTop: true,
        id: 'lyrics-window',
        sendData: JSON.stringify(music.word)
      })
    }

    state.wordOpen = !state.wordOpen
  }
</script>