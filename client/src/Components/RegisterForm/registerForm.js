import React, {useState} from "react";

export const RegisterForm = ()=> {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        const user = {login, password};

        fetch('/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(() =>{
        })
    }

    return (
        <div class = "register-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div class ="register-form-login">
                    <input type='text'
                           required value ={login} onChange={(e) => setLogin(e.target.value)}
                    placeholder="Login"></input>
                </div>
                <div class ="register-form-password">
                    <input type='password'
                           required value = {password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"></input>
                </div>
                <span>
                    <button class ="registerButton">Register</button>
                </span>
            </form>
        </div>
    )
}