const { Router } = require('express');
const { check } = require("express-validator");
const { userAuth } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', userAuth)

module.exports = router