// backend/controllers/productController.js
const { Product } = require("../models");

exports.createProduct = async (req, res) => {
    try {
        const {
            sku, title, description, price, quantity,
            category, madeDate, expirationDate,
            size, material, warranty, powerType
        } = req.body;

        const image = req.savedImageName || null;

        const product = await Product.create({
            sku,
            title,
            description,
            price,
            quantity,
            category,
            madeDate,
            expirationDate,
            size,
            material,
            warranty,
            powerType,
            image
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ order: [["createdAt", "DESC"]] });
        res.status(200).json(products);
    } catch (err) {
        console.error("Failed to fetch products:", err);
        res.status(500).json({ message: "Failed to fetch products", error: err });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error("Failed to fetch product:", err);
        res.status(500).json({ message: "Failed to fetch product", error: err });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            price,
            quantity,
            category,
            madeDate,
            expirationDate,
            size,
            material,
            warranty,
            powerType
        } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (req.file) {
            product.image = req.file.filename;
        }

        await product.update({
            title,
            description,
            price,
            quantity,
            category,
            madeDate: madeDate || null,
            expirationDate: expirationDate || null,
            size: size || null,
            material: material || null,
            warranty: warranty || null,
            powerType: powerType || null
        });

        res.status(200).json(product);
    } catch (err) {
        console.error("Failed to update product:", err);
        res.status(500).json({ message: "Failed to update product", error: err });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.destroy();
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        console.error("Failed to delete product:", err);
        res.status(500).json({ message: "Failed to delete product", error: err });
    }
};
