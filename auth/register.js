const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

//route is not /auth/register
const keyData = require('../apikeys/ttp-capstone-social-media-firebase-adminsdk-ax3sl-a0111d5003.json');
admin.initializeApp({
    credential: admin.credential.cert(keyData)
});

router.post('/', (req, res) => {
    console.log("here in register");
    const {email, password} = req.body;
    
    admin.auth().createUser({
        email,
        password
    })
    .then((userRecord) => {
        res.status(200).json({message: "User registered", uid: userRecord.uid});
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({error: "failed to register user"});
    });
    
});
module.exports = router;
// const PORT = 8000;
// app.listen(PORT, () => {
//     console.log("server is running on 8080")
// });