import Api from '@api'

export default {
  create: params => Api.post('/events', { event: params }),
  index:  params => Api.get('/events', { params }),
}
