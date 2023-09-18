const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser } = require('../routes/authController.js')

//middleware
router.use(
    cors({
        credentials: true,
        origin:'http://localhost:5173'
    })
)

router.get('/',test)
router.post('/testregister' , registerUser)

module.exports = router