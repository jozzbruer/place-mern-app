import React, { useState, useContext } from 'react'
import Card from '../../shared/components/UIelements/Card'
import Button from '../../shared/components/FormElements/Button'
import { useHistory } from 'react-router-dom'
import './PlaceItem.css'
import Modal from '../../shared/components/UIelements/Modal'
import Map from '../../shared/components/UIelements/Map'
import axios from 'axios'
import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'

function PlaceItem(props) {
	const auth = useContext(AuthContext)

	const [showMap, setShowMap] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showConfirmation, setShowConfirmation] = useState(false)

	function showConfirmHandler() {
		setShowConfirmation(true)
	}
	const history = useHistory()

	function confirmHandler() {
		setShowConfirmation(false)
		setIsLoading(true)
		axios
			.delete(`http://localhost:5000/api/places/${props.id}`)
			.then((response) => {
				setIsLoading(false)
				history.push('/')
			})
			.catch((error) => {
				console.log(error)
				setIsLoading(false)
			})
	}
	function cancelConfirmationHandler() {
		setShowConfirmation(false)
	}

	function openMapHandler() {
		setShowMap(true)
	}
	function closeMapHandler() {
		setShowMap(false)
	}

	return (
		<>
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.adress}
				contentClass='place-item__modal-content'
				footerClass='place-item__modal-actions'
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>
				<div className='map-container'>
					<Map center={props.coordinates} zoom={16} />
				</div>
			</Modal>
			<Modal
				header='Are you sure'
				footerClass='place-item__modal-actions'
				show={showConfirmation}
				onCancel={cancelConfirmationHandler}
				footer={
					<>
						<Button inverse onClick={cancelConfirmationHandler}>
							CANCEL
						</Button>
						<Button danger onClick={confirmHandler}>
							DELETE
						</Button>
					</>
				}>
				<p>Do you want to delete it?</p>
			</Modal>
			<li className='place-item'>
				{isLoading && <LoadingSpinner asOverlay />}
				<Card className='place-item__content'>
					<div className='place-item__image'>
						<img
							src={`http://localhost:5000/${props.image}`}
							alt={props.title}
						/>
					</div>
					<div className='place-item__info'>
						<h2>{props.title}</h2>
						<h3>{props.adress}</h3>
						<p>{props.description}</p>
					</div>
					<div className='place-item__actions'>
						<Button inverse onClick={openMapHandler}>
							VIEW ON A MAP
						</Button>
						{auth.isLoggedIn ? (
							<Button to={`/places/${props.id}`}>EDIT</Button>
						) : null}
						{auth.isLoggedIn && (
							<Button danger onClick={showConfirmHandler}>
								DELETE
							</Button>
						)}
					</div>
				</Card>
			</li>
		</>
	)
}

export default PlaceItem
