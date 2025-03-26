#!/usr/bin/env node
console.log("Welcome to File Organizer!");
const { program } = require("commander");
const OrganizeFiles = require("../src/organizer");
const undoLastOrganization = require("../src/undo");

program.version("1.0.0").description("File Organizer CLI");
program.command("organize [folder]").description("Organize files in the given folder (or current folder if none specified)").action((folder)=>{
    const targetFolder=folder ||process.cwd();
    // const targetFolder = folder; 
    OrganizeFiles(targetFolder);
})

program.command("undo").description("Undo the last organization").action(()=>{
    undoLastOrganization();
})

program.parse();