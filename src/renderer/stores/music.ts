import fetchers from '@renderer/services'
import { defineStore } from 'pinia'
import { formatTimeToNumber } from '../utils/tools'

export const musicStore = defineStore('music', {
  state: () => ({
    list: [],
    loading: false,
    detail: null,
    error: null,
    word: [],
  }),
  actions: {
    async fetchMusicLists() {
      try {
        this.loading = true

        const response = await fetchers['GET/electronMusic/list']()

        if (response.code === 0) {
          this.list = response.data
        }
        console.log('response:', response)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async fetchMusicDetail(id: string) {
      try {
        const response = await fetchers['GET/electronMusic/detail']({
          id
        })

        if (response.code === 0) {
          this.detail = response.data
        }
      } catch (err) {
        this.error = err.message
      }
    },
    async fetchMusicWordInfo(id: string) {
      try {
        const response = await fetchers['GET/electronMusic/getWord']({
          id
        })

        if (response.code === 0) {
          // this.word = response.data
          const data = response.data
          const arrs = data.split('\n')
          const regex = /\[(.*)\](.*)/
          const word = []

          for (let i = 0; i < arrs.length; i++) {
            const match = arrs[i].match(regex)
            if (match) {
              const time = formatTimeToNumber(match[1])

              word.push({
                timestamp: time,
                content: match[2]
              })
            }
          }

          this.word = word

          console.log(this.word)
        }
      } catch (err) {
        this.error = err.message
      }
    }
  }
})