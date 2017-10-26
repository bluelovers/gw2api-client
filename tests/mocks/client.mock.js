import fetch from 'lets-fetch/mock'
import nullCache from '../../build/cache/null'
import memoryCache from '../../build/cache/memory'

export const mockClient = {
  lang: 'en',
  apiKey: false,
  fetch: fetch,
  caches: [nullCache(), memoryCache(), memoryCache()],
  language: function (lang) {
    this.lang = lang
  },
  authenticate: function (key) {
    this.apiKey = key
  }
}

export const fetchMock = fetch
