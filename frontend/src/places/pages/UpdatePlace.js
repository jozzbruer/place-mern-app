import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'

function UpdatePlace() {
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
    const placeId = useParams().placeId
    const identifiedPlace = DUMMY_PLACES.find(place =>{return place.id === placeId})
    let t 
    let d 

    if(!identifiedPlace){
        t = ''
        d =''
    }else{
        t = identifiedPlace.title
        d = identifiedPlace.description
    }
    const [title , setTitle] = useState(t)
    const [desc , setDesc] = useState(d)
    
    const [formData, setFormData] = useState({})
    
    function changeHandler(event){       
       setTitle(event.target.value)
    }
    function changeHandler1(event){       
        setDesc(event.target.value)
     }
    

    function sendData(event){
        event.preventDefault()
        setFormData({title: title,description: desc}) 
    }

    
    return (
       <>
            {title === '' || desc === '' ? (
                <div className="center">
                    <h2>Could not find the place</h2>
                </div>
            ) : (
                <form className="place-form" onSubmit={sendData}>
            <div className={`form-control `} >
                <label  htmlFor=''>Title</label>
                <input type="text" name="title" id="title" value={title} placeholder='Enter the title please' onChange={changeHandler} />
            </div>
            <div className={`form-control `} >
                <label  htmlFor=''>Description</label>
                <textarea type="text" cols={3} name="description" id="description" value={desc} placeholder='Enter the description please' onChange={changeHandler1}/>
            </div>
            <Button type='submit'>UPDATE PLACE</Button>
            </form>
        )}
       </>
    )
}

export default UpdatePlace
