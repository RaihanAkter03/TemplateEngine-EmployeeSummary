const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const fs = require("fs");

const path = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMemberArray = [];

function createManager() {
    console.log("Please enter your team's manager info...");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your team manager's name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's ID number?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's Email address?"
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?"
        }
    ]).then(function (answers) {
        const manager = new Manager(answers.managerId, answers.managerName, answers.managerEmail, answers.managerOfficeNumber);
        teamMemberArray.push(manager);
        createTeam();
    })
}

function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "teamRole",
            message: "What type of team member or role would you like to add?",
            choices: ["Engineer", "Intern", "Build Team"]
        }
    ]).then(function (answers) {
        if (answers.teamRole === "Engineer") {
            createEngineer();
        } else if (answers.teamRole === "Intern") {
            createIntern();
        } else {
            buildTeam();
        }
    })
}

function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's ID number?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's Email address?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's github?"
        }
    ]).then(function (answers) {
        const engineer = new Engineer(answers.engineerId, answers.engineerName, answers.engineerEmail, answers.engineerGithub);
        teamMemberArray.push(engineer);
        createTeam();
    })
}

//create intern function goes here
function createIntern() { 
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "internId",
            message: "What is your intern's ID number?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's Email address?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is your intern's school?"
        }
    ]).then(function (answers) {
        const intern = new Intern(answers.internId, answers.internName, answers.internEmail, answers.internSchool);
        teamMemberArray.push(intern);
        createTeam();
    }) 
}


function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMemberArray), "utf-8");
}

createManager();