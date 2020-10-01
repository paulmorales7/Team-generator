const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArr = [];

function employeeInfo() {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of employee would you like add?",
            name: "name",
            choices: ["Intern", "Engineer", "Manager", "Complete"],
        },
    ]).then(input => {
        if (input.name === "Intern") {
            internInfo();
        } else if (input.name === "Engineer") {
            engineerInfo();
        } else if (input.name === "Manager") {
            managerInfo();
        } else if (input.name === "Complete") {
            generateHTML(outputPath, render(teamArr));
        };
    });
};

function managerInfo() {
    return inquirer.prompt([
        {
            message: "What is the manager's name?",
            name: "name"
        },
        {
            message: "What is the manager's id?",
            name: "id"
        },
        {
            message: "What is the manager's email?",
            name: "email"
        },
        {
            message: "What is the manager's office number?",
            name: "officeNumber"
        },
    ]).then(function (data) {
        let manager = new Manager(data.name, data.id, data.email, data.officeNumber)
        teamArr.push(manager);

        employeeInfo()
    })
};

function engineerInfo() {
    return inquirer.prompt([
        {
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            message: "What is the engineer's id?",
            name: "id"
        },
        {
            message: "What is the engineer's email?",
            name: "email"
        },
        {
            message: "What is the engineer's Github username?",
            name: "github"
        }
    ]).then(function (data) {
        let engineer = new Engineer(data.name, data.id, data.email, data.github)
        teamArr.push(engineer);

        employeeInfo();
    })
};

function internInfo() {
    return inquirer.prompt([
        {
            message: "What is the intern's name?",
            name: "name"
        },
        {
            message: "What is the intern's id?",
            name: "id"
        },
        {
            message: "What is the intern's email?",
            name: "email"
        },
        {
            message: "What school does the intern go to?",
            name: "school"
        }
    ]).then(function (data) {
        let intern = new Intern(data.name, data.id, data.email, data.school)
        teamArr.push(intern);

        employeeInfo();
    })
};

function generateHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
        }
        console.log("All done! Your team info is now complete!");
    });
};

employeeInfo();

//const generateHtml = require("./Output/generateHtml");

// const globalArr = [];

// const EmployeeArr = [
//     {
//         type: "input",
//         name: "name",
//         message: "What is your name?"
//     },
//     {
//         type: "input",
//         name: "email",
//         message: "What is your email?"
//     },
//     {
//         type: "checkbox",
//         message: "What is your id?",
//         choices: [
//             "Engineer",
//             "Intern",
//             "Manager"
//         ],
//         name: "id",
//     },
//     {
//         type: "input",
//         name: "school",
//         message: "What school did you attend?"
//     },
//     {
//         type: "input",
//         name: "github",
//         message: "What is your github account?"
//     },
//     {
//         type: "input",
//         name: "officeNumber",
//         message: "What is your office number?"
//     }

// ];


// function createFile(filename, data) {
//     fs.writeFile(filename, data, function (err) {
//         if (err) {
//             throw err;
//         }
//     })
// }

// function init() {
//     inquirer.prompt(EmployeeArr).then((Responses) => {
//         globalArr.push(Responses)

//         const managerInfo = new Manager(this.name, this.Id, this.email, this.officeNumber);
//         globalArr.push(managerInfo);

//         const engineerInfo = new Engineer(this.name, this.Id, this.email, this.github);
//         globalArr.push(engineerInfo);

//         const internInfo = new Intern(this.name, this.Id, this.email, this.school);
//         globalArr.push(internInfo);

//         const teamHtml = generateHtml(globalArr)
//         console.log(teamHtml)
//         fs.writeFile('Team.html', teamHtml, render(globalArr), "utf8", function (err) {
//             if (err) {
//                 throw err;
//             }
//         })
//     })

// }



// init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
