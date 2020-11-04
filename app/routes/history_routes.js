var router = require('express').Router();

module.exports = (history) => {
    const historyController = require("../controllers/history.controller.js");
    
    router.post("/",historyController.create);
    router.get("/",historyController.findAll);
    router.get("/:id", historyController.findOne);
    router.put("/:id", historyController.update);
    router.delete("/:id", historyController.delete);
    router.delete("/", historyController.deleteAll);
    
    //path
    history.use("/api/history", router);
  };
