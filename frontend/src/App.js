import { useCallback, useState } from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import './App.css'
import NewPlace from './places/pages/NewPlace'
import UpdatePlace from './places/pages/UpdatePlace'
import UserPlaces from './places/pages/UserPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import Authentication from './users/pages/Authentication'
import { AuthContext } from './shared/context/auth-context'

import Users from './users/pages/Users'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userId, setUserId] = useState()

	const login = useCallback((uid) => {
		setIsLoggedIn(true)
		setUserId(uid)
	}, [])

	const logout = useCallback(() => {
		setIsLoggedIn(false)
		setUserId(null)
	}, [])

	let routes
	if (isLoggedIn)
		routes = (
			<Switch>
				<Route path='/' exact>
					<Users />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Route path='/places/new' exact>
					<NewPlace />
				</Route>
				<Route path='/places/:placeId' exact>
					<UpdatePlace />
				</Route>
				<Redirect to='/' />
			</Switch>
		)
	else
		routes = (
			<Switch>
				<Route path='/auth' exact>
					<Authentication />
				</Route>
				<Route path='/' exact>
					<Users />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Redirect to='/auth' />
			</Switch>
		)

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				userId: userId,
				login: login,
				logout: logout,
			}}>
			<Router>
				<MainNavigation />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	)
}

export default App
