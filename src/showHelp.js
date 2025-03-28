function showHelp() {
    console.log(`
    📂 **File Organizer CLI** - Organize your files easily!  
    ------------------------------------------------------
    
    🚀 **Usage:**  
      node bin/organizer.js <command> [options]
  
    📌 **Available Commands:**
  
    1️⃣ **Organize Files by Type**
       👉 Sorts files into folders based on their type.
       🔹 Usage: node bin/organizer.js organize [folder]
  
    2️⃣ **Find and Remove Duplicates**
       👉 Detects duplicate files and removes them if needed.
       🔹 Usage: node bin/organizer.js find-duplicates [folder] [options]
       🔹 Options:
           --delete       (Deletes duplicate files)
           --move <path>  (Moves duplicates to a folder)
           --log          (Logs duplicates to a file)
  
    3️⃣ **Batch Rename Files**
       👉 Renames multiple files using prefixes, suffixes, and formats.
       🔹 Usage: node bin/organizer.js rename [folder] [options]
       🔹 Options:
           --prefix <text>      (Add prefix to filenames)
           --suffix <text>      (Add suffix before extension)
           --lowercase          (Convert filenames to lowercase)
           --uppercase          (Convert filenames to uppercase)
           --snakecase          (Convert filenames to snake_case)
           --kebabcase          (Convert filenames to kebab-case)
           --undo               (Revert the last renaming operation)
  
    4️⃣ **Undo Last Operation**
       👉 Reverts the last rename or organization action.
       🔹 Usage: node bin/organizer.js undo
  
    5️⃣ **View Help**
       👉 Shows this help menu.
       🔹 Usage: node bin/organizer.js help
  
    🎯 **Examples:**
       ✔ Organize current folder:   node bin/organizer.js organize
       ✔ Find duplicates & delete:  node bin/organizer.js find-duplicates --delete
       ✔ Rename files to kebab-case: node bin/organizer.js rename --kebabcase
       ✔ Undo last rename:          node bin/organizer.js rename --undo
  
    🔥 **Happy Organizing!**
    `);
  }
  
  module.exports = showHelp;
  