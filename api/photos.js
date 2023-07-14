const express = require ("express");
const router = express.Router();
const { Photo }  = require("../db/models");
//const { Sequelize } = require("sequelize");

//getting all photos
router.get("/", async (req, res, next) => {
    try {
        const allphotos = await Photo.findAll({
            //if you want to randomize the data, - also uncomment sequelize too
            //order: [[Sequelize.literal('RAND()')]],
            limit: 30,
            //all the includes
            include: {all: true, nested: true},
        });
        allphotos
            ? res.status(200).json(allphotos)
            : res.status(404).send("Photos Not Found");
    } catch (error) {
        next(error);
    }
});


router.get("/:id", async(req, res, next) => {
    const photoId = req.params.id;
    try {
        const singlePhoto = await Photo.findByPk(photoId,{
            //all the includes
            include: {all: true, nested: true},
        });
        singlePhoto
            ? res.status(200).json(singlePhoto)
            : res.status(404).send("Photo Not Found");
    } catch(error) {
        next(error);
    }
});

router.get("/user/:userId", async (req,res, next) => {
    const userId = req.params.userId;
    try{
        const userPhotos = await Photo.findAll({
            where: {
                userUserID: userId
            },
            include: {all: true, nested: true}, 
        })
        userPhotos
            ? res.status(200).json(userPhotos)
            : res.status(404).send("User's photos not found")

    } catch (error) {
        next(error);
    }
});
//add photo
router.post("/addPhoto", async(req, res, next) => {
    try {
        const createPhoto = await Photo.create(req.body);
        createPhoto
            ? res.status(200).json(createPhoto)
            : res.status(400).send("Can't add photo");
    } catch (error) {
        next(error);
    }
});
//update photo
router.put("/:id", async (req, res, next) => {
    const photoId = req.params.id;
    const updatePhoto = req.body
    try {
        const updatedPhoto = await Photo.update(updatePhoto, {
            where: { id: photoId },
        });
        updatedPhoto
            ? res.status(200).json(updatedPhoto)
            : res.status(400).send("Photo not found");
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    const photoId = req.params.id;
    try {
        const deletedPhoto = await Photo.destroy({
            where: { id: photoId },
        });

        deletedPhoto
            ? res.status(200).send("Photo deleted")
            : res.status(400).send("Photo not found");
    } catch (error) {
        next (error);
    } 
})
