var router = require("express").Router();
// var auth = require("../middleware/auth.middleware.js")

module.exports = (user) => {
    const playController = require("../controllers/player.controller.js");
    
    router.post("/signUp",playController.signUp)
    router.post("/signIn",playController.signIn)
    
    //path
    user.use("/play", router);
  };
