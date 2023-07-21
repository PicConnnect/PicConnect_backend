const express = require ("express");
const fs = require('fs');
const exiftool = require('exiftool-vendored').exiftool;
const multer = require('multer');
const router = express.Router();
const { Photo, Tag, Camera_Details, Location }  = require("../db/models");
//const { Sequelize } = require("sequelize");

//Root here is localhost:8000/api/photos
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

router.get("/user/:id", async (req,res, next) => {
    const { id } = req.params;
    try {
        const photos = await Photo.findAll({ where: { userId: id } });
        res.json(photos);
      } catch (error) {
        next(error);
      }
}); 
//add photo
router.post("/addPhoto", async(req, res, next) => {
    try {
        console.log(req.body);
        const {GPSAltitude, GPSLatitude, GPSLongitude, GPSPosition, description, 
        downloads, exposure_time, focal_length, iso, make, model, title, urls, userId, tz, aperture} = req.body;
        //create new row in cameradetails and return it to retreive id
        const createCameraDetails = await Camera_Details.create({make, model, exposure_time, aperture, focal_length, iso}, {returning: true}).catch((error) => {
            console.error("Error creating Camera_Details:", error);
        });
        const cameraDetailId = createCameraDetails.id;

        const createPhoto = await Photo.create({title, description, downloads, urls, userId, cameraDetailId});
        createPhoto
            ? res.status(200).json(createPhoto)
            : res.status(400).send("Can't add photo");
    } catch (error) {
        next(error);
    }
});

// Set up multer for handling file uploads
//multer options
const upload = multer({dest: 'upload'});
router.post('/extract-metadata', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        // Get the path of the uploaded photo
        const filePath = req.file.path;

        // Specify the tags you want to extract from the metadata
        const tagsToExtract = [
            'Make',
            'Model',
            'ExposureTime',
            'ISO',
            'FocalLength',
            'GPSLatitude',
            'GPSLongitude',
            'GPSAltitude',
            'GPSPosition',
            'tz',
            'Aperture'
        ];
        // Create an object to hold the extracted tags and their values
        const extractedTags = {};
        // Extract metadata using exiftool
        const metadata = await exiftool.read(filePath);
        if(metadata){
            tagsToExtract.forEach((tag) => {
                if (tag in metadata) {
                  extractedTags[tag] = metadata[tag];
                }
            });
            
            // Return the metadata as the response
            res.json(extractedTags);
        }
        // Delete the uploaded image from upload folder after sending the response
        fs.unlink(filePath, (err) => {
            if (err) {
          console.error('Error deleting the file:', err);
        }
        console.log('File deleted successfully');
        });
      } catch (err) {
        console.error('Error extracting metadata:', err);
        res.status(500).json({ error: 'Error extracting metadata' });
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
});

router.get("/tag/:tagId", async (req, res, next) => {
    const tagId = req.params.tagId;
    console.log(tagId)
    try {
        const tagPhotos = await Tag.findByPk(tagId, {
            include: {all: true, nested: true},
        });
        tagPhotos
            ? res.status(200).json(tagPhotos)
            : res.status(400).send("Photos not found");
    } catch (error) {
        next (error);
    }
});
module.exports = router;