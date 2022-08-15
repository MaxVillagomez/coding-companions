import React from "react";

const Register =  () => {
    return(
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
            <button type='submit'>Register</button>
        </form>

    </div>
    )
}

export default Register;