const Promise = require('promise');

// let CategoryOperation = require('../../Operations/category/categoryOperation');
let ProductOperation = require('../../Operations/product/productOperation')

let saveNewProduct = (product) => {
    return new Promise((resolve, reject) => {
        ProductOperation.saveProductOperation(product).then((ProductResult) => {
            if( ProductResult ){
                resolve(ProductResult);
            } else {
                reject(' Error in saving the category');
            }
        }).catch((err) => {
            reject(err);
        });
    });
};

// let getAllCategories = () => {
//     return new Promise((resolve, reject) => {
//         CategoryOperation.fetchAllCategoryListOperation().then((categoryList) => {
//             if( categoryList ){
//                 resolve(categoryList);
//             } else {
//                 reject(' Error in fetching the categories');
//             }
//         }).catch((err) => {
//             reject(err);
//         });
//     });
// };


module.exports = {
    saveNewProduct : saveNewProduct,
    // getAllCategories: getAllCategories
}