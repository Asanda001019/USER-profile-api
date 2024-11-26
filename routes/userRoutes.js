// const express = require('express');
// const fs = require('fs').promises;
// const path = require('path');

// const router = express.Router();
// const usersFilePath = path.join(__dirname, '..');

// // Function to read users from file
// const readUsersFromFile = async () => {
//     try {
//         const data = await fs.readFile(usersFilePath, 'utf8');
//         return JSON.parse(data);
//     } catch (error) {
//         // Return an empty array if the file doesn't exist or is empty
//         return [];
//     }
// };

// // Route to fetch and display all users
// router.get('/', async (req, res) => {
//     try {
//         const users = await readUsersFromFile();
//         res.render('users', { title: 'Users List', users });
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).send('Error retrieving users.');
//     }
// });

// module.exports = router;
