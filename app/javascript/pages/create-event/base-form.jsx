import React, { Component, Fragment } from 'react'
import moment from 'moment'

import { Form, Input, Select } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import Typeahead from '@shared/typeahead'

import { SharedApi } from '@api'

@observer
export default class BaseForm extends Component {
  @observable musicGenres = []

  constructor(props) {
    super(props)

    SharedApi.musicGenres().then(action(result => {
      this.musicGenres = result.data
    }))
  }

  get payload() {
    return this.props.payload
  }

  @action onChange = (_, { name, value }) => this.payload[name] = value

  render() {
    return <Fragment>
      {this.renderTitle()}
      {this.renderDate()}
      {this.renderLocation()}
      {this.renderGenres()}
    </Fragment>
  }

  renderTitle() {
    return <Form.Field
      name="title"
      control={Input}
      label="Title"
      value={this.payload['title']}
      onChange={this.onChange}
      required
    />
  }

  renderDate() {
    const minDate = moment().add(1, 'day')

    return <Form.Field
      name="date"
      control={DateInput}
      label="Date"
      value={this.payload['date']}
      onChange={this.onChange}
      popupPosition="top center"
      minDate={minDate}
      hideMobileKeyboard
      closable
      required
    />
  }

  renderLocation() {
    return <Form.Field
      name="location"
      control={Typeahead}
      label="Location"
      value={this.payload['location']}
      onChange={this.onChange}
      source="locations"
      allowAdditions
      required
    />
  }

  renderGenres() {
    const addItem = action((_, { value }) => this.musicGenres.push({ value, text: value }))

    return <Form.Field
      name="music_genres"
      control={Select}
      label="Music Genre"
      value={this.payload['music_genres']}
      onChange={this.onChange}
      source="music_genres"
      loading={!this.musicGenres.length}
      options={this.musicGenres}
      onAddItem={addItem}
      allowAdditions
      multiple
      required
      search
    />
  }
}
