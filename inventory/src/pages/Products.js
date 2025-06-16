import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

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
            <div className="products-header">
                <h2>Product Management</h2>
                <button className="create-button" onClick={() => navigate("/products/create")}>
                    + Add New Product
                </button>
            </div>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Made</th>
                        <th>Expires</th>
                        <th>Size</th>
                        <th>Material</th>
                        <th>Warranty</th>
                        <th>Power Type</th>
                        <th>Added On</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((prod) => (
                            <tr key={prod.id}>
                                <td>
                                    {prod.image ? (
                                        <img
                                            src={`http://localhost:5000/uploads/${prod.image}`}
                                            alt={prod.title}
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>{prod.title}</td>
                                <td>{prod.category}</td>
                                <td>{prod.quantity}</td>
                                <td>${Number(prod.price).toFixed(2)}</td>
                                <td>{prod.madeDate ? new Date(prod.madeDate).toLocaleDateString() : "-"}</td>
                                <td>{prod.expirationDate ? new Date(prod.expirationDate).toLocaleDateString() : "-"}</td>
                                <td>{prod.size || "-"}</td>
                                <td>{prod.material || "-"}</td>
                                <td>{prod.warranty || "-"}</td>
                                <td>{prod.powerType || "-"}</td>
                                <td>{new Date(prod.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="edit">Edit</button>
                                    <button className="delete">Delete</button>
                                </td>
                            </tr>
                        ) 
                    )
                    ) : (
                        <tr>
                            <td colSpan="13">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
