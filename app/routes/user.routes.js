var router = require("express").Router();
// var auth = require("../middleware/auth.middleware.js")

module.exports = (user) => {
    const userController = require("../controllers/user.controller.js");
    
    router.post("/signUp",userController.signUp)
    router.post("/signIn",userController.signIn)

    router.get("/",userController.findAll);
    router.get("/:id",userController.findOne);
    router.put("/:id",userController.update);
    router.delete("/:id",userController.delete);
    router.delete("/",userController.deleteAll);
    
    //path
    user.use("/api/user", router);
  };
