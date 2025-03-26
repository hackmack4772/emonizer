const fs=require('fs');
const path=require('path');
const categories=require("../config/categories.json");
let history=[];
function organizeFiles(folderPath){
//Check if the folder exists
if(!fs.existsSync(folderPath)){
    console.log(`Folder does not exist: ${folderPath}`);
    return;
}
const files=fs.readdirSync(folderPath);
const movedFiles=[];
files.forEach(file=>{
    const filePath=path.join(folderPath,file);
    if(!fs.lstatSync(filePath).isFile()){
        // console.log(`${file} is not a file. Skipping...`);
        return;
    }
    const ext=path.extname(file).toLowerCase().trim().substring(1);
    

    let category="Others";
    for(const [key,extensions] of Object.entries(categories)){
        if(extensions.includes(ext)){
            category=key;
            break;
        }
   
    }
    const categoryFolder=path.join(folderPath,category);
    if(!fs.existsSync(categoryFolder)){
        fs.mkdirSync(categoryFolder);
    }
    
    const newFilePath=path.join(categoryFolder,file);
    //Fs.renameSync is used to move the file to the new location
    // fs.renameSync(filePath,newFilePath);
    movedFiles.push({ from: filePath, to: newFilePath });
})
history=movedFiles;
console.log(JSON.stringify(history,null,2));
// fs.writeFileSync(path.join(folderPath,'history.json'),JSON.stringify(history,null,2));
console.log(`Organized ${files.length} files into respective folders.`);
}

module.exports=organizeFiles;