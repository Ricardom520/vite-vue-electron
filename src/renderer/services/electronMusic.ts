import type {Axios, AxiosRequestConfig} from 'axios'
import { serverHost } from '@renderer/utils/const'
import type { FetchMusicDetailReq, FetchMusicWordReq } from '@renderer/models/electronMusic/req'
import type { MusicSongInfo, MusicSongInfoDetail } from '@renderer/models/electronMusic/res'
import type { BaseResponse } from '@renderer/models/base'

const fetchers = (fetcher: Axios) => {
  return {
    'GET/electronMusic/list': () => {
      return fetcher.get<null, BaseResponse<MusicSongInfo[]>>(`${serverHost}/list`)
    },
    'GET/electronMusic/detail': (params: FetchMusicDetailReq) => {
      return fetcher.get<FetchMusicDetailReq, BaseResponse<MusicSongInfoDetail>>(`${serverHost}/detail?id=${params.id}`)
    },
    'GET/electronMusic/getWord': (params: FetchMusicWordReq) => {
      return fetcher.get<FetchMusicDetailReq, BaseResponse<string>>(`${serverHost}/getWord?id=${params.id}`)
    }
  }
}

export default fetchers