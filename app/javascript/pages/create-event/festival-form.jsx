import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Form, Button, Header, Grid } from 'semantic-ui-react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

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
    'location_id': '',
    'music_genre_ids': [],
    'artist_ids': [],
  }

  @action save = () => {

  }

  render() {
    return <Form id="create-festival" loading={this.loading} onSubmit={this.save}>
      <Header as="h2">Create your Festival</Header>

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
      name="artist_ids"
      control={SortableField}
      label="Artists"
      value={this.payload['artist_ids']}
      onChange={action((value) => this.payload['artist_ids'] = value)}
      typeahead="artists"
      allowAdditions
      required
    />
  }
}
