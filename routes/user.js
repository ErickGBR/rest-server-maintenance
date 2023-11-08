const { Router } = require('express');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet)
router.put('/:id', userPut)
router.post('/', userPost)
router.delete('/:id', userDelete)
router.patch('/:id', userPatch)

module.exports = router;