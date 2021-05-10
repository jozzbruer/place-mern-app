import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import axios from 'axios'
import ErrorModal from '../../shared/components/UIelements/ErrorModal'
function UpdatePlace() {
	const placeId = useParams().placeId

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState()
	const [title, setTitle] = useState()
	const [description, setDescription] = useState()

	const data = {
		title,
		description,
	}

	const headers = {
		'Content-Type': 'application/json',
	}
	const history = useHistory()

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/places/${placeId}`)
			.then((response) => {
				if (response.statusText !== 'OK') {
					throw new Error(response.message)
				}
				setTitle(response.data.place.title)
				setDescription(response.data.place.description)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [placeId])

	function titleHandler(event) {
		setTitle(event.target.value)
	}
	function descriptionHandler(event) {
		setDescription(event.target.value)
	}
	function errorHandler() {
		setError(null)
	}

	function sendData(event) {
		event.preventDefault()
		setIsLoading(true)
		axios
			.patch(`http://localhost:5000/api/places/${placeId}`, data, headers)
			.then((response) => {
				if (response.statusText !== 'Created') {
					throw new Error(response.message)
				}
				setIsLoading(false)
				history.push('/')
			})
			.catch((error) => {
				setIsLoading(false)
				setError('Something went wrong, please check your data')
			})
	}

	return (
		<>
			<ErrorModal error={error} onClear={errorHandler} />
			<form className='place-form' onSubmit={sendData}>
				<div className={`form-control `}>
					<label htmlFor=''>Title</label>
					<input
						type='text'
						name='title'
						id='title'
						value={title}
						placeholder='Enter the title please'
						onChange={titleHandler}
					/>
				</div>
				<div className={`form-control `}>
					<label htmlFor=''>Description</label>
					<textarea
						type='text'
						cols={3}
						name='description'
						id='description'
						value={description}
						placeholder='Enter the description please'
						onChange={descriptionHandler}
					/>
				</div>
				<Button type='submit'>UPDATE PLACE</Button>
			</form>
		</>
	)
}

export default UpdatePlace
