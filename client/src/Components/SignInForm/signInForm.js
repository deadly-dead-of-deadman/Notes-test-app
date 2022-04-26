import React, {useState} from "react";

export const SignInForm = ()=> {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        const user = {login, password};

        fetch('/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(() =>{
            console.log('user signed in')
        })
    }

    return (
        <div class = "sign-in-form">
            <h2>Sign In</h2>
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
                    <button class ="loginButton">Login</button>
                </span>
            </form>
        </div>
    )
}