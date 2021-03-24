const { uuid } = require('uuidv4');
const HttpError = require('../models/http-error')
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
    }
]

exports.getPlaceById = (request, response, next) =>{
    const placeId = request.params.pid;
    const places = DUMMY_PLACES.find(place => 
        place.id === placeId
    );
    if(!places){
        const error = new HttpError('Could not find a place for this place id', 404)
        return next(error)
    }
        

    response.json({places})
}

exports.getPlaceByUserId = (request, response, next) => {
    const userId = request.params.uid
    const user = DUMMY_PLACES.find(user => 
         user.creator === userId
       )

    if (!user){
        const error = new HttpError('Could not find a place for this user id', 404)
        return next(error)
    }
        

    response.json({user}) // => {user: user} if both have same name, you can just put one
}

exports.createPlace = (request, response, next) =>{
    const { title, description, coordinates, adress, creator} = request.body // const title = request.body.title
    const createPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        adress,
        creator
    }

    DUMMY_PLACES.push(createPlace)
    response.status(201).json({places: createPlace})
}