import Api from '@api'

export default {
  musicGenres: (unverified = null) => Api.get('/shared/music_genres', { params: { unverified } })
}
