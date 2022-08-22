import { React } from "react";
import { Link } from "react-router-dom";

const AllUsers = ({users, setUsers}) => {
    return(
        <div className="all-users-container">
            {users && users.length ? (
                users.map((user) => {
                    return (
                        <div className="all-users" key={user.id}>
                            <h3>Email: {user.email}</h3>
                            <h3>Street Address: {user.street_address}</h3>
                            <h3>City: {user.city}</h3>
                            <h3>State: {user.state}</h3>
                            <h3>Zip: {user.zip}</h3>
                            {user.is_admin ? (<h3>Status: Admin</h3>) : (<h3>Status: Customer</h3>)}
                        </div>
                    )
                })
            ):(
                <h1>You must be an admin to view all the users.</h1>
            )}
        </div>
    )
}

export default AllUsers;
