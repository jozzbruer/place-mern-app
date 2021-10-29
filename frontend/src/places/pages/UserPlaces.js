import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner';
import axios from 'axios';

function UserPlaces() {
	const [places, setPlaces] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const userId = useParams().userId;
	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${process.env.REACT_APP_SERVER_URI}/places/users/${userId}`)
			.then((response) => {
				setPlaces(response.data.places);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [userId]);
	return (
		<>
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && <PlaceList items={places} />}
		</>
	);
}

export default UserPlaces;
