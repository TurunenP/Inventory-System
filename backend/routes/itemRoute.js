const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// CRUD operations for Items
router.post('/add', itemController.createItem); // Add a new item
router.get('/', itemController.getAllItems); // Get all items
router.get('/:id', itemController.getItemById); // Get item by ID
router.put('/:id', itemController.updateItem); // Update item by ID
router.delete('/:id', itemController.deleteItem); // Delete item by ID

// Search items by category
router.get('/search', itemController.searchItemsByCategory);

module.exports = router;
