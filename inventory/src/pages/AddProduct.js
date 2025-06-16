import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddProduct.css";

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        tags: "",
        expirationDate: "",
        stock: "",
        image: null,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (!token || !["admin", "manager"].includes(user?.role)) {
            return setError("Unauthorized.");
        }

        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.post("http://localhost:5000/api/products", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/products");
        } catch (err) {
            setError("Failed to add product. " + err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            {error && <p className="error">{error}</p>}
            <form className="product-form" onSubmit={handleSubmit}>
                <input name="title" placeholder="Title" required onChange={handleChange} />
                <textarea name="description" placeholder="Description" onChange={handleChange} />
                <input name="price" type="number" placeholder="Price" required onChange={handleChange} />
                <input name="category" placeholder="Category" onChange={handleChange} />
                <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />
                <input name="expirationDate" type="date" onChange={handleChange} />
                <input name="stock" type="number" placeholder="Stock Quantity" required onChange={handleChange} />
                <input name="image" type="file" accept="image/*" required onChange={handleChange} />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
