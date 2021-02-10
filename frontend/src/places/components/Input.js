import React, { useState } from 'react'
import './Input.css'

function Input(props) {

    const [enteredValue, setEnteredValue] = useState('')
    const [isValidated, setIsValidated] = useState(false)

    function changeHandler(event){
        setEnteredValue(
            event.target.value
        )
    }

    console.log(enteredValue)
    
    const element = props.element === 'input' ? (<input id={props.id} placeholder={props.placeholder} value={enteredValue} onChange={changeHandler}/>): ( 
        <textarea id={props.id} rows={3} value={enteredValue} onChange={changeHandler} />
    )

    return (
        <div className={`form-control ${!isValidated ? 'form-control--invalid' : ''}`}>
            <label htmlFor="{props.id}">{props.label}</label>
            {element}
            {!isValidated ? (<p>{props.errorText}</p>) : null}
        </div>
    )
}

export default Input
