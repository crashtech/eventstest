import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'

import { Segment, Grid, Icon, Header } from 'semantic-ui-react'

export default function() {
  const { url } = useRouteMatch()

  return <Segment placeholder basic>
    <Grid columns="two">
      <Grid.Column textAlign="center">
        <Header icon as={NavLink} to={`${url}/concert`}>
          <Icon name="user" />
          Create a Concert for a single Artist
        </Header>
      </Grid.Column>
      <Grid.Column textAlign="center">
        <Header icon as={NavLink} to={`${url}/festival`}>
          <Icon name="group" />
          Create a Festival with multiple Artists
        </Header>
      </Grid.Column>
    </Grid>
  </Segment>
}
