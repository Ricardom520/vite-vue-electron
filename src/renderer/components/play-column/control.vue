<template>
  <div class="play-column-control">
    <audio v-hidden="true" :src="music.detail?.songUrl" ref="audioPlayer"></audio>
    <div class="play-column-control--btn">
      <img class="previou" src="@renderer/images/previou.png" />
      <div class="status-box" @click="changeAudioStatue" >
        <img v-if="state.status === 'play'" class="status" src="@renderer/images/pause.png" />
        <img v-else class="status" src="@renderer/images/play.png" />
      </div>
      <img class="next" src="@renderer/images/next.png" />
    </div>
    <div class="play-column-control--process">
      <span class="currentTime">{{ state.currentTime }}</span>
      <div 
        class="process-box" 
        ref="processBox" 
        @click="onClickProcessBox" 
        @mousedown="startDragging" 
      >
        <div class="process-line">
          <div class="process-line--current" :style="{width: state.process + '%'}">
            <div class="process-line--drag"></div>
          </div>
        </div>
      </div>
      <span class="durationTime">{{ durationTime }}</span>    
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive, onBeforeMount, computed } from 'vue'
  import { formatDuration } from '@renderer/utils/tools'
  import { musicStore } from '@renderer/stores/music'

  const audioPlayer = ref<HTMLAudioElement>(null)
  const processBox = ref<HTMLDivElement>(null)
  const music = musicStore()

  const durationTime = computed(() => formatDuration(music.detail?.duration))

  let audioElement: HTMLAudioElement = null

  let { ipcRenderer } = window

  // 是否正在拖拽
  let isDragging = false

  const state = reactive({
    currentTime: '00:00',
    status: 'pause',
    process: 0
  })

  const updateProcess = (e) => {
    if (!isDragging) return
    const precent = e.offsetX / processBox.value.clientWidth
    state.process = precent * 100
    audioElement.currentTime = precent * music.detail.duration
  }

  const onClickProcessBox = (e) => {
    const precent = e.offsetX / processBox.value.clientWidth
    state.process = precent * 100
    audioElement.currentTime = precent * music.detail.duration
  }

  const startDragging = () => {
    isDragging = true
  }

  const stopDragging = () => {
    isDragging = false
  }

  /** 改变播放状态 */
  const changeAudioStatue = () => {
    if (audioElement) {
      if (state.status === 'pause') {
        state.status = 'play'
        audioElement.play()
      } else {
        state.status = 'pause'
        audioElement.pause()
      }
      console.log('changeAudioState:', state.status)
      ipcRenderer.send('music-change-status', state.status)
    }
  }

  onMounted(() => {
    audioElement = audioPlayer.value

    // 监听timeupdate 事件，在播放过程中更新当前播放时间
    audioElement.addEventListener('timeupdate', (e: any) => {
      state.currentTime = formatDuration(e.target.currentTime)
      state.process = e.target.currentTime * 100 / music.detail.duration
    })

    processBox.value.addEventListener('mousemove', updateProcess)
    processBox.value.addEventListener('mouseup', stopDragging)
  })

  onBeforeMount(() => {
    if (processBox.value) {
      processBox.value.removeEventListener('mousemove', updateProcess)
      processBox.value.removeEventListener('mouseup', stopDragging)
    }
  })
</script>

<style lang="less">
  .play-column-control {
    display: grid;
    justify-items: center;
    width: 40%;
    user-select: none;

    &--btn {
      display: flex;
      align-items: center;

      img {
        width: 20px;
      }

      .status-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 30px;
        background-color: #E7C988;
        border-radius: 30px;
        margin: 0 20px;
        cursor: pointer;
      }
    }

    &--process {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 12px;

      .process-box {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 5px;
        height: 8px;
        cursor: pointer;

        .process-line {
          width: 100%;
          height: 2px;
          background-color: #214741;

          &--current {
            height: 2px;
            background-color: #fff;
          }
        }
      }
    }
  }
</style>

