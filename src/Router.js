import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Heroes from './components/heroes'
import Comics from './components/comics'
import Creators from './components/creators'

export default function Router() {
  return(
    <Switch>
      <Route exact path='/' component={Heroes} />
      <Route path='/comics' component={Comics} />
      <Route path='/creators' component={Creators} />
    </Switch>
  )
}