import Api from '@api'

export default {
  musicGenres: () => {
    return Api.get('/shared/music_genres')
  }
}
