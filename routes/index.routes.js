const router = require('express').Router();
const userRoutes = require('./user.routes');
const todoRoutes = require('./todos.routes');
module.exports = router;

router.use('/user', userRoutes);
router.use("/todo", todoRoutes);
router.get("/health-check", (req, res)=>{res.send({"status": "alive"})});