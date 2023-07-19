const express = require ("express");
const router = express.Router();
const { User } = require("../db/models");

//ROOT HERE IS localhost:8000/api/users/
// handling single user get request
router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        console.log(id)
        const userInfo = await User.findByPk(id, {
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
    console.log(id, followerID);
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
})

module.exports = router;
