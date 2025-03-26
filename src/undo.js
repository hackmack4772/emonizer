const fs =require('fs');
const path=require('path');


function undoLastOrganize(){
    //check for the current file
    const folder=process.cwd();
    //check for the history file  in the current folder
    const historyFile=path.join(folder,'history.json');
    //check if the history file exists
    if(!fs.existsSync(historyFile)){
        console.log("No history found to undo.");
        return;
    }
    // Parse the history file
    // Check if the history file is empty
    const fileStats=fs.statSync(historyFile);
    if(fileStats.size===0){
        console.log("No history found to undo.");
        return;
    }
    // Read the history file and parse it as JSON

    const history=JSON.parse(fs.readFileSync(historyFile,'utf-8'));
    // Check if the history is empty
    if(history.length===0){
        console.log("No history found to undo.");
        return;
    }
    // Loop through the history and rename the files back to their original names

    history.forEach(({from,to})=>{
        // Check if the file exists in the current folder
        if(fs.existsSync(to)){
            // Rename the file back to its original name
            fs.renameSync(to,from);

        }
    })
    // Delete the history file
    // Check if the history file exists
    if(fs.existsSync(historyFile)){
        // Delete the history file
        fs.unlinkSync(historyFile);
    }   
    // Log the success message
    console.log("Last organization undone successfully.");
}

// Export the function for use in other files
module.exports=undoLastOrganize;