import React from "react";
import {Link} from "react-router-dom";
import {login} from "../axios-services"

const Login = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        token,
        setToken,
        setIsLoggedIn
    } = props;

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("This is email and password: ", email, password);
        try {
            const response = await fetch('/api/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        email,
                        password,
                })
            });
            console.log("this is the response: ", response);
                const data = await response.json();
                console.log("this is the response data: ", data);
        } catch (error) {
          next(error);  
        }
        
        const user = {
            email,
            password
        };
        const {data} = await login(user);
        console.log("this is the data: ", data);
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setToken(localStorage.token);
        setEmail('');
        setPassword(''); 
    }

    return (
            <div className="form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label className='label'>
                        Email
                        <input
                            type='text' value={email} onChange={(event) => setEmail(event.target.value)} 
                        ></input>
                    </label>
                    <label className="label">
                        Password
                        <input
                            type='text' value={password} onChange={(event) => setPassword(event.target.value)} 
                        ></input>
                    </label>
                    <button type='submit'>Login</button>
                </form>
                
                <div>
                    <Link className="register-link" to="/register">New User? Register here!</Link>
                </div>

            </div>
    )
}

export default Login;