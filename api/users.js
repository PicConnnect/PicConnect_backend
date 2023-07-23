const express = require ("express");
const router = express.Router();
const { User, Like, Photo } = require("../db/models");

//ROOT HERE IS localhost:8000/api/users/
// users.js

// handling single user get request
router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        //console.log(id)
        const userInfo = await User.findByPk(id, {
            include: {all: true, nested: true},
        });
        if (userInfo) {
            userInfo.profilePicUrl = userInfo.profilePicUrl || 'https://cdn-icons-png.flaticon.com/512/847/847969.png?w=996&t=st=1689999078~exp=1689999678~hmac=55469eb17eccadb1b2993272870eb2de6c1d2599d0699f175b2cd518d5395bb8'; // put the URL of your default image here
            res.status(200).json(userInfo);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        next(error);
    }
});
router.put('/profile-picture', async (req, res) => {
    const { userId, profilePicUrl } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.profilePicUrl = profilePicUrl;
        //console.log(user);
        await user.save();
        return res.status(200).json(user);
    } catch (err) {
        console.error("Server error: ", err);
        return res.status(500).send('Server error');
    }
});

// handling edit user put request
router.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const updateUser = req.body;
    try {
        const updatedUser = await User.update(updateUser, {
            where:{id: id}, 
        });
        updatedUser
            ? res.status(200).json(updatedUser)
            : res.status(400).send("user not found");
    } catch (error) {
        next(error);
    }
});

// handling delete user delete request
router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.destroy({
            where: { id: id },
        });

        deletedUser
            ? res.status(200).send("Delete User")
            : res.status(400).send("user not found");
    } catch (error) {
        next (error);
    }
});

//handling add follower to the user post request
router.post("/:id/addFollower/:followerID", async (req, res, next) => {
    
    const { id, followerID } = req.params;
    //console.log(id, followerID);
    try {
        const user = await User.findByPk(id);
        const follower = await User.findByPk(followerID);
        const followed = await user.addFollower_id(follower);
        followed
            ? res.status(200).json(followed)
            : res.status(404).send("Followed Unsuccessful");
    } catch (error) {
        next(error);
    }
});

//handling remove follower from user delete request
router.delete("/:id/deleteFollower/:followerID", async (req, res, next) => {
    const { id, followerID } = req.params;
    try{
        const user = await User.findByPk(id);
        const follower = await User.findByPk(followerID);
        const isFollower = await user.hasFollower_id(follower);

        if(!isFollower){
            return res.status(404).send("Follower not found for this user");
        }

        const deleteFollower = await user.removeFollower_id(follower);
        deleteFollower
            ? res.status(200).send("Follower deleted")
            : res.status(400).send("Follower not deleted"); 

    } catch (error) {
        next (error);
    }
});
router.get('/:userId/likes', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Get likes associated with user
      const userLikes = await Like.findAll({
        where: { userId: userId }
      });
  
      // Map the userLikes to get array of photoId
      const photoIds = userLikes.map(like => like.photoId);
  
      // Get all photos with id from photoIds
      const photos = await Photo.findAll({
        where: { id: photoIds }
      });
  
      res.json(photos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving user likes');
    }
  });
  


module.exports = router;
