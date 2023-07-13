
const express = require("express");
const router = express.Router();
const items = require("../controllers/items.controller.js");


  router.post("/",items.createOne);
  router.get("/",items.findAll);
  router.patch("/", items.updateOne);
  router.delete("/:id_item",items.RemoveOne);

  module.exports = router;

