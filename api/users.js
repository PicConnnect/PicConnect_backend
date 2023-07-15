const express = require ("express");
const router = express.Router();
const { User } = require("../db/models");

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



module.exports = router;