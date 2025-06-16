import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductCreate.css";

function ProductCreate() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        image: null,
        madeDate: "",
        expirationDate: "",
        size: "",
        material: "",
        warranty: "",
        powerType: ""
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        for (let key in form) {
            if (form[key]) data.append(key, form[key]);
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/products", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Product added successfully!");
            navigate("/products");
        } catch (err) {
            console.error(err);
            alert("Failed to add product.");
        }
    };

    const renderExtraFields = () => {
        switch (form.category) {
            case "Food":
                return (
                    <>
                        <label>Made Date</label>
                        <input type="date" name="madeDate" value={form.madeDate} onChange={handleChange} />

                        <label>Expiration Date</label>
                        <input type="date" name="expirationDate" value={form.expirationDate} onChange={handleChange} />
                    </>
                );
            case "Clothing":
                return (
                    <>
                        <label>Size</label>
                        <input type="text" name="size" placeholder="e.g. S, M, L, XL" value={form.size} onChange={handleChange} />

                        <label>Material</label>
                        <input type="text" name="material" placeholder="e.g. Cotton" value={form.material} onChange={handleChange} />
                    </>
                );
            case "Electronics":
                return (
                    <>
                        <label>Warranty</label>
                        <input type="text" name="warranty" placeholder="e.g. 1 year" value={form.warranty} onChange={handleChange} />

                        <label>Power Type</label>
                        <input type="text" name="powerType" placeholder="e.g. USB, Battery" value={form.powerType} onChange={handleChange} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="product-create-container">
            <h2>Add New Product</h2>
            <form className="product-create-form" onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required />

                <label>Description</label>
                <textarea name="description" rows="3" value={form.description} onChange={handleChange} required />

                <label>Price</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} required />

                <label>Quantity</label>
                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required />

                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange} required>
                    <option value="">Select a category</option>
                    <option value="Food">Food</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                </select>

                {renderExtraFields()}

                <label>Product Image</label>
                <input type="file" name="image" accept="image/*" onChange={handleChange} required />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default ProductCreate;
