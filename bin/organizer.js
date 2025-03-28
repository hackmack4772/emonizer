#!/usr/bin/env node
console.log("Welcome to File Organizer!");
const { program } = require("commander");
const organizeFiles = require("../src/organizer");
const findDuplicates = require("../src/findDuplicates");
const undoLastOrganization = require("../src/undo");
const showHelp = require("../src/showHelp");
const renameFiles = require("../src/renameFiles");

program.version("1.0.0").description("File Organizer CLI");
program.command("organize [folder]").
option("--dry-run","Show what will happen without making changes").
option("--size-sorting","Sort files based on size"). 
option("--categories <file>","Use a custom categories JSON file")
.description("Organize files in the given folder (or current folder if none specified)")
.action((folder,options) => {
    const targetFolder = folder || process.cwd();
    // const targetFolder = folder; 
    organizeFiles(targetFolder,options);
})

program.command("undo").description("Undo the last organization").action(() => {
    undoLastOrganization();
})

program
  .command("find-duplicates [folder]")
  .option("--delete", "Automatically delete duplicate files")
  .option("--move <path>", "Move duplicates to a specific folder")
  .option("--log", "Save duplicate report to logs")
  .description("Find and handle duplicate files in the given folder")
  .action((folder, options) => {
    const targetFolder = folder || process.cwd();
    findDuplicates(targetFolder, options);
  });

  program
  .command("help")
  .description("Display all available commands and their usage")
  .action(() => {
    showHelp();
  });

  program
  .command("rename [folder]")
  .option("--prefix <text>", "Add prefix to filenames")
  .option("--suffix <text>", "Add suffix before extension")
  .option("--lowercase", "Convert filenames to lowercase")
  .option("--uppercase", "Convert filenames to uppercase")
  .option("--snakecase", "Convert filenames to snake case")
  .option("--camelcase", "Convert filenames to camel case")
  .option("--kebabcase", "Convert filenames to kebab case")

  .description("Rename files in the given folder (or current folder if none specified)")
  .action((folder, options) => {
    const targetFolder = folder || process.cwd();
    renameFiles(targetFolder, options);
  });
program.parse();