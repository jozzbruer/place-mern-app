import React, {useState} from 'react'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIelements/Card'
import './Authentication.css'

function Authentication() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isLoginMode, setIsLoginMode] = useState(true)
    const data ={
        email: email, 
        password: password
    }
    const dataSave ={
        username: username,
        email: email, 
        password: password
    }
    function changeEmailHandler(event){
        setEmail(event.target.value)
    }
    function changeUsernameHandler(event){
        setUsername(event.target.value)
    }
    function changePasswordHandler(event){
        setPassword(event.target.value)
    }
    
    function sendData(e){
        e.preventDefault()
        if(isLoginMode)
            console.log(data)
        else
            console.log(dataSave)
    }
    function switchModeHandler(){
        setIsLoginMode(!isLoginMode)
    }
    return (
        <>
           <Card className='authentication'>
               <h2>Login Required</h2>
            <form className="place-form" onSubmit={sendData}>
                {!isLoginMode ? (
                     <div className={`form-control `} >
                     <label  htmlFor=''>Username</label>
                     <input type="text" name="username" id="username" value={username} placeholder='Enter an email please' onChange={changeUsernameHandler} required/>
                 </div>
                ): null}
                    <div className={`form-control `} >
                        <label  htmlFor=''>Email</label>
                        <input type="email" name="email" id="email" value={email} placeholder='Enter an email please' onChange={changeEmailHandler} required/>
                    </div>
                    <div className={`form-control `} >
                        <label  htmlFor=''>Password</label>
                        <input type="password" name="password" id="password" value={password} placeholder='Enter password' onChange={changePasswordHandler} required/>
                    </div>
                    <Button type='submit'>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
                </form>
                <Button inverse onClick={switchModeHandler}>SWITCH TO {!isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
           </Card>
        </>
    )
}

export default Authentication
