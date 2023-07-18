const express = require('express');
const router = express.Router();
const User = require('../db/models/user')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert({
      "type": process.env.TYPE,
      "project_id": process.env.PROJECT_ID,
      "private_key_id": process.env.PRIVATE_KEY_ID,
      "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      "client_email": process.env.CLIENT_EMAIL,
      "client_id": process.env.CLIENT_ID,
      "auth_uri": process.env.AUTH_URI,
      "token_uri": process.env.TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
      "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
      "universe_domain": process.env.UNIVERSE_DOMAIN
    }),
  });

//Root here is localhost:8000/api/auth
router.post('/register', async (req, res) => {
    const idToken = req.headers.authorization.split(' ')[1];
    // Verify the idToken, extract the claims
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
      const email = decodedToken.email;
  
      // Check if the user already exists in db
      let user = await User.findOne({ where: { userID: uid } });
      if (!user) {
        // If the user doesn't exist, create a new record
        user = await User.create({
          userID: uid,
          email: email,
        });
      }
      res.status(200).json({ message: "Successfully registered!", user: user });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error: error });
    }
  });
  

module.exports = router;
