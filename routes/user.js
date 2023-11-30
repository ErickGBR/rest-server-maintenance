const { Router } = require('express');
const { check } = require("express-validator");
const Role = require("../models/role");
const { validateFields } = require('../middlewares/validate-fields');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet)
router.put('/:id', userPut)
router.post('/', 
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").isLength({min: 6}),
    check("email", "Email is required").isEmail(),
    check("rol").custom(async(rol ="")=>{
        const existRol = await Role.findOne({rol});
        if(!existRol){
            throw new Error(`Rol ${rol} does not exist`);
        }
        return true
    }),
    validateFields
, userPost)
router.delete('/:id', userDelete)
router.patch('/:id', userPatch)

module.exports = router;