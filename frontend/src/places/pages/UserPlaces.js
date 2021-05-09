import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'
import axios from 'axios'

function UserPlaces() {
	const [places, setPlaces] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const userId = useParams().userId
	useEffect(() => {
		setIsLoading(true)
		axios
			.get(`http://localhost:5000/api/places/users/${userId}`)
			.then((response) => {
				console.log(response.data.places)
				setPlaces(response.data.places)
				setIsLoading(false)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	// const loadedPlaces = DUMMY_PLACES.filter((place) => {
	// 	return place.creator === userId
	// })
	return (
		<>
			{isLoading && <LoadingSpinner asOverlay />}
			<PlaceList items={places} />
		</>
	)
}

export default UserPlaces
