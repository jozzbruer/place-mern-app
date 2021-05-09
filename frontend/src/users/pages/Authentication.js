import React, { useState, useContext } from 'react'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIelements/Card'
import { AuthContext } from '../../shared/context/auth-context'
import ErrorModal from '../../shared/components/UIelements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'

import './Authentication.css'
import axios from 'axios'

function Authentication() {
	const auth = useContext(AuthContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [isLoginMode, setIsLoginMode] = useState(true)

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState()
	const data = {
		email,
		password,
	}

	const headers = {
		'Content-Type': 'application/json',
	}

	const saveData = {
		name: username,
		email,
		password,
	}
	function changeEmailHandler(event) {
		setEmail(event.target.value)
	}
	function changeUsernameHandler(event) {
		setUsername(event.target.value)
	}
	function changePasswordHandler(event) {
		setPassword(event.target.value)
	}

	function sendData(e) {
		e.preventDefault()
		if (isLoginMode) {
			setIsLoading(true)
			axios
				.post('http://localhost:5000/api/users/login', data, headers)
				.then((response) => {
					if (response.statusText !== 'OK') {
						throw new Error(response.message)
					}
					setIsLoading(false)
					auth.login()
				})
				.catch((err) => {
					console.log(err.message)
					setIsLoading(false)
					setError('Email or password wrong')
				})
		} else {
			setIsLoading(true)
			axios
				.post('http://localhost:5000/api/users/signup', saveData, headers)
				.then((response) => {
					if (response.statusText !== 'OK') {
						throw new Error(response.message)
					}
					console.log(response)
					setIsLoading(false)
					auth.login()
				})
				.catch((err) => {
					console.log(err.message)
					setIsLoading(false)
					setError('Something went wrong, please check it out')
				})
		}
	}
	function switchModeHandler() {
		setIsLoginMode(!isLoginMode)
	}

	function errorHandler() {
		setError(null)
	}
	return (
		<>
			<ErrorModal error={error} onClear={errorHandler} />
			<Card className='authentication'>
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Login Required</h2>
				<form className='place-form' onSubmit={sendData}>
					{!isLoginMode ? (
						<div className={`form-control `}>
							<label htmlFor=''>Username</label>
							<input
								type='text'
								name='username'
								id='username'
								value={username}
								placeholder='Enter an email please'
								onChange={changeUsernameHandler}
								required
							/>
						</div>
					) : null}
					<div className={`form-control `}>
						<label htmlFor=''>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							z
							value={email}
							placeholder='Enter an email please'
							onChange={changeEmailHandler}
							required
						/>
					</div>
					<div className={`form-control `}>
						<label htmlFor=''>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							value={password}
							placeholder='Enter password'
							onChange={changePasswordHandler}
							required
						/>
					</div>
					<Button type='submit'>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					SWITCH TO {!isLoginMode ? 'LOGIN' : 'SIGNUP'}
				</Button>
			</Card>
		</>
	)
}

export default Authentication
