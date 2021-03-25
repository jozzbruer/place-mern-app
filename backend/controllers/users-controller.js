const { v4 : uuidv4 } = require('uuid');
const HttpError = require('../models/http-error')

const USERS = [
    {id: 'u1', name: 'Joz-Bruer Quince', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80', places: 12},
    {id: 'u2', name: 'Joz Quince', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80', places: 1},
    {id: 'u3', name: 'Alber Quince', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80', places: 22},
    {id: 'u4', name: 'Ronaldo Quince', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80', places: 2}
]

exports.getAllUsers = (request, response, next) => {
    response.status(200)
    response.json({users: USERS})
}

exports.signUp = (request, response, next) => {
    const { name } = request.body
    const createUser = {
        id: uuidv4(),
        name
    }
    USERS.push(createUser)
    response.status(201)
    response.json({users: createUser})
}

exports.login = (request, response, next) => {}