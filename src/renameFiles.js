const fs = require('fs');
const path = require('path');

const HISTORY_FILE = "logs/rename-history.json";

function saveHistory(originalNames, newNames) {
    const history = { originalNames, newNames };
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

function loadHistory() {
    if (!fs.existsSync(HISTORY_FILE)) {
        return null
    }
    return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
}

const formatName = (name, options) => {
    let newName = name;
    if (options.lowercase) newName = newName.toLowerCase();
    if (options.uppercase) newName = newName.toUpperCase();
    if (options.snakecase) newName = newName.replace("/\s+/g", "_");
    if (options.camelcase) newName = newName.replace("/\s+/g", "_");
    if (options.kebabcase) newName = newName.replace("/\s+/g", "-");
    if (options.prefix) newName = `${options.prefix}${newName}`;

    if (options.suffix) {
        const ext = path.extname(newName);
        newName = `${path.basename(newName, ext)}${options.suffix}${ext}`;
    }
    return newName;
}
function renameFiles(folderPath, options = {}) {
    if (!fs.existsSync(folderPath)) {
        console.log(`Folder does not exist: ${folderPath}`);
        return;
    }
    const files = fs.readdirSync(folderPath);
    const originalNames = [];
    const newNames = [];
    files.forEach((file) => {
        const oldPath = path.join(folderPath, file);

        if (!fs.lstatSync(oldPath).isFile()) return;

        const newFileName = formatName(file, options);
        const newPath = path.join(folderPath, newFileName);
        if (newFileName != file) {
            fs.renameSync(oldPath, newPath);
            originalNames.push(file);
            newNames.push(newFileName);
            console.log(`✅ ${file} renamed to ${newFileName}`);
        }
    })
    if (originalNames.length > 0) saveHistory(originalNames, newNames);

}

function undoRename() {
    const history = loadHistory();
    if (!history) {
        console.log("No history found to undo.");
        return;
    }

    history.newNames.forEach((newName, index) => {
        const oldName = history.originalNames[index];
        const oldPath = path.join(process.cwd(), oldName);
        const newPath = path.join(process.cwd(), newName);
        if (fs.existsSync(newPath)) {
            fs.renameSync(newPath, oldPath);
            console.log(`✅ ${newName} renamed to ${oldName}`);

        }

    })

    fs.unlinkSync(HISTORY_FILE);
    console.log("Undo completed!");

}


module.exports = (folderPath, options) => {
    if (options.undo) {
      undoRename();
    } else {
      renameFiles(folderPath, options);
    }
  };

