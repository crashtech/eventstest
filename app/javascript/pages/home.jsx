import React, { Component } from 'react'
import cx from 'classnames'
import { get } from 'lodash'

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { EventsApi } from '@api'

import List from './home/list'
import Filters from './home/filters'

import './home.scss'

@observer
export default class Home extends Component {
  @observable genres = []

  @observable items = []

  get genreSlug() {
    return get(this.props, 'match.params.genreSlug')
  }

  @action update = items => {
    this.items = items
  }

  fetch = (params = {}) => {
    if(this.genres.length) { params['skip_genres'] = this.genres }
    if(this.genreSlug) { params['genre_slug'] = this.genreSlug }
    return EventsApi.index(params).then(result => {
      result.update = this.update
      return result
    })
  }

  render() {
    const classes = cx({ 'with-filters': !this.genreSlug })

    return <div id="home" className={classes}>
      {!this.genreSlug && <Filters value={this.genres} onChange={this.fetch} />}
      <List items={this.items} fetcher={this.fetch} />
    </div>
  }
}
