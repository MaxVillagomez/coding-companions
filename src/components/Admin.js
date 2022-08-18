import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    return(
        <div>
            <Link to="/admin/users">
            <button>View All Users</button>
            </Link>
            <Link to="/admin/createproduct">
            <button>Create New Product</button>
            </Link>
            <Link to="/admin/products">
            <button >Edit Product</button>
            </Link>
        </div>
    )
}

export default Admin;