import React from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList'

function UserPlaces() {
    const DUMMY_PLACES =[
        {
            id: 'p1',
            title: 'Empire State',
            description: 'The famous place',
            imageUrl: 'https://images.unsplash.com/photo-1583842761844-be1a7bc7fc23?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            adress: '20 W 34th St, New york, NY 10001',
            locations:{
                lat: 40.7484405,
                lng: -73.9878583
            },
            creator: 'u2'
        },
        {
            id: 'p2',
            title: 'Empire State',
            description: 'The famous place',
            imageUrl: 'https://images.unsplash.com/photo-1583842761844-be1a7bc7fc23?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            adress: '20 W 34th St, New york, NY 10001',
            locations:{
                lat: 40.7484405,
                lng: -73.9878583
            }, 
            creator: 'u1'
        }
    ]
    const userId = useParams().userId
    const loadedPlaces = DUMMY_PLACES.filter(place => { return place.creator === userId})
    return (
        <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces
