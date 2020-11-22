const express = require('express');
const slugify = require('slugify');
const router = express.Router();
const multer = require('multer');
const shortId = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), '../../uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortId.generate() + '-' + file.originalname)
    }
});
const upload = multer({ storage })

// let CategoryController = require('../../controller/category/categoryController');
let CommonMiddleware = require('../../../config/commonMiddleware');

router.post('/create',CommonMiddleware.requireSignIn, CommonMiddleware.adminMiddleware, upload.array('productPicture'), (req, res) => {
    // const categoryObj = {
    //     name: req.body.name,
    //     slug: slugify(req.body.name)
    // }

    // if(req.body.parentId){
    //     categoryObj.parentId = req.body.parentId;
    // }

    // CategoryController.saveNewCategory(categoryObj).then((savedCategory) => {
    //     if ( savedCategory ){
            res.status(201).json({
             file: req.files,
                body: req.body
            })
        // } else {
        //     res.status(400).json({
        //         MSG:'Error in saving the category ',
        //     })
        // }
    // });
});

// router.get('/getAllCategories', (req, res) => {
//
//     CategoryController.getAllCategories().then((categoryList) => {
//         if ( categoryList ){
//             res.status(201).json({
//                 MSG:'Category List',
//                 category: categoryList
//             })
//         } else {
//             res.status(400).json({
//                 MSG:'Error in fetching the category list',
//             })
//         }
//     });
// });

module.exports = router;
