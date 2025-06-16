import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Failed to fetch products:", error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="products-container">
            <h2>Product Management</h2>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id}>
                            <td>
                                <img
                                    src={`http://localhost:5000/uploads/${prod.image}`}
                                    alt={prod.title}
                                    width="50"
                                />
                            </td>
                            <td>{prod.title}</td>
                            <td>{prod.category}</td>
                            <td>{prod.quantity}</td>
                            <td>${prod.price.toFixed(2)}</td>
                            <td>
                                <button>Edit</button>
                                <button className="delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
