const db = require("./db");
const {User, Tag, Reply, Photo, Location, Comment, Camera_Details} = require("./db/models");

const UserSeed = [
    {
        "userID": "firebase_user_id_1",
        "name": "John Doe",
        "about": "I am a software engineer with a passion for web development.",
        "rating": 4.8
    },
    {
        "userID": "firebase_user_id_2",
        "name": "Jane Smith",
        "about": "Aspiring photographer exploring the beauty of nature.",
        "rating": 4.2
    },
    {
        "userID": "firebase_user_id_3",
        "name": "Alex Johnson",
        "about": "Music lover and guitar enthusiast. Rock 'n' roll forever!",
        "rating": 4.9
    }
];

const TagSeed = [
    {
        "tag_name": "technology"
    },
    {
        "tag_name": "food"
    },
    {
        "tag_name": "travel"
    },
];

const ReplySeed = [
    {
        "reply_text": "Thank you!",
        "commentId": 1,
        "userUserID": "firebase_user_id_1"
    },
    {
        "reply_text": "Glad you liked it!",
        "commentId": 2,
        "userUserID": "firebase_user_id_2"
    },
    {
        "reply_text": "I appreciate your feedback.",
        "commentId": 3,
        "userUserID": "firebase_user_id_2"
    }
];

const PhotoSeed = [
    {
        "title": "Beautiful Sunset",
        "description": "A stunning sunset over the ocean.",
        "downloads": 1234,
        "urls": "https://example.com/image1234_small.jpg",
        "userUserID": "firebase_user_id_1",
        "locationId": 1,
        "cameraDetailId": 1
    },
    {
        "title": "Mountain Landscape",
        "description": "A majestic view of mountains and valleys.",
        "downloads": 5678,
        "urls": "https://example.com/image5678_small.jpg",
        "userUserID": "firebase_user_id_2",
        "locationId": 2,
        "cameraDetailId": 2
    },
    {
        "title": "Lake View",
        "description": "A majestic view of mountains and valleys.",
        "downloads": 5678,
        "urls": "https://example.com/image5678_small.jpg",
        "userUserID": "firebase_user_id_3",
        "locationId": 3,
        "cameraDetailId": 3
    }
];

const LocationSeed = [
    {
        "city": "New York",
        "location_name": "Central Park",
        "latitude": 40.785091,
        "longitude": -73.968285
        },
    {
        "city": "Paris",
        "location_name": "Eiffel Tower",
        "latitude": 48.8584,
        "longitude": 2.2945
    },
    {
        "city": "Sydney",
        "location_name": "Sydney Opera House",
        "latitude": -33.8568,
        "longitude": 151.2153
    }
];
const CommentSeed = [
    {
        "commentText": "Beautiful photo!",
        "photoId": "1",
        "userUserID": "firebase_user_id_1"
    },
    {
        "commentText": "Great composition!",
        "photoId": "1",
        "userUserID": "firebase_user_id_2"
    },
    {
        "commentText": "Love the colors in this photo.",
        "photoId": "2",
        "userUserID": "firebase_user_id_3"
    }
];

const CameraDetailsSeed = [
    {
        "make": "Nikon",
        "model": "D850",
        "exposure_time": 1/2000,
        "aperture": 4.0,
        "focal_length": 35,
        "iso": 400
    },
    {
        "make": "Sony",
        "model": "Alpha a7 III",
        "exposure_time": 1/500,
        "aperture": 2.8,
        "focal_length": 24,
        "iso": 800
    },
    {
        "make": "Canon",
        "model": "EOS R5",
        "exposure_time": 1/1600,
        "aperture": 5.6,
        "focal_length": 70,
        "iso": 200
    },
];

const seed = async() => {
    await db.sync({force: true});
    await User.bulkCreate(UserSeed);
    await Tag.bulkCreate(TagSeed);
    await Camera_Details.bulkCreate(CameraDetailsSeed);
    await Location.bulkCreate(LocationSeed);
    await Photo.bulkCreate(PhotoSeed);
    await Comment.bulkCreate(CommentSeed);
    await Reply.bulkCreate(ReplySeed);
}

seed().then(() => process.exit());
