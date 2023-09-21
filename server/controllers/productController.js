const Product = require('../models/product');

exports.fetchAll = async (req, res, next) => {
    const products = await Product.find().populate('categories');
    res.status(200).json(products);
};

exports.fetchById = async (req, res, next) => {
    const prod = await Product.findById(req.params.id);
    res.json(prod);
}

exports.save = async (req, res, next) => {
    const savedProd = await new Product(req.body).save();
    res.status(201).json(savedProd);
}

exports.update = async (req, res, next) => {
    const updated = await Product.updateOne({_id: req.params.id}, req.body);
    res.json(updated);
}

exports.deleteById = async (req, res, next) => {
    const result = await Product.findByIdAndDelete(req.params.id);
    res.json(result);
}

