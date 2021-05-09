import React from 'react'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIelements/Card'
import PlaceItem from './PlaceItem'

import './PlaceList.css'

function PlaceList(props) {
	return (
		<>
			{props.items.length === 0 ? (
				<div className='place-list center'>
					<Card>
						No places found. Maybe create one?
						<Button to='places/new'>Share Place</Button>
					</Card>
				</div>
			) : (
				<ul className='place-list'>
					{props.items.map((place) => {
						return (
							<PlaceItem
								key={place._id}
								id={place._id}
								image={place.image}
								title={place.title}
								description={place.description}
								adress={place.adress}
								creatorId={place.creator}
								coordinates={place.location}
							/>
						)
					})}
				</ul>
			)}
		</>
	)
}

export default PlaceList
