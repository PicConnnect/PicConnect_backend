const express = require ("express");
const router = express.Router();
const {Camera_Details, Photo} = require("../db/models");
// const photos = require ("./photos");

router.post("/", async (req, res, next) => {
    const { make, model, exposure_time, aperture, focal_length, iso } = req.body;
    try{
        const [cameraDetail, created] = await Camera_Details.findOrCreate({
            where: {make, model, exposure_time, aperture, focal_length, iso}
        });

        cameraDetail
            ? res.status(200).json(cameraDetail.id, created)
            : res.status(400).send("Error on creating or finding Camera Details");
            
        //const 
    } catch (error) {
        next(error);
    }
});

router.put("/:photoId", async (req, res, next) => {
    const { make, model, exposure_time, aperture, focal_length, iso } = req.body;
    const photoId = req.params.photoId;
    const created = false;
    try{
        const cameraDetail = await Camera_Details.findOne({
            where: {make, model, exposure_time, aperture, focal_length, iso}
        });
        const oldCameraDetailId = cameraDetail.id;
        if(!cameraDetail) {
            [cameraDetail, created] = await Camera_Details.findOrCreate({
                where: {make, model, exposure_time, aperture, focal_length, iso}
            });
        }
            const updatedPhoto = await Photo.update(
                {cameraDetailId: cameraDetail.id},
                {
                    where: { id: photoId }
                }
        );
        
        const photoCount = await Photo.count({
            where: {cameraDetailID: oldCameraDetailId}
        });

        if(photoCount === 0){
            const deletedCameraDetail = await Camera_Details.destroy({
                where: { id: oldCameraDetailId }
            });
            deletedCameraDetail
                ? res.status(200).send("camera detail deleted")
                : res.status(400).send("delete fail");
        }
    } catch (error) {
        next(error);
    }
});

