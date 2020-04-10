import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Label, Header } from 'semantic-ui-react'
import { observer } from 'mobx-react'

import Listing from '@shared/listing'

import './list.scss'

@observer
export default class List extends Component {
  render() {
    const { items, fetcher } = this.props

    return <Listing
      items={items}
      fetcher={fetcher}
      renderer={this.renderItem}
      fallback="No events were found"
      dividedBy="day"
      dividedProp="date"
    />
  }

  renderItem = item => this[`render${item['kind']}`](item)

  renderEventConcert(item) {
    return <div className="concert">
      <Header as="h3">{item['title']}</Header>
      <Header as="h4">{item['artist']}</Header>
      <div>{item['location']['name']}</div>
      {this.renderGenres(item)}
    </div>
  }

  renderEventFestival(item) {
    const artists = item['artists'].join(', ')

    return <div className="festival">
      <Header as="h3">{item['title']}</Header>
      <Header as="h4">{artists}</Header>
      <div>{item['location']['name']}</div>
      {this.renderGenres(item)}
    </div>
  }

  renderGenres(item) {
    return <ul>
      {(item['music_genres'] || []).map((genre, idx) => (
        <li key={idx}>
          {genre['slug'] && (
            <Label basic color="blue" as={NavLink} to={`/${genre['slug']}`}>
              {genre['name']}
            </Label>
          ) || (
            <Label basic>{genre['name']}</Label>
          )}
        </li>
      ))}
    </ul>
  }
}
