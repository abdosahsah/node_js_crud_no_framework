const { findAll, findById, add, update, deleteById } = require("../models/productsModel");
const { getDataFromBody } = require("../utils");


// Get all product
const getProducts = async (req, res) => {

    // Fetch data from json file
    const products = await findAll();

    // Write http header and send data in json format
    res.writeHead(200, { "Content-Type": "Application/json" });
    res.end(JSON.stringify({ message: products }));
}

// Get single product by id
const getProductById = async (req, res, id) => {

    try {
        // Fetch data from json file
        const product = await findById(id);

        // Write http header sen data in json format
        res.writeHead(200, { "Content-Type": "Application/json" });
        res.end(JSON.stringify({ message: product }));
        
    } catch (error) {
        // Show error message with status code "404"
        res.writeHead(404, { "Content-Type": "Application/json" });
        res.end(JSON.stringify({ message: error }));
    }
}

// Add new product
const addProduct = async (req, res) => {

    try {
        
        // Get data sent from body with chunk method
        let body = await getDataFromBody(req);

        // Parse data
        let bodyParsed = JSON.parse(body);

        // Check if user enter a valid data
        if (bodyParsed.hasOwnProperty("name") 
            && bodyParsed.hasOwnProperty("description") 
            && bodyParsed.hasOwnProperty("price")) 
        {
            // Add data to json file and get new product added
            let newProduct = await add(bodyParsed);

            // Show success message with new product added
            res.writeHead(200, { "Content-Type": "Application/json" });
            res.end(JSON.stringify({ message: newProduct, status: "success" }));   
        }
        else {
            // Show error message
            res.writeHead(400, { "Content-Type": "Application/json" });
            res.end(JSON.stringify({ message: "Please enter a valid information" }));
        }


        
    } catch (error) {
        // Show error message
        res.writeHead(404, { "Content-Type": "Application/json" });
        res.end(JSON.stringify({ message: error }));
    }
}

// Update product
const updateProduct = async (req, res, id) => {

    try {
        
        let product = await findById(id);

        if(!product) 
        {
            res.writeHead(404, { "Content-Type": "Application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));

        }
        else {
            // Get data sent from body with chunk method
            let body = await getDataFromBody(req);

            // Parse data
            let { name, description, price } = JSON.parse(body);

            let UpdatedProduct = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price,
            }

            let productUpdated = await update(UpdatedProduct, id);

            // Show success message
            res.writeHead(200, { "Content-Type": "Application/json" });
            res.end(JSON.stringify({ message: productUpdated, status: "success" }));
        }

        
    } catch (error) {
        // Show error message
        res.writeHead(404, { "Content-Type": "Application/json" });
        res.end(JSON.stringify({ message: error }));
    }
}

// Delete product
const deleteProduct = async(req, res, id) => {

    try {
        // Search product by id
        let product = findById(id);

        if (!product) {
            // Show error message
            res.writeHead(400, { "Content-Type": "Application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
        }
        else {

            let deletedProduct = await deleteById(id);
            // Show error message
            res.writeHead(200, { "Content-Type": "Application/json" });
            res.end(JSON.stringify({ message: deletedProduct, status: "success" }));
        }

    } catch (error) {
        // Show error message
        res.writeHead(404, { "Content-Type": "Application/json" });
        res.end(JSON.stringify({ message: error }));
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
}