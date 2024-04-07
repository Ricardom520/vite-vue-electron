<template>
  <div class="menu-container">
    <div class="menu-logo">
      <img src="@renderer/images/logo.png" />
    </div>
  </div>
  <div>
    <Menu :datas="onlineMusic" @change="onMenuChange"></Menu>
    <Menu :datas="musicMusic" @change="onMenuChange"></Menu>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Menu from '../menu/index.vue'

const route = useRoute()

let currentPath = ref(route.path)

const onlineMusic = reactive<{
  title: string
  options: {
    label: string
    value: string
    active?: boolean
  }[]
}>({
  title: '在线音乐',
  options: [
    {
      label: '推荐',
      value: 'recommend'
    },
    {
      label: '乐馆',
      value: 'musicRoom'
    },
    {
      label: '视频',
      value: 'video'
    }
  ]
})

const musicMusic = reactive<{
  title: string
  options: {
    label: string
    value: string
    active?: boolean
  }[]
}>({
  title: '我的音乐',
  options: [
    {
      label: '喜欢',
      value: 'like'
    },
    {
      label: '最近播放',
      value: 'history'
    },
    {
      label: '本地和下载',
      value: 'download'
    }
  ]
})

function onMenuChange(params) {
  console.log('params:', params)
  const { value } = params

  currentPath.value = value
}

function handleRoute() {
  for(let i = 0; i < onlineMusic.options.length; i++) {
    const info = onlineMusic.options[i]
    if (currentPath.value.includes(onlineMusic.options[i].value)) {
      onlineMusic.options.splice(i, 1, {
        ...info,
        active: true
      })
    } else {
      onlineMusic.options.splice(i, 1, {
        ...info,
        active: false
      })
    }
  }

  for(let i = 0; i < musicMusic.options.length; i++) {
    const info = musicMusic.options[i]
    if (currentPath.value.includes(musicMusic.options[i].value)) {
      musicMusic.options.splice(i, 1, {
        ...info,
        active: true
      })
    } else {
      musicMusic.options.splice(i, 1, {
        ...info,
        active: false
      })
    }
  }
}

onMounted(() => handleRoute())

watch(() => route.path, (to) => {
  currentPath.value = to
})

watch(() => currentPath.value, () => {
  console.log('????')
  handleRoute()
})
</script>

<style lang="less">
.menu-container {
  width: 100%;

  .menu-logo {
    width: 100%;

    img {
      width: 100%;
    }
  }
}
</style>