const router = require("express").Router();
// router.use('/register', require("../auth/register"));

//already mounted on /api/ 
router.use("/photos", require("./photos"));
router.use("/users", require("./users"));
router.use("/auth", require("./auth"));
router.use((req, res, next) => {
    const error = new Error("404 Not Found");
    error.status = 404;
    next(error);
  });
  
  module.exports = router;