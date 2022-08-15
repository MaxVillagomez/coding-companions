import React from "react";
import {Link} from "react-router-dom";

const Login = () => {
    return (
            <div className="form-container">
                <form className="login-form">
                    <label className='label'>
                        Username
                        <input
                            type='text' 
                        ></input>
                    </label>
                    <label className="label">
                        Password
                        <input
                            type='text' 
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