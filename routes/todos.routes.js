const router = require('express').Router();
const controller = require('../controller/todos.controller');
const asynchandler = require('express-async-handler');
const {authMiddleware} = require('../middleware/auth.middleware');
module.exports = router;

router.get('/show', authMiddleware, asynchandler(controller.getToDo));
router.post('/add', authMiddleware, asynchandler(controller.insertToDo));
router.delete('/delete', authMiddleware, asynchandler(controller.deleteToDo));
router.put('/update', authMiddleware, asynchandler(controller.updateToDo));
router.delete('/batchDelete', authMiddleware, asynchandler(controller.batchDelete));