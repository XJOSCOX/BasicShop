import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">🛍 BasicShop</div>

            <form className="search-form">
                <input type="text" placeholder="Search products..." />
                <button type="submit">Search</button>
            </form>

            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    );
};

export default Header;
