const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");

const router = Router();

// get category - public
router.get("/", (req, res) => {
    console.log("Test ");
})

// get category by id - public
router.get("/:id", (req, res) => {
    
})

// create category - private with all roles
router.post("/", (req, res) => {
    
})


//put category - private with all roles
router.put("/:id", (req, res) => {
    
})


//delete category - private with all roles
router.delete("/:id", (req, res) => {
    
})

module.exports = router;
