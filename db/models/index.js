const Photo = require("./photo");
const Camera_Details = require("./cameraDetails");
const Comment = require("./comment");
const Location = require("./location");
const Reply = require("./reply");
const Tag = require("./tag");
const User = require("./user");

//User 1 -> many Photo
User.hasMany(Photo);
Photo.belongsTo(User);

//User many -> many User through following
//user.belongstoMany(user, {through: "following"})
User.belongsToMany(User, {as: "follower_id", through: "following", foreignKey: 'userId', otherKey: 'followerId'});
User.belongsToMany(User, {as: "following_id", through: "following", foreignKey: 'followerId', otherKey: 'userId'});
/*
User.belongsToMany(User, {as: "followers", through: "Following", foreignKey: 'followingId'});
User.belongsToMany(User, {as: "following", through: "Following", foreignKey: 'followerId'});
*/

//One photo can have many comments but a particular coment belongs to only one photo
Photo.hasMany(Comment);
Comment.belongsTo(Photo);

//User 1 -> many Comments
User.hasMany(Comment);
Comment.belongsTo(User);

//Comment 1 -> many Reply
Comment.hasMany(Reply);
Reply.belongsTo(Comment);

//User 1 -> many Reply
User.hasMany(Reply);
Reply.belongsTo(User);

//Location 1 -> many photo
Location.hasMany(Photo);
Photo.belongsTo(Location);

//Camera_details 1 -> many Photo
Camera_Details.hasMany(Photo);
Photo.belongsTo(Camera_Details);

Photo.belongsToMany(Tag, {through: "tag_photo"});
Tag.belongsToMany(Photo, {through: "tag_photo"});

module.exports = {
    Photo,
    Camera_Details,
    Comment,
    Location,
    Reply,
    Tag,
    User
};
