import React, { useState, useContext, useRef, useEffect } from 'react'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIelements/Card'
import { AuthContext } from '../../shared/context/auth-context'
import ErrorModal from '../../shared/components/UIelements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'

import './Authentication.css'
import axios from 'axios'

function Authentication() {
	const auth = useContext(AuthContext)

	const filePickerReference = useRef()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [isLoginMode, setIsLoginMode] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	// const [image, setImage] = useState()s
	const [error, setError] = useState()

	// Image upload variables

	const [file, setFile] = useState()
	const [preview, setPreview] = useState()

	function pickImageHandler() {
		filePickerReference.current.click()
	}

	useEffect(() => {
		if (!file) {
			return
		}
		const fileReader = new FileReader()
		fileReader.onload = function () {
			setPreview(fileReader.result)
		}
		fileReader.readAsDataURL(file)
	}, [file])

	function pickedHandler(event) {
		if (event.target.files && event.target.files.length === 1) {
			const pickedFile = event.target.files[0]
			setFile(pickedFile)

			return
		}
		// setFile(event.target.files[0])
	}
	const data = {
		email,
		password,
	}

	const headers = {
		'Content-Type': 'application/json',
	}

	const saveData = new FormData()

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
					auth.login(response.data.userId, response.data.token)
				})
				.catch((err) => {
					console.log(err.message)
					setIsLoading(false)
					setError('Email or password wrong')
				})
		} else {
			saveData.append('email', email)
			saveData.append('name', username)
			saveData.append('password', password)
			saveData.append('image', file)
			setIsLoading(true)
			axios
				.post('http://localhost:5000/api/users/signup', saveData)
				.then((response) => {
					//console.log('ID:', response.data.users._id)
					if (response.statusText !== 'OK') {
						throw new Error(response.message)
					}

					setIsLoading(false)
					auth.login(response.data.userId, response.data.token)
				})
				.catch((err) => {
					console.log(err.message)
					setIsLoading(false)
					setError('Something went wrong, please check it out')
				})
		}
		// console.log(saveData)
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
								placeholder='Enter your username please'
								onChange={changeUsernameHandler}
								required
							/>
						</div>
					) : null}
					{!isLoginMode && (
						<ImageUpload
							reference={filePickerReference}
							preview={preview}
							pickImageHandler={pickImageHandler}
							pickedHandler={pickedHandler}
							id='image'
							center
						/>
					)}
					<div className={`form-control `}>
						<label htmlFor=''>Email</label>
						<input
							type='email'
							name='email'
							id='email'
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
