const Category = require('../models/category');

exports.fetchAll = async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json(categories);
};

