// require('dotenv').config();

// const express = require('express');

// const userRoutes =require('./routes/userRoutes');

// errorHandller =require('./middleware/errorHandler');

// const app = express();

// app.set("view engine","ejs");

// app.set("views","./views");

// app.get("/", (req, res) => {
//     res.render("welcome", { title: "Welcome", message: "Welcome to Our Application!" });
// });


// app.get('/signup', (req, res) => {
//     res.render('signup');
// });


// const port = process.env.VITE_PORT;

// // app.use(express.json());

// // app.use('/users',userRoutes);
// app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`);
// });

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware to parse incoming request body
app.use(bodyParser.urlencoded({ extended: true }));

// Route for welcome page
app.get("/", (req, res) => {
    res.render("welcome", { title: "Welcome", message: "Welcome to Our Application!" });
});

// Route to display the signup form
app.get('/signup', (req, res) => {
    res.render('signup'); 
});

// Route to handle signup form submission
app.post('/https://localhost:4000/users', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        console.log(`Signup Details - Username: ${username}, Password: ${password}`);
        res.send(`Signup successful! Welcome, ${username}!`);
    } else {
        res.status(400).send("Please provide a valid username and password.");
    }
});


const port = process.env.VITE_PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
