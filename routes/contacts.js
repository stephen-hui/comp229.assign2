var express = require("express");
var router = express.Router();
var ContactController = require("../controllers/contacts");

router.get("/", ContactController.list);
router.get("/:contactID", ContactController.contactByID);
router.post("/", ContactController.create);
router.put("/:contactID", ContactController.update);
router.delete("/:contactID", ContactController.remove);

module.exports = router;
