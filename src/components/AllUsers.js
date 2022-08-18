import { React } from "react";
import { Link } from "react-router-dom";

const AllUsers = ({users, setUsers}) => {
    return(
        <div className="all-users-container">
            {users && users.length ? (
                users.map((user) => {
                    return (
                        <div className="all-users" key={user.id}>
                            <h1>{user.email}</h1>
                            <h3>{user.street_address}</h3>
                            <h3>{user.city}</h3>
                            <h3>{user.state}</h3>
                            <h3>{user.zip}</h3>
                            {user.is_admin ? (<h3>Admin</h3>) : (<h3>Customer</h3>)}
                        </div>
                    )
                })
            ):(
                <h1>No users to display!</h1>
            )}
        </div>
    )
}

export default AllUsers;
