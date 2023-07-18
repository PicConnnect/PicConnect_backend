const express = require ("express");
const router = express.Router();
const { User } = require("../db/models");

//ROOT HERE IS localhost:8000/api/users/
// handling single user get request
router.get("/:userID", async (req, res, next) => {
    const userID = req.params.userID;
    try {
        console.log(userID)
        const userInfo = await User.findByPk(userID, {
            include: {all: true, nested: true},
        });
        userInfo
            ? res.status(200).json(userInfo)
            : res.status(404).send("User not found");
    } catch (error) {
        next(error);
    }
});

// handling edit user put request
router.put("/:userID", async (req, res, next) => {
    const userID = req.params.userID;
    const updateUser = req.body;
    try {
        const updatedUser = await User.update(updateUser, {
            where:{userID: userID}, 
        });
        updatedUser
            ? res.status(200).json(updatedUser)
            : res.status(400).send("user not found");
    } catch (error) {
        next(error);
    }
});

// handling delete user delete request
router.delete("/:userID", async (req, res, next) => {
    const userID = req.params.userID;
    try {
        const deletedUser = await User.destroy({
            where: { userId: userID },
        });

        deletedUser
            ? res.status(200).send("Delete User")
            : res.status(400).send("user not found");
    } catch (error) {
        next (error);
    }
});

//handling add follower to the user post request
router.post("/:userID/addFollower/:followerID", async (req, res, next) => {
    
    const { userID, followerID } = req.params;
    console.log(userID, followerID);
    try {
        const user = await User.findByPk(userID);
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
router.delete("/:userID/deleteFollower/:followerID", async (req, res, next) => {
    const { userID, followerID } = req.params;
    try{
        const user = await User.findByPk(userID);
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
})

module.exports = router;