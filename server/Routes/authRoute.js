const express = require('express')
const router = express.Router()
const cors = require('cors')
const {test,registerUser,loginUser,getProfile,uploadProfilePicture, getUsers, userEdit, loadEditUser, userDelete} = require('../controllers/authControllers')

const multer = require('multer')
const path = require('path')





// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the directory relative to the server root
    cb(null, path.join(__dirname, '../images')); // Move up one directory level from 'Routes'
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});



const upload = multer({ storage });






router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)


router.get('/',test)

router.post('/register',registerUser)

router.post('/login',loginUser)

router.get('/profile', getProfile)


//ADMIN Routes ------------

router.get('/admin',getUsers)

router.get('/loadEditUser',loadEditUser)

router.post('/editUser',userEdit)

router.delete('/admin/deleteUser',userDelete)

router.post('/upload-profile-picture', upload.single('profilePicture'), uploadProfilePicture);

module.exports = router