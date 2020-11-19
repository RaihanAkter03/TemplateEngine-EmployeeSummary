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
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function addteamMember() { 
    inquirer.prompt([
        {
            message: "Enter team member's name",
            name: "name"
        },
        {
            type: "list",
            message: "Team member's role",
            choices: ["Engineer", "Intern", "Manager"],
            name: "role"
        },
        {
            message: "Team member's ID",
            name: "id"
        },
        {
            message: "Team member's email address",
            name: "email"
        },
    ]).then(function ({ id, name, email, role }) {
        const assignRole = "";
        if (role === "Engineer") {
            assignRole = "Github Username";
        } else if (role === "Intern") {
            assignRole = "School name";
        } else if (role === "Manager") {
            assignRole = "Office Phone number";
        }

        inquirer.prompt([
            {
                message: `Team member's ${assignRole}`,
                name: "assignRole"
            },
            {
                type: "list",
                message: "Would you like to add another team member?",
                choices: ["Yes", "No"],
                name: "anotherMember"
            }
        ]).then(function ({ assignRole, anotherMember }) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(id, name, email, assignRole);
            } else if (role === "Intern") {
                newMember = new Intern(id, name, email, assignRole);
            } else {
                newMember = new Manager(id, name, email, assignRole);
            }

            teamMemberArray.push(newMember);
            addMemberHTML(newMember)
                .then(function () {
                    if (anotherMember === "Yes") {
                        addteamMember();
                    } else {
                        completeHTML();
                    }
                });
        });
    });
}

function GeneratingTeamHTML() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Employee Summary</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile(outputPath, html, function (err) {
        if (err) throw err;
    });
    console.log("generating html start");
}

function addMemberHTML(newMember) { 
    
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
