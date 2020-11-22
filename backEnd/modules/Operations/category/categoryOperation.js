let Promise = require('promise');

let CategorySchema = require('../../modal/category/categoryModal');

function createCategories(categories, parentId = null){

    return  new Promise((resolve, reject) => {
        const categoryList = [];
        let category;
        if( parentId == null){
            category = categories.filter(cat => cat.parentId === undefined);
        } else {
            category = categories.filter(cat => cat.parentId == parentId);
        }

        for(let cate of category){
            categoryList.push({
                _id: cate._id,
                name: cate.name,
                slug: cate.slug,
                children: createCategories(categories, cate._id)
            })
        }
        resolve(categoryList);
    })

}

let saveCategoryOperation = (category) => {
    return new Promise((resolve, reject) => {
        const categories = new CategorySchema(category);
        categories.save().then((result) => {
                if( result ){
                    resolve(result);
                } else {
                    reject('Error in saving the category');
                }
            }).catch((err) => {
                reject(err);
        });
    });
};

let fetchAllCategoryListOperation = () => {
    return new Promise((resolve, reject) => {
        CategorySchema.find().then((categoryList) => {
            if( categoryList ){
                createCategories(categoryList).then((categoryLists) => {
                    resolve(categoryLists);
                })
            } else {
                reject('Error in fetching the categories');
            }
        }).catch((err) => {
            reject(err);
        });
    });
};


module.exports = {
    saveCategoryOperation : saveCategoryOperation,
    fetchAllCategoryListOperation : fetchAllCategoryListOperation
}
