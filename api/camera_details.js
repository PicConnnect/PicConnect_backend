const express = require ("express");
const router = express.Router();
const {Camera_Details} = require("../db/models");

router.post("/", async (req, res, next) => {
    const { make, model, exposure_time, aperture, focal_length, iso } = req.body;
    try{
        const [cameraDetail, created] = await Camera_Details.findOrCreate({
            where: {make, model, exposure_time, aperture, focal_length, iso}
        });

        cameraDetail
            
        //const 
    } catch (error) {
        next(error);
    }
});