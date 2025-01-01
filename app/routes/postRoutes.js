const express = require('express');
const postController = require('../controller/postController');
const router = express.Router();

router.post('/posts', postController.create)
router.put('/posts/:postID', postController.update)
router.delete('/posts/:postID', postController.delete)
router.get('/posts/:postID', postController.getById)
router.get('/posts', postController.getAll)
router.get('/', postController.redirectToGetAll)

module.exports = router;