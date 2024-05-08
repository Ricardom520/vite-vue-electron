<template>
  <div class="menu-container">
    <div class="menu-logo">
      <img src="@renderer/images/logo.png" />
    </div>
  </div>
  <div>
    <wk-menu :datas="onlineMusic" @change="onMenuChange"></wk-menu>
    <wk-menu :datas="musicMusic" @change="onMenuChange"></wk-menu>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

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

  currentPath.value = '/home/' + value

  router.push(currentPath.value);
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