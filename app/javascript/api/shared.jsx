import Api from '@api'

export default {
  musicGenres: () => Api.get('/shared/music_genres')
}
