import React, { Suspense, useCallback, useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import './App.css';
//import NewPlace from './places/pages/NewPlace';
//import UpdatePlace from './places/pages/UpdatePlace';
//import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIelements/LoadingSpinner';
//import Authentication from './users/pages/Authentication';
import { AuthContext } from './shared/context/auth-context';

//import Users from './users/pages/Users';

const Users = React.lazy(() => import('./users/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const Authentication = React.lazy(() => import('./users/pages/Authentication'));

let logoutTimer;

function App() {
	const [token, setToken] = useState();
	const [userId, setUserId] = useState();
	const [tokenExpirationDate, setTokenExpirationDate] = useState();

	const login = useCallback((uid, token, expirationDate) => {
		setToken(token);
		setUserId(uid);
		const tokenExpiration =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpiration);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExpiration.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setTokenExpirationDate(null);
		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		)
			login(storedData.userId, storedData.token);
	}, [login]);

	let routes;
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
		);
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
		);

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
				<main>
					<Suspense
						fallback={
							<div>
								<LoadingSpinner asOverlay />
							</div>
						}>
						{routes}
					</Suspense>
				</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
