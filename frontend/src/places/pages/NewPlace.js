import React, {useState} from 'react'
import Button from '../../shared/components/FormElements/Button'
import './NewPlace.css'
// import { VALIDATOR_REQUIRE } from '../../shared/utils/Validator'

function NewPlace(props) {
    const [formData, setFormData] = useState('')
    
    function changeHandler(event){       
        setFormData({...formData,
            [event.target.name]: event.target.value})
       
        //result = validate(enteredValue, props.validators)
    }
    
    function sendData(event){
        event.preventDefault()
        console.log(formData)
        setFormData('')
       
    }

    
    return (
        <form className="place-form" onSubmit={sendData}>
        <div className={`form-control `} >
            <label  htmlFor=''>Title</label>
            <input type="text" name="title" id="title" placeholder='Enter the title please' onChange={changeHandler}/>
        </div>
        <div className={`form-control `} >
            <label  htmlFor=''>Description</label>
            <textarea type="text" cols={3} name="description" id="description" placeholder='Enter the description please' onChange={changeHandler}/>
        </div>
        <div className={`form-control `} >
            <label  htmlFor=''>Address</label>
            <input type="text" name="address" id="address" placeholder='Enter the adrdess please'onChange={changeHandler} />
        </div>
        <Button type='submit'>ADD PLACE</Button>
        </form>
    )
}

export default NewPlace
