<template>
  <div class="lyrics-container">
    <div class="btns-line">
      <img class="previou" src="@renderer/images/previou.png" />
      <div class="status-box" >
        <!-- <img v-if="state.status === 'play'" class="status" src="@renderer/images/pause.png" /> -->
        <!-- <img v-else class="status" src="@renderer/images/play.png" /> -->
      </div>
      <img class="next" src="@renderer/images/next.png" />
    </div>
    <div class="lyrics-line" :data-content="state.content">
      <p :style="{backgroundSize: state.current + '% 100%'}">{{ state.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'

  const { ipcRenderer } = window

  let timer = ref<number>(null)

  const state = reactive({
    word: null,
    content: '爱音乐，就在欢乐无限',
    startTime: 0,
    pauseTime: 0,
    currentTime: 0,
    current: 0,
    currentIndex: -1
  })

  function updateProcess() {
    const startTime = state.word[state.currentIndex]?.timestamp || 0
    const endTime = state.word[state.currentIndex + 1]?.timestamp
    const currentTime = (performance.now() - state.startTime) / 1000 + state.currentTime
    const interval = currentTime - startTime

    if (endTime < currentTime) {
      // 越界说明下一个
      state.currentIndex += 1
      state.content = state.word[state.currentIndex].content
      state.current = 0
    } else {
      state.current = interval * 100 / (endTime - startTime)
    }
    timer.value = requestAnimationFrame(updateProcess)
  }

  onMounted(() => {
    ipcRenderer.send('window-init', {
      id: 'lyrics-window'
    })

    ipcRenderer.on('init-word', (event, message) => {
      console.log('event:', event)
      console.log('message:', message)
      state.word = JSON.parse(message)
    })

    ipcRenderer.on('music-change-status', (event, data) => {
      console.log('data:', data)
      if (data === 'play') {
        state.startTime = performance.now()
        timer.value = requestAnimationFrame(updateProcess)
        console.log('timer:', timer)
      } else {
        state.currentTime = (performance.now() - state.startTime) / 1000 + state.currentTime
        cancelAnimationFrame(timer.value)
      }
    })
  })
</script>

<style lang="less">
  .lyrics-container {
    width: 500px;
    height: 100px;
    padding: 10px 0;
    text-align: center;
    background-color: rgba(#000, .6);
    // electron 拖拽
    -webkit-app-region: drag;

    .btns-line {
      display: flex;
      justify-content: center;
      margin-bottom: 5px;

      img {
        width: 20px;
      }
    }

    .lyrics-line {
      position: relative;
      display: inline-block;
      margin: 0 auto;
      font-size: 30px;

      p {
        position: relative;
        background: transparent -webkit-linear-gradient(top, #ECD56B, #DBD124) no-repeat 0 0;
        // background-image: -webkit-linear-gradient(top, #79BEE9, #1C68B5);
        // 裁剪出文字的背景,将其赋值到文案位置上
        // 把裁剪缕空的文字弄透明，这样就可以通过缕空的形状看到背景颜色
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;  
        background-size: 0 100%;
      }

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // background: transparent -webkit-linear-gradient(top, #ECD56B, #DBD124) no-repeat 0 0;
        background-image: -webkit-linear-gradient(top, #79BEE9, #1C68B5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 100%;
        content: attr(data-content);
      }
    }
  }

  @keyframes scan {
    0% {
		background-size:0 100%;
	}
	100% {
		background-size:100% 100%;
	}
  }
</style>