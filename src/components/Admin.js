import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    return(
        <div className="admin-button-container">
            <Link to="/admin/users">
            <button className="admin-button">View All Users</button>
            </Link>
            <Link to="/admin/createproduct">
            <button className="admin-button">Create New Product</button>
            </Link>
            <Link to="/admin/products">
            <button className="admin-button">Edit Product</button>
            </Link>
        </div>
    )
}

export default Admin;