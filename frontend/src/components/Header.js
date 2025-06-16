import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const getShortName = () => {
        if (!user || !user.name) return '';
        const parts = user.name.trim().split(' ');
        const first = parts[0];
        const lastInitial = parts[1] ? parts[1][0].toUpperCase() + '.' : '';
        return `${first} ${lastInitial}`;
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">🛍 BasicShop</Link>
            </div>

            <form className="search-form">
                <input type="text" placeholder="Search products..." />
                <button type="submit">Search</button>
            </form>

            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>

                {user ? (
                    <div className="user-menu">
                        <span className="user-name">Hi, {getShortName()}</span>
                        <div className="user-dropdown">
                            <Link to="/account">Account</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}

                <Link to="/cart">🛒</Link>
            </nav>
        </header>
    );
};

export default Header;
