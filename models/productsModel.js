const productsData = require("../data/products.json");
const { writeToJsonFile } = require("../utils");


// Find all products
const findAll = () => {
    return new Promise((resolve, reject) => {
        // Return all products from json file
        resolve(productsData);

        // Error message
        reject("No data");
    })
}

// Find single product by id
const findById = (id) => {
    return new Promise((resolve, reject) => {
        
        // Find product by id in json file
        product = productsData.find(product => product.id == id );
        
        // Check if product exist
        if (product) 
        {
            // Return product finded
            resolve(product);
        }
        else {
            // Error message
            reject("Product not found");
        }
    });
}

// Add new product
const add = (product) => {
    return new Promise((resolve, reject) => {

        let { name, description, price } = product;

        let newId = productsData.length + 1;

        let newProduct = {
            id: newId.toString(),
            name,
            description,
            price,
        };

        productsData.push(newProduct);

        writeToJsonFile("./data/products.json", productsData);

        resolve(newProduct);

        reject("Product not created please try again");


        
    });
}

// Update product
const update = (product, id) => {
    return new Promise((resolve, reject) => {

        let index = productsData.findIndex(p => p.id == id);
        
        productsData[index] = { id, ...product };

        writeToJsonFile("./data/products.json", productsData);

        resolve(productsData[index]);

        reject("Product not updated");
     
    });
}

const deleteById = (id) => {

    return new Promise((resolve, reject) => {

        let products = productsData.filter(p => p.id !== id);

        writeToJsonFile("./data/products.json", products);

        resolve("Product was deleted");

        reject("Product not deleted please try again");

    })
}

module.exports = {
    findAll,
    findById,
    add,
    update,
    deleteById,
}