const express = require('express');
const router = express.Router();
const User = require('../models/User'); // your Mongoose user model // for password comparison
const { registerUser ,getUsers,loginUser} = require('../controllers/authcontroller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password); // assuming hashed passwords

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     res.json({ _id: user._id, username: user.username });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

module.exports = router;
