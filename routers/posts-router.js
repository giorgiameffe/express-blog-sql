// importare express
const express = require('express');

// funzione router 
const router = express.Router();

// importazione controller 
const postsController = require('../controllers/posts-controller.js');

// Creare rotte per le operazioni CRUD

// index 
router.get('/', postsController.index);

//show 
router.get('/:id', postsController.show);

// store 
router.post('/', postsController.store);

// update 
router.put('/:id', postsController.update);

// modify 
router.patch('/:id', postsController.modify);

// destroy 
router.delete('/:id', postsController.destroy);

// esportazione router
module.exports = router;