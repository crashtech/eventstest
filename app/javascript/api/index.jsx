import axios from 'axios'

import makeMobxLocation from 'mobx-location'

import SharedApi from './shared'
import TypeaheadApi from './typeahead'

const { protocol, host } = makeMobxLocation({ hashHistory: false })
const BASE_URL = `${protocol}//${host}/api`

const Api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

// Add date and timezone information
Api.interceptors.request.use(config => {
  config.headers['X-DATE'] = (new Date()).toString()
  config.headers['X-TZ'] = Intl.DateTimeFormat().resolvedOptions().timeZone
  return config
})

export { SharedApi, TypeaheadApi }

export const CABLE_URL = `${BASE_URL}/cable`.replace(/^http/, 'ws')
export default Api
