const http = require('http');
const { getProducts, 
        getProductById, 
        addProduct, 
        updateProduct, 
        deleteProduct } = require("./controllers/productsController");

// Set Port and Hostname
const port = 8000;
const hostname = "127.0.0.1";

// Create server
const server = http.createServer((req, res) => {

    if (req.url === "/api/products" && req.method === "GET") 
    {
        getProducts(req, res);
    }

    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") 
    {
        let id = req.url.split("/")[3];

        getProductById(req, res, id);
    }

    else if (req.url === "/api/product/add" && req.method === "POST") 
    {
        addProduct(req, res);
    }

    else if(req.url.match(/\/api\/product\/update\/([0-9]+)/) && req.method === "PUT") 
    {
        let id = req.url.split("/")[4];

        updateProduct(req, res, id);
    }

    else if(req.url.match(/\/api\/product\/delete\/([0-9]+)/) && req.method === "DELETE") 
    {
        let id = req.url.split("/")[4];

        deleteProduct(req, res, id);
    }

    else {
        res.writeHead(404, { "Content-Type": "Application/json" });
        res.end(JSON.stringify({ message: "Page Not Found" }));
    }
})

// Listen to server
server.listen(
    port,
    hostname,
    () => {
        console.log(`Server running at ${hostname}:${port}`);
    }
);