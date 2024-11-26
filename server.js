// const fs = require('fs').promises;

// const path = require('path');

// const DataFile = path.join(__dirname, 'data.json');

// const ReadUsersfromfile = async () => {
//         const data = await fs.readFile(DataFile, 'utf8');
//         return JSON.parse(data);
// }

// const WriteUsersToFile = async (user) => {
//         await fs.writeFile(DataFile, JSON.stringify(user, null,"2"));
// }


// require('dotenv').config();

// const express = require('express');
// const bodyParser = require('body-parser');

// const userRoutes = require('./routes/userRoutes');
// const errorHandler = require('./middleware/errorHandler');

// const app = express();

// // Set view engine and views directory
// app.set("view engine", "ejs");
// app.set("views", "./views");

// // Middleware to parse incoming request body
// app.use(bodyParser.urlencoded({ extended: true }));

// // Route for welcome page
// app.get("/", (req, res) => {
//     res.render("welcome", { title: "Welcome", message: "Welcome to Our Application!" });
// });

// // Route to display the signup form
// app.get('/signup', (req, res) => {
//     res.render('signup'); 
// });

// // Route to handle signup form submission
// app.post('/users', (req, res) => {
//     const { username, password } = req.body;

//     if (username && password) {
//         console.log(`Signup Details - Username: ${username}, Password: ${password}`);
//         res.send(`Signup successful! Welcome, your username is ${username} and ypur password is:  ${password}!`);
//     } else {
//         res.status(400).send("Please provide a valid username and password.");
//     }
// });


// const port = process.env.VITE_PORT;

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware to parse incoming request body
app.use(bodyParser.urlencoded({ extended: true }));

// File path for users.json
const usersFilePath = path.join(__dirname, 'users.json');

// Function to read users from file
const readUsersFromFile = async () => {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Return an empty array if the file doesn't exist or is empty
        return [];
    }
};

// Function to write users to file
const writeUsersToFile = async (users) => {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
};

// Route for welcome page
app.get("/", (req, res) => {
    res.render("welcome", { title: "Welcome", message: "Welcome to Asanda's Server!" });
});

// Route to display the signup form
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Route to handle signup form submission
app.post('/users', async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        try {
            // Read existing users
            const users = await readUsersFromFile();

            // Add the new user
            users.push({ username, password });

            // Write updated users back to the file
            await writeUsersToFile(users);

            // Display a thank-you message
        res.redirect('/users');
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).send('An error occurred while saving your data. Please try again later.');
        }
    } else {
        res.status(400).send("Please provide a valid username and password.");
    }
});
app.get('/users', async (req, res) => {
    try {
        const users = await readUsersFromFile();
        res.render('users', { title: 'Users List', users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error retrieving users.');
    }
});

// Start the server
const port = process.env.VITE_PORT
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




