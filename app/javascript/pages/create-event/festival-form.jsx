import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { get } from 'lodash'

import { Form, Button, Header, Grid, Message } from 'semantic-ui-react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { EventsApi } from '@api'

import Notification from '@shared/notification'
import SortableField from '@shared/sortable-field'

import BaseForm from './base-form'

@observer
export default class FestivalForm extends Component {
  @observable error = ''

  @observable loading = false

  @observable payload = {
    'kind': 'EventFestival',
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
    return <Form id="create-festival" loading={this.loading} onSubmit={this.save}>
      <Header as="h2">Create your Festival</Header>

      {!!this.error && this.renderError()}

      <Grid columns="two">
        <Grid.Column>
          <BaseForm payload={this.payload} error={this.error} />
        </Grid.Column>
        <Grid.Column>
          {this.renderArtist()}
        </Grid.Column>
      </Grid>

      <Button.Group fluid>
        <Button primary>Save</Button>
        <Button secondary as={NavLink} to="/">Cancel</Button>
      </Button.Group>
    </Form>
  }

  renderArtist() {
    return <Form.Field
      name="artists"
      control={SortableField}
      label="Artists"
      value={this.payload['artists']}
      onChange={action(value => this.payload['artists'] = value)}
      typeahead="artists"
      allowAdditions
      required
    />
  }

  renderError() {
    return <Message error header="Something went Wrong" content={this.error} />
  }
}
