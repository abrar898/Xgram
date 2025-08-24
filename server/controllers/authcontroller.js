const User = require('../models/User');

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ message: 'Username already exists' });

    const newUser = new User({ username, password }); // no hashing here yet for simplicity
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find({},'username');
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
// const getChats=async(req,res)=>{
//   try{
//     const  
//   }
// };

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ userId: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { registerUser ,getUsers,loginUser};
