var express = require("express");
var router = express.Router();
var UserController = require("../controllers/users");

router.get("/", UserController.list);
router.get("/:userID", UserController.userByID);
router.post("/", UserController.create);
router.put("/:userID", UserController.update);
router.delete("/:userID", UserController.remove);

module.exports = router;
