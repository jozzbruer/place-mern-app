const HttpError = require('../models/http-error')
const USERS = [
    {id: 'u1', name: 'Joz-Bruer Quince', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80', places: 12},
    {id: 'u2', name: 'Joz Quince', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80', places: 1},
    {id: 'u3', name: 'Alber Quince', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80', places: 22},
    {id: 'u4', name: 'Ronaldo Quince', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80', places: 2}
]

exports.oneUser = (request, response, next) => {
    const userId = request.params.uid
    const user = USERS.find(user => 
         user.id === userId
       )

    if (!user){
        const error = new HttpError('Could not find a place for this place id', 404)
        return next(error)
    }
        

    response.json({user}) // => {user: user} if both have same name, you can just put one
}