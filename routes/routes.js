const express = require("express");
const router = express.Router()
const UserController = require("../controllers/UserController")



router.get("/", UserController.find)
router.get("/user/:id", UserController.findById)
router.post("/user", UserController.create)
router.put("/user", UserController.update)
router.delete("/user", UserController.delete)


module.exports = router