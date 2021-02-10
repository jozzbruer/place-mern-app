import React from 'react'
import Input from '../components/Input'
import './NewPlace.css'

function NewPlace(props) {
    return (
        <form className="place-form">
            <Input element='input' type='text' label='Title' validators={[ ]}  onChange={props.onChange} errorText='Please add a valid title'/>
        </form>
    )
}

export default NewPlace
