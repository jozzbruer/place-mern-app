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
	const [token, setToken] = useState()
	const [userId, setUserId] = useState()

	const login = useCallback((uid, token) => {
		setToken(token)
		setUserId(uid)
	}, [])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
	}, [])

	let routes
	if (token)
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
				isLoggedIn: !!token,
				token: token,
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
