import React from "react";
import "./Header.css";

const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const getFirstLastInitial = (name) => {
        const [first, last] = name.split(" ");
        return `Hi, ${first} ${last ? last[0] : ""}`;
    };

    return (
        <header className="inventory-header">
            <div className="header-left">
                <h2>Inventory</h2>
            </div>
            {user && (
                <div className="header-right">
                    <div className="user-dropdown">
                        <span className="user-name">{getFirstLastInitial(user.name)}</span>
                        <div className="dropdown-content">
                            <div className="dropdown-item">Account</div>
                            <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
