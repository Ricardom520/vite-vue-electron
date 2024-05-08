export type BaseResponse<T> = {
  code: number
  success: string
  data: T
}