const fs = require('fs');
const path = require("path");
const crypto = require("crypto");



function getFileHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash("md5").update(fileBuffer).digest("hex");
}
function findDuplicates(folderPath, options = {}) {
    //Check if the folderPath exists

    if (!fs.existsSync(folderPath)) {
        console.log(`Folder does not exist: ${folderPath}`);
        return;
    }

    const files = fs.readdirSync(folderPath);
    const fileHashes = {};
    const duplicates = [];
    files.forEach(file=>{
        const filePath=path.join(folderPath,file);
        if(!fs.lstatSync(filePath).isFile()) return;

        const hash =getFileHash(filePath);
        console.log(hash,'hash');
        





    })





}

module.exports = findDuplicates;