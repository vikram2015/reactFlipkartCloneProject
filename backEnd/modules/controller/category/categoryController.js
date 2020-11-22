const Promise = require('promise');

let CategoryOperation = require('../../Operations/category/categoryOperation');


let saveNewCategory = (category) => {
    return new Promise((resolve, reject) => {
        CategoryOperation.saveCategoryOperation(category).then((categoryResult) => {
            if( categoryResult ){
                resolve(categoryResult);
            } else {
                reject(' Error in saving the category');
            }
        }).catch((err) => {
            reject(err);
        });
    });
};

let getAllCategories = () => {
    return new Promise((resolve, reject) => {
        CategoryOperation.fetchAllCategoryListOperation().then((categoryList) => {
            if( categoryList ){
                resolve(categoryList);
            } else {
                reject(' Error in fetching the categories');
            }
        }).catch((err) => {
            reject(err);
        });
    });
};


module.exports = {
    saveNewCategory : saveNewCategory,
    getAllCategories: getAllCategories
}