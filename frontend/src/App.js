import { useCallback, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './App.css';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Authentication from './users/pages/Authentication';
import { Authcontext } from './shared/context/auth-context'

import Users from './users/pages/Users';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(
    () => {
     setIsLoggedIn(true) 
    },
    []
  )

  const logout = useCallback(
    () => {
      setIsLoggedIn(false)
    },
    []
  )

  return (
    <Authcontext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/auth">
              <Authentication />
            </Route>
            <Route path="/:userId/places" exact>
              <UserPlaces />
            </Route>
            <Route path="/places/new" exact>
              <NewPlace />
            </Route>
            <Route path="/places/:placeId" exact>
              <UpdatePlace />
            </Route>
            <Redirect to='/' />
          </Switch>
        </main>
      </Router>
    </Authcontext.Provider>
  );
}

export default App;
