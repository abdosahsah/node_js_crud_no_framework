const fs = require("fs");

// Write new data to json file
const writeToJsonFile = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data), 'utf8', (error) => {
        if(error) {
            console.log(error);
        }
    });
}

// Get data from body with chunk method
const getDataFromBody = (req) => {

    return new Promise((resolve, reject) => {
        try {
            let body = "";
    
            req.on("data", (chunk) => {

                body+= chunk.toString();

            });
    
            req.on("end", () => {
                resolve(body);
            });
            
        } catch (error) {
            reject(error);
        }    
    })
}

module.exports = {
    getDataFromBody,
    writeToJsonFile,
}