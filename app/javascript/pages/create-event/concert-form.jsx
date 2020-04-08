import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { get } from 'lodash'

import { Form, Button, Header, Message } from 'semantic-ui-react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { EventsApi } from '@api'

import Notification from '@shared/notification'
import Typeahead from '@shared/typeahead'

import BaseForm from './base-form'

@observer
export default class ConcertForm extends Component {
  @observable error = ''

  @observable loading = false

  @observable payload = {
    'kind': 'EventConcert',
    'title': '',
    'date': '',
    'location': '',
    'music_genres': [],
    'artists': [],
  }

  @action save = () => {
    this.loading = true
    EventsApi.create(this.payload).then(() => {
      Notification.send('success', 'Event created successfully')
      this.props.history.push('/')
    }).catch(result => {
      this.error = get(result, 'response.data.error')
      this.loading = false
    })
  }

  render() {
    return <Form id="create-concert" loading={this.loading} onSubmit={this.save}>
      <Header as="h2">Create your Concert</Header>

      {!!this.error && this.renderError()}

      <BaseForm payload={this.payload} error={this.error} />
      {this.renderArtist()}

      <Button.Group fluid>
        <Button primary>Save</Button>
        <Button secondary as={NavLink} to="/">Cancel</Button>
      </Button.Group>
    </Form>
  }

  renderArtist() {
    return <Form.Field
      name="artists"
      control={Typeahead}
      label="Artist"
      value={this.payload['artists'][0]}
      onChange={action((_, { value }) => this.payload['artists'] = [value])}
      source="artists"
      allowAdditions
      required
    />
  }

  renderError() {
    return <Message error header="Something went Wrong" content={this.error} />
  }
}
