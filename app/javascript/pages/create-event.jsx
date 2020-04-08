import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import SelectPage from './create-event/select-type'
import ConcertForm from './create-event/concert-form'
import FestivalForm from './create-event/festival-form'

import './create-event.scss'

export default function() {
  let { url } = useRouteMatch();

  return <Switch>
    <Route path={`${url}/concert`} component={ConcertForm} />
    <Route path={`${url}/festival`} component={FestivalForm} />
    <Route component={SelectPage} />
  </Switch>
}
