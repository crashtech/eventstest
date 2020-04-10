import React, { Component } from 'react'
import { includes } from 'lodash'

import { Checkbox, Header, List, Loader, Segment } from 'semantic-ui-react'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'

import { SharedApi } from '@api'

import './filters.scss'

@observer
export default class Filters extends Component {
  @observable genres = []

  @observable loading = true

  constructor(props) {
    super(props)

    SharedApi.musicGenres().then(action(result => {
      this.genres = result.data
      this.loading = false
    }))
  }

  @computed get isEmpty() {
    return this.props.value.length === 0
  }

  @action toggleGenre = (_, { value, checked }) => {
    const { value: inputValue, onChange } = this.props

    if(checked) {
      inputValue.splice(inputValue.indexOf(value), 1)
    } else {
      inputValue.push(value)
    }

    onChange().then(result => result.update(result.data))
  }

  render() {
    return <Segment id="filters">
      <Header as="h3">Filters</Header>
      <List>
        {this.loading && (
          <List.Item>
            <Loader size="big" />
          </List.Item>
        )}
        {this.genres.map((item, index) => (
          <List.Item key={index}>
            <Checkbox
              name="genres"
              label={item.text}
              value={item.value}
              checked={this.isEmpty || !includes(this.props.value, item.value)}
              onChange={this.toggleGenre}
            />
          </List.Item>
        ))}
      </List>
    </Segment>
  }
}
