import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Form, Button, Header } from 'semantic-ui-react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

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
    'location_id': '',
    'music_genre_ids': [],
    'artist_ids': [],
  }

  @action save = () => {

  }

  render() {
    return <Form id="create-concert" loading={this.loading} onSubmit={this.save}>
      <Header as="h2">Create your Concert</Header>
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
      name="artist_ids"
      control={Typeahead}
      label="Artist"
      value={this.payload['artist_ids'][0]}
      onChange={action((_, { value }) => this.payload['artist_ids'] = [value])}
      source="artists"
      allowAdditions
      required
    />
  }
}
