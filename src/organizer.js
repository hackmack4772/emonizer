const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
let history = [];



function getCategories(customFile) {
    if (customFile && fs.existsSync(customFile)) {
        return JSON.parse(fs.readFileSync(customFile, "utf-8"))
    }
    return require("../config/categories.json");
}
function logAction(message) {
    fs.appendFileSync("logs/action.log",`[${new Date().toISOString()}] ${message}\n`)
}
function getSizeCategory(sizeInBytes){
    return sizeInBytes > 100 * 1024 * 1024 ? "Large Files" : "Small Files";

}


function organizeFiles(folderPath, options = {}) {
    
    //Check if the folder exists
    if (!fs.existsSync(folderPath)) {
        console.log(`Folder does not exist: ${folderPath}`);
        return;
    }
    const categories = getCategories(options);
    const files = fs.readdirSync(folderPath);
    const movedFiles = [];
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        if (!fs.lstatSync(filePath).isFile()) {
            // console.log(`${file} is not a file. Skipping...`);
            return;
        }
        const ext = path.extname(file).toLowerCase().trim().substring(1);
        const size=fs.statSync(filePath).size;


        let category = "Others";
        for (const [key, extensions] of Object.entries(categories)) {
            if (extensions.includes(ext)) {
                category = key;
                break;
            }

        }

        if(options.sizeSorting){
            category=getSizeCategory(size);
        }
        const categoryFolder = path.join(folderPath, category);
        const newFilePath = path.join(categoryFolder, file);

        if (!fs.existsSync(categoryFolder)) {
            fs.mkdirSync(categoryFolder);
        }
        if(fs.existsSync(newFilePath)){
            console.log(`File already exists in ${category} folder: ${file}`);
            return;
        }
        if(options.dryRun){
            console.log(`[DRY RUN] ${file} -> ${category}`);

        }
        else{
            //Fs.renameSync is used to move the file to the new location
            // fs.renameSync(filePath,newFilePath);
            movedFiles.push({ from: filePath, to: newFilePath });
            logAction(`Moved ${file} to ${category} folder`);

        }

       
    })
    history = movedFiles;
    if(!options.dryRun){
      // fs.writeFileSync(path.join(folderPath,'history.json'),JSON.stringify(history,null,2));
    console.log(`Organized ${files.length} files into respective folders.`);  
    }
    
}

module.exports = organizeFiles;


// 
// Commands
// $ node bin/organizer.js organize --dry-run
// $ node bin/organizer.js undo
// node bin/organizer.js organize --categories=myCategories.json
