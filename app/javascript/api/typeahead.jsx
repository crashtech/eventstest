import Api from '@api'

export default function(source) {
  return function(value) {
    return Api.get(`typeahead/${source}`, { params: { value } })
  }
}
