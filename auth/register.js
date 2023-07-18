const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

//route is not /auth/register
const keyData = require("../apikeys/ttp-capstone-social-media-firebase-adminsdk-ax3sl-a0111d5003.json");
const User = require("../db/models/user");
admin.initializeApp({
  credential: admin.credential.cert(keyData),
});

router.post("/", (req, res) => {
  console.log("here in register");
  const token = req.header("Authorization").replace("Bearer ", "");

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const userID = decodedToken.uid;
      const email = decodedToken.email;
      const name = decodedToken.name;

      //handle is user with same id exists in the db
      User.findOne({ where: { userID } })
        .then((user) => {
          //in case, user already exists,
          if (user) {
            res.status(409).json({ error: "User already registered" });
          } else {
            User.create({ userID, name, email })
              .then((user) => res.json(user))
              .catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Failed to register user" });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Failed to check if user exists" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(401).json({ error: "Unauthorized " });
    });
});
module.exports = router;
