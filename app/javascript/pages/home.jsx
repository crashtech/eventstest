import React, { Component, Fragment } from 'react'

import { observable, action, runInAction } from 'mobx'
import { observer } from 'mobx-react'

import { EventsApi } from '@api'

import List from './home/list'
import Filters from './home/filters'

import './home.scss'

@observer
export default class Home extends Component {
  @observable genres = []

  @observable items = []

  genreSlug = null

  constructor(props) {
    super(props)

    const { genreSlug } = props.match.params
    if(genreSlug) {
      this.genreSlug = genreSlug
      runInAction(() => this.genres = [genreSlug])
    }

    this.fetch()
  }

  @action fetch = () => {
    this.refetch().then(result => {
      this.items = result.data
    })
  }

  refetch = (params = {}) => {
    if(this.genres.length) { params['skip_genres'] = this.genres }
    if(this.genreSlug) { params['genre_slug'] = this.genreSlug }
    return EventsApi.index(params)
  }

  render() {
    return <Fragment>
      {!this.genreSlug && <Filters value={this.genres} onChange={this.fetch} />}
      <List items={this.items} loader={this.refetch} />
    </Fragment>
  }
}
