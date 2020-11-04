var router = require('express').Router();

module.exports = (bio) => {
    const bioController = require("../controllers/bio.controller.js");
    
    router.post("/",bioController.create);
    router.get("/",bioController.findAll)
    router.get("/:id", bioController.findOne);
    router.put("/:id", bioController.update);
    router.delete("/:id", bioController.delete);
    router.delete("/", bioController.deleteAll);
    
    //path
    bio.use("/api/biodata", router);
  };
