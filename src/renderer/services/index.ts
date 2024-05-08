import axios from 'axios'
import electronMusicFetcher from './electronMusic'

const service = axios.create({
  baseURL: '/',
  timeout: 10000,
  withCredentials: true,
})

service.interceptors.request.use(
  async req => {
    return req
  },
  function (error) {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  res => {
    return res.data
  },
  function (error) {
    return Promise.reject(error)
  },
)

const fetchers = {
  ...electronMusicFetcher(service),
}

export {service}

export default fetchers
