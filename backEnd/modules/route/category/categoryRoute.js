const express = require('express');
const slugify = require('slugify');
const router = express.Router();

let CategoryController = require('../../controller/category/categoryController');
let CommonMiddleware = require('../../../config/commonMiddleware');

router.post('/create',CommonMiddleware.requireSignIn, CommonMiddleware.adminMiddleware, (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    CategoryController.saveNewCategory(categoryObj).then((savedCategory) => {
        if ( savedCategory ){
            res.status(201).json({
                MSG:'Category saved',
                category: savedCategory
            })
        } else {
            res.status(400).json({
                MSG:'Error in saving the category ',
            })
        }
    });
});

router.get('/getAllCategories', (req, res) => {

    CategoryController.getAllCategories().then((categoryList) => {
        if ( categoryList ){
            res.status(201).json({
                MSG:'Category List',
                category: categoryList
            })
        } else {
            res.status(400).json({
                MSG:'Error in fetching the category list',
            })
        }
    });
});

module.exports = router;
