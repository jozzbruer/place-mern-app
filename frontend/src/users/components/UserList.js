import React from 'react';
import Card from '../../shared/components/UIelements/Card';
import UserItem from './UserItem';
import './UserList.css';

function UserList(props) {
	return (
		<>
			{props.items.length === 0 ? (
				<div className='users-list center'>
					<Card>No user found</Card>
				</div>
			) : (
				<ul className='users-list'>
					{props.items.map((user) => {
						return (
							<UserItem
								key={user._id}
								id={user._id}
								image={user.image}
								name={user.name}
								placeCount={user.places.length}
							/>
						);
					})}
				</ul>
			)}
		</>
	);
}

export default UserList;
