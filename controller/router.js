const express = require('express');
const router = express.Router();
const pageController = require('../controller/pageControler');



// Routes

router.post('/user', pageController.postproduct);
router.get('/user/:id', pageController.getproduct);
router.put('/user/:id', pageController.putproduct);
router.delete('/user/:id', pageController.deleteproduct);
module.exports = router;