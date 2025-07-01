const express = require('express');
const router = express.Router();
const user = require('../databases/user');
const email = require('../common/email');

router.post('/check', async (req, res) => {
    console.log(req.body);

    const user_id = req.body.user_id;
    const email_verification_number = req.body.randomNum;

    try {
        const result = await user.findByEmail(user_id);
        if (result) {
            res.json("-1");
        }else{
        //   const result = await email.sendEmail(user_id, email_verification_number)
          console.log(result);
          res.json(true);
        }

    } catch (error) {
        console.error(error)
    }

});

module.exports = router;