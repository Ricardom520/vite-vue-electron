<template>
  <div @click="onClick" :class="['menu-item', active ? 'active' : '']">{{ label }}</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: String,
  active: Boolean,
  value: String
})

const emit = defineEmits(['onClick'])

function onClick() {
  console.log('onClick')
  emit('onClick', props)
}
</script>