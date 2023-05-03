const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const habitController = require('../controllers/habit_controller');

router.get('/', homeController.home);
router.post('/create', habitController.create);
router.get('/update-completion/:id/:date', habitController.updateCompletion);
router.get('/update-starred/:id', habitController.updateStarred);
router.get('/delete/:id', habitController.destroy);

module.exports = router;
