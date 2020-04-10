import React, { Suspense, lazy } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { configure } from 'mobx'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'

import Header from '@shared/header'
import Notification from '@shared/notification'

const HomePage = lazy(() => import('@pages/home'))
const CreateEventPage = lazy(() => import('@pages/create-event'))

require('semantic-ui-css/semantic.min.css')
import '@shared/application.scss'

configure({ enforceActions: 'observed' })
document.addEventListener('DOMContentLoaded', () => {
  const loading = <Segment>
    <Dimmer active>
      <Loader size="huge" />
    </Dimmer>
  </Segment>

  render(
    <Router>
      <Header />
      <Notification />
      <Suspense fallback={loading}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/create" component={CreateEventPage} />
          <Route path="/:genreSlug" render={props => <HomePage key="2" {...props} />} />
        </Switch>
      </Suspense>
    </Router>,
    document.getElementById('layout')
  )
})
