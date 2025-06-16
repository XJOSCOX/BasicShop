import React from 'react';

const Account = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <h2>You must be logged in to view this page.</h2>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h2>Account Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || '—'}</p>
            <p><strong>Address:</strong> {user.address || '—'}</p>
            <p><strong>City:</strong> {user.city || '—'}</p>
            <p><strong>State:</strong> {user.state || '—'}</p>
            <p><strong>Country:</strong> {user.country || '—'}</p>
            <p><strong>Postal Code:</strong> {user.postalCode || '—'}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
};

export default Account;
