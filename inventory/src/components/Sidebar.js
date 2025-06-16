import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2>Menu</h2>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" end>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products">Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders">Orders</NavLink>
                    </li>
                    <li>
                        <NavLink to="/categories">Categories</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">Users</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
