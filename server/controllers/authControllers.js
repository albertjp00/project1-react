const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()


// Test route
const test = (req, res) => {
    console.log("test worked");
    res.json('test is working');
};

const registerUser = async (req, res) => {
    try {
        console.log("register user");

        const { name, email, password } = req.body;
        console.log(name, email, password);

        if (!name) {
            return res.json({ error: 'name is required' });
        }
        if (!password) {
            return res.json({ error: "password is required" });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: "email is taken already" });
        }

        const user = await User.create({ name, email, password });
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        console.log("login User");

        const { email, password } = req.body;
        
        const user = await User.findOne({ email, password });
        
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {  
            if (err) {
                throw err;
            }

            res.cookie('token', token, {
                httpOnly: true,   
                secure: false,   
                sameSite: 'Lax',   
                maxAge: 24 * 60 * 60 * 1000, 
            });

            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            });

            console.log("token", token);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};




const getProfile = async (req, res) => {
    // console.log('Cookies:', req.cookies);  // Log cookies to see if any are being sent
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET );
        const userId = decodedToken.id;

        const user = await User.findById(userId)
        console.log(user);
        
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const uploadProfilePicture = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.id;
  
      const file = req.file.filename;
    //   console.log(file);
      
        
        
      const updatedUser = await User.findByIdAndUpdate(userId, { picture: file }, { new: true });
  
      if (!updatedUser) return res.status(404).json({ error: "User not found" });
  
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload profile picture" });
    }
  };
  



  // ADMIN controllerss-------------------------------

 const getUsers = async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };


  const loadEditUser = async (req, res) => {
    try {
        const  id  = req.query.id;
        console.log("id of user",id);
        
      const users = await User.findById(id); // Fetch all users
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  


  // Route to update a user
  const userEdit = async (req, res) => {
    try {
      const id = req.query.id; 
      const updatedUser = req.body;  
      console.log(updatedUser);
      
  
      const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);  // Return the updated user data
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  };


  const userDelete = async (req,res) =>{
    try {
        const id = req.query.id
    const user = await User.findByIdAndDelete(id)
    res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });        
    }
  }


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    uploadProfilePicture,
    getUsers,
    userEdit,
    loadEditUser,
    userDelete
};
