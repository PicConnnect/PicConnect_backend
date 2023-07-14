const router = require("express").Router();

//route is not /auth
//router.use('/register', require("../auth/register"));

router.use((req, res, next) => {
    const error = new Error("404 Not Found");
    error.status = 404;
    next(error);
  });
  
  module.exports = router;