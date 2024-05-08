export interface MusicSongInfo {
  /** 歌曲ID */
  id: string
  /** 歌曲名称 */
  title: string
  /** 演唱者ID */
  artistId: number
  /** 歌曲专辑ID */
  albumId: string
  /** 歌曲时长 */
  duration: number
  /** 创建者 */
  createBy: number
  /** 歌曲封面 */
  coverImage: string
  /** 歌曲连接 */
  songUrl: string
  /** 创建时间 */
  createdTime: string
  /** 更新时间 */
  updatedTime: string
}

/** 作者详情 */
export type MusicSongArtistInfo = {
  /** @name 演唱者id */
  id: string
  /** @name 演唱者名称 */
  name: string
  /** @name 国籍 */
  nationality: string
  /** @name 简介 */
  biography: string
  /** 创建时间 */
  createdTie: string
  /** 更新时间 */
  updateTime: string
}

/** 歌曲详情 */
export type MusicSongInfoDetail = MusicSongInfo & MusicSongArtistInfo