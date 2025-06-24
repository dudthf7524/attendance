const express = require('express');
const router = express.Router();
const auth = require('../databases/auth');



router.post("/register", (req, res) => {
    console.log(req.body);
    
});





module.exports = router;