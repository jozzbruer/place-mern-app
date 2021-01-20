import React from 'react'
import UserItem from './UserItem'
import './UserList.css'

function UserList(props) {
    return (
        <>
        {props.items.length === 0 ? (
            <div className='center'>
                No user found
            </div>
        ) : (
            <ul className='users-list'>
                {props.items.map(user =>{
                    return <UserItem
                        key={user.id}
                        id={user.id}
                        image={user.image}
                        name={user.name}
                        placeCount={user.places}
                    />
                })}
            </ul>
        )}
        </>
    )
}

export default UserList
