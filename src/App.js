import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import NotFound from './components/Not Found'
import ProtectedRoute from './components/ProtectedRoute'
import JobItem from './components/JobItem'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
    <NotFound />
  </Switch>
)

export default App
