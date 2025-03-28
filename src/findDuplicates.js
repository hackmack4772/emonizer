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
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        if (!fs.lstatSync(filePath).isFile()) return;

        const hash = getFileHash(filePath);
        if (fileHashes[hash]) {
            duplicates.push({ original: fileHashes[hash], duplicate: filePath });
        }
        else{
            fileHashes[hash] = filePath
        }
    })
    if(duplicates.length==0){
        console.log("No duplicates found.");
        return;
    }
    console.log("Duplicate files found:");
    duplicates.forEach(({original,duplicate}) => {
        console.log(`❌ ${duplicate} (Duplicate of ${original})`);

    })

    if(options.delete){
        fs.writeFileSync("logs/duplicates.log", JSON.stringify(duplicates, null, 2));
        console.log("Duplicates logged in logs/duplicates.log");
    }
    if(options.delete){
        duplicates.forEach(({duplicate})=>fs.unlinkSync(duplicate));
        console.log("Duplicates deleted.");
    }
    if(options.move){
        const moveFolder=path.resolve(options.move);
        if(!fs.existsSync(moveFolder)){
            fs.mkdirSync(moveFolder);
        }
        duplicates.forEach(({duplicate})=>{
            const newLocation=path.join(moveFolder,path.basename(duplicate));
            fs.renameSync(duplicate,newLocation);
            console.log(`Moved ${duplicate} to ${newLocation}`);
        })
        
    }

}
     


module.exports = findDuplicates;